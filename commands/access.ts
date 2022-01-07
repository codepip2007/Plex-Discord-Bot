import { Guild, GuildChannel, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Grants a user access to a channel',
    slash: true, // Only a slash command
    guildOnly: true, // Only used in guilds
    minArgs: 2,
    expectedArgs: '<user> <channel>',
    expectedArgsTypes: ['USER', 'CHANNEL'],

    callback: async ({ message, interaction }) => {
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
                content: 'Unknown channel type',
                ephemeral: true
           })
       }
    }
} as ICommand