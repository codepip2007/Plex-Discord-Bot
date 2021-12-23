import { Guild, GuildChannel, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Removes a user\'s access from a channel',
    slash: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <channel>',
    expectedArgsTypes: ['USER', 'CHANNEL'],

    callback: async ({ message, interaction, args }) => {
        let targetChannel = interaction.options.getChannel('channel') as TextChannel
        let targetUser = interaction.options.getUser('user')
        let targetUserId = targetUser?.id

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
                content: 'Unknown channel type',
                ephemeral: true
           })
       }
    }
} as ICommand