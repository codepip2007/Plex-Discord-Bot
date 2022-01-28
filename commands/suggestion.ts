import { MessageEmbed, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Configuration',
    description: 'Accept or Deny a suggestion',
    ownerOnly: true,
    slash: true,
    guildOnly: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'accept',
            description: 'Accept a suggestion',
            options: [
                {
                    name: 'message',
                    type: 'STRING',
                    description: 'The message ID of the suggestion to accept',
                    required: true
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'Reason for accepting',
                    required: false
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'reject',
            description: 'Reject a suggestion',
            options: [
                {
                    name: 'message',
                    type: 'STRING',
                    description: 'The message ID of the suggestion to reject',
                    required: true
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'Reason for rejecting',
                    required: false
                },
            ],
        }
    ],

    callback: async ({ interaction, guild, channel }) => {
        let command = interaction.options.getSubcommand()
        let mesId = interaction.options.getString('message')!
        let reason = interaction.options.getString('reason')

        let suggestChannel = '935797241585729546'
        let sugchan = guild?.channels.cache.get(suggestChannel) as TextChannel

        const targetMessage = await sugchan.messages.fetch(mesId, {
            cache: true,
            force: true
        })

        let oldEmbed = targetMessage.embeds[0]

        let newEmbed = new MessageEmbed()
        .setTitle(oldEmbed.title!)
        .setDescription(oldEmbed.description!)

        if (command == 'reject') {
            newEmbed.addField('Status:',`❌ Denied${reason ? ` Reason: ${reason}` : ''}`)
            newEmbed.setColor('RED')

            targetMessage.edit({
                embeds: [newEmbed]
            })

            interaction.reply({
                content: 'Suggestion Rejected!',
                ephemeral: true
            })
        } else if (command == 'accept') {
            newEmbed.addField('Status:',`✅ Accepted${reason ? ` Reason: ${reason}` : ''}`)
            newEmbed.setColor('GREEN')

            targetMessage.edit({
                embeds: [newEmbed]
            })
            interaction.reply({
                content: 'Suggestion Accepted',
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: 'Unknown Command!',
                ephemeral: true
            })
        }
    }
} as ICommand