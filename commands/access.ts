import { Guild, GuildChannel, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Grants a user access to a channel',
    slash: true, // Only a slash command
    guildOnly: true, // Only used in guilds
    requireRoles: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Give a user access to a channel',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to give access to',
                    required: true
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel that the user will have access to',
                    required: true,
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'Remove a user\'s access from a channel',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to remove access from',
                    required: true,
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel the user will no longer have access to',
                    required: true
                }
            ]
        }
    ],

                            testOnly: true,

    callback: async ({ message, interaction }) => {
        let targetChannel = interaction.options.getChannel('channel') as TextChannel
        let targetUser = interaction.options.getUser('user')
        let targetUserId = targetUser?.id
        let command = interaction.options.getSubcommand()

        if (!targetChannel) {
            interaction.reply({
                content: 'Please tag a text channel!',
                ephemeral: true
            })
        }

        if (!targetUser) {
            interaction.reply({
                content: 'Please tag a user!',
                ephemeral: true
            })
        }

        if (command == 'add') {

            if (targetChannel!.isText()) {
                targetChannel!.permissionOverwrites!.create(targetUserId!, { // Creates permissions
                    VIEW_CHANNEL: true,
                    CONNECT: true
                })

                interaction.reply({
                    content: `<@${targetUserId}> was granted access to ${targetChannel}`,
                    ephemeral: true
                })
            } else {
                interaction.reply({
                    content: 'Unknown channel type! Please tag a text channel.',
                    ephemeral: true
                })
            }
        } else if (command == 'remove') {
            if (targetChannel.isText()) {
                targetChannel.permissionOverwrites.create(targetUserId!, {
                    VIEW_CHANNEL: false,
                    CONNECT: false
                })
     
                interaction.reply({
                     content: `<@${targetUserId}> no longer has access to ${targetChannel}`,
                     ephemeral: true
                })
            } else {
                interaction.reply({
                     content: 'Unknown channel type! Please tag a text channel.',
                     ephemeral: true
                })
            }
        }
    }
} as ICommand