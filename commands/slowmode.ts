import { ICommand } from 'wokcommands';

export default {
    category: 'Moderation',
    description: 'Activates slowmode on a channel',
    slash: true,
    guildOnly: true,
    permissions: ['MANAGE_CHANNELS'],
    expectedArgs: '<channel> <slowmode>',
    expectedArgsTypes: ['CHANNEL', 'NUMBER'],
    minArgs: 2,

    testOnly: true,

    callback: async ({ interaction, guild, user }) => {
        let target = interaction.options.getChannel('channel')
        let sl = interaction.options.getNumber('slowmode')

        let targetChannel = guild?.channels.cache.get(target!.id)

        if (sl! > 21600) {
            interaction.reply({
                ephemeral: true,
                content: `<@${user.id}> slowmode can only be set to 21600 seconds or less!`
            })
        } else {
            if (
                targetChannel?.type == 'GUILD_TEXT' ||
                targetChannel?.type == 'GUILD_PUBLIC_THREAD' ||
                targetChannel?.type == 'GUILD_PRIVATE_THREAD'
                ) {
                    targetChannel.setRateLimitPerUser(sl!)

                    await interaction.reply({
                    content: `<@${user.id}> set slowmode to ${sl}s`
                    })
            } else {
                interaction.reply({
                    content: `${target} is not a text channel!`
                })
        }}
    }
} as ICommand;