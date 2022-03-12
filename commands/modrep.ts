import { MessageEmbed, TextChannel } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    category: 'Moderation',
    description: 'Resolve or claim a report',
    guildOnly: true,
    slash: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'claim',
            description: 'Claim a report',
            options: [
                {
                    name: 'report',
                    type: 'STRING',
                    description: 'The ID of the report message',
                    required: true
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'resolve',
            description: 'Resolve a report',
            options: [
                {
                    name: 'report',
                    type: 'STRING',
                    description: 'The ID of the report message',
                    required: true
                },
                {
                    name: 'action',
                    type: 'STRING',
                    description: 'The action you took',
                    required: true
                }
            ]
        }
    ],
    requireRoles: true,

    // testOnly: true,

    callback: async ({ interaction, guild }) => {
        let command = interaction.options.getSubcommand()
        let mesId = interaction.options.getString('report')!
        let action = interaction.options.getString('action')

        let reportChannel = guild?.channels.cache.find((channel) => channel.name == 'reports') as TextChannel

        const targetMessage = await reportChannel.messages.fetch(mesId, {
            cache: true,
            force: true
        })

        let oldEmbed = targetMessage.embeds[0]
        let newEmbed = new MessageEmbed()
        .setTitle(oldEmbed.title!)
        .setDescription(oldEmbed.description!)
        .addFields(oldEmbed.fields)

        if (command == 'claim') {
            newEmbed.fields[2] = {
                name: 'Status:',
                value: `Claimed by ${interaction.user}`,
                inline: false
            }
            newEmbed.setColor('YELLOW')

            targetMessage.edit({
                embeds: [newEmbed]
            })

            interaction.reply({
                content: 'Report Claimed!',
                ephemeral: true
            })
        } else if (command == 'resolve') {
            newEmbed.fields[2] = {
                name: 'Status:',
                value: `Resolved by ${interaction.user}`,
                inline: false
            }
            newEmbed.addField('Action Taken:', `${action}`)
            newEmbed.setColor('GREEN')

            targetMessage.edit({
                embeds: [newEmbed]
            })

            interaction.reply({
                content: 'Report Resolved!',
                ephemeral: true
            })
        }
        
    }
} as ICommand