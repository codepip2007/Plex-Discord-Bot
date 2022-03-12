import DiscordJS, { Client, GuildMember, Message, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    testOnly: true,
    
    category: 'Configuration',
    description: 'Adds a role to the auto role message',
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],
    requireRoles: true,
    slash: true,
    guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if(!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction

            if(customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter ((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    content: 'Roles updated!',
                    ephemeral: true,
                })
            }
        })
    },

    callback: async ({ message, interaction, args }) => {
        const channel = interaction.options.getChannel('channel') as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            interaction.reply({
                content: 'Please tag a text channel',
                ephemeral: true
            })
        }

        const messageId = args[1]

        const role = interaction.options.getRole('role') as Role
        if (!role) {
            interaction.reply({
                content:'Unknown role!',
                ephemeral: true,
            })
        }

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true,
        })

        if(!targetMessage) {
            interaction.reply({
                content: 'Unknow message ID',
                ephemeral: true,
            })
        }
        const bot = '949962242923827280'
        if (targetMessage.author.id !== bot) {
            interaction.reply({
                content: `Please provide a message ID that was sent from <@${bot}>`,
                ephemeral: true,
            })
        }

        let row = targetMessage.components[0] as MessageActionRow 
        if (!row) {
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id,
        }]

        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    interaction.reply({
                        content: `<@&${o.value}> is already part of this menu`,
                        allowedMentions: {
                            roles: []
                        },
                        ephemeral: true,
                    })
                }
            }
            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                    .setCustomId('auto_roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('Select your roles...')
                    .addOptions(option)
            )
        }

        targetMessage.edit({
            components: [row]
        })

        interaction.reply({
            content: `Added <@&${role.id}> to the auto roles menu`,
            allowedMentions: {
                roles: []
            },
            ephemeral: true,
        })
    }
    
} as ICommand