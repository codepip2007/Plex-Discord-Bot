import { Guild, GuildChannel, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Removes a user\'s access from a channel',
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <channel>',
    expectedArgsTypes: ['USER', 'CHANNEL'],

    callback: async ({ message, interaction, args }) => {
        let targetChannel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel') as TextChannel)
        let targetUser = message ? message.mentions.members?.first() : interaction.options.getUser('user')
        let targetUserId = targetUser?.id

        if (!targetChannel) {
            return {
                custom: true,
                content: 'Please tag a text channel!',
                ephemeral: true
            }
        }

        if (!targetUser) {
            return {
                custom: true,
                content: 'Please tag a user!',
                ephemeral: true
            }
        }

       if (targetChannel.isText()) {
           targetChannel.permissionOverwrites.create(targetUserId!, {
               VIEW_CHANNEL: false
           })

           return {
               custom: true,
               content: `<@${targetUserId}> no longer has access to ${targetChannel}`,
               ephemeral: true
           }
       } else if (targetChannel.isThread()) {
           return {
               custom: true,
               content: `Cannot remove <@${targetUserId}> from a thread channel!`,
               ephemeral: true
           }
       } else if (targetChannel.isVoice()) {
           targetChannel.permissionOverwrites.create(targetUserId!, {
               VIEW_CHANNEL: false,
               CONNECT: false
           })

           return {
               custom: true,
               content: `<@${targetUserId}> no longer has access to ${targetChannel}`,
               ephemeral: true
           }
       } else {
           return {
               custom: true,
               content: 'Unknown channel type',
               ephemeral: true
           }
       }
    }
} as ICommand