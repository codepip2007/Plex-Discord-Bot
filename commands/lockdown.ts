// Remove send messages permission when command is used

import { GuildChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Lockdown a channel/server',
    guildOnly: true,
    slash: true,
    requireRoles: true,
    options: [
        {
            name: 'channel',
            type: 'SUB_COMMAND',
            description: 'Lockdown a channel',
            options: [
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel to lockdown',
                    required: true
                },
            ]
        },
        {
            name: 'server',
            type: 'SUB_COMMAND',
            description: 'Lockdown a server',
        },
        {
            name: 'unlock',
            type: 'SUB_COMMAND',
            description: 'Unlock a channel/server',
            options: [
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel to unlock',
                },
            ]
        }
    ],

    callback: async ({ interaction, guild }) => {
        let command = interaction.options.getSubcommand()
        let channel = interaction.options.getChannel('channel') as GuildChannel

        if (command == 'channel') {
            channel!.permissionOverwrites.edit(guild?.roles.everyone!, {
                VIEW_CHANNEL: false
            })

            interaction.reply({
                content: `${channel} locked down`,
                ephemeral: true
            })
        } else if (command == 'server') {
            guild!.channels.cache.forEach(async (channel) => {
                if (channel.type == 'GUILD_TEXT' || channel.type == 'GUILD_VOICE') {
                channel.permissionOverwrites.edit(guild?.roles.everyone!, {
                    VIEW_CHANNEL: false
                })

                await interaction.reply({
                    content: `${guild} locked down`,
                    ephemeral: true
                })
            } else {
                return
            }
            })
        } else if (command == 'unlock') {
            if (channel) {
                channel.permissionOverwrites.edit(guild?.roles.everyone!, {
                    VIEW_CHANNEL: null
                 })

                interaction.reply({
                    content: `${channel} unlocked`,
                    ephemeral: true
                })
            } else {
                guild!.channels.cache.forEach((channel) => {
                    if (channel.type == 'GUILD_TEXT' || channel.type == 'GUILD_VOICE') {
                    channel.permissionOverwrites.edit(guild?.roles.everyone!, {
                        VIEW_CHANNEL: null
                    })
                } else {
                    return
                }
                })

                interaction.reply({
                    content: `${guild} unlocked`,
                    ephemeral: true
                })
            }
        }
    }
} as ICommand;