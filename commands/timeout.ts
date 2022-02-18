import { GuildMember } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    category: 'Moderation',
    description: 'Timeout a user',
    slash: true,
    guildOnly: true,
    minArgs: 3,
    requiredRoles: true,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING','STRING'],

    callback: async ({ interaction }) => {
        let target = interaction.options.getMember('user') as GuildMember
        let reason = interaction.options.getString('reason')
        let duration = interaction.options.getString('duration')

        let time

        if (duration == '60s') {
            time = 1000 * 60
        } else if (duration == '5m') {
            time = 1000 * 60 * 5
        } else if (duration == '10m') {
            time = 1000 * 60 * 10
        } else if (duration == '1h') {
            time = 1000 * 60 * 60
        } else if (duration == '1d') {
            time = 1000 * 60 * 60 * 24
        } else if (duration == '1w') {
            time = 1000 * 60 *60 * 24 * 7
        } else {
            interaction.reply({
                content: 'Invalid time! Please use 60s, 5m, 10m, 1h, 1d, or 1w for 60 seconds, 5 minutes, 10 minutes, 1 hour, 1 day, or 1 week respectively!',
                ephemeral: true
            })
        }

        let timeout = await target!.timeout(time!, reason!)

        if (!timeout) {
            interaction.reply({
                content: 'Sorry, something went wrong!',
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: `${target} has been timed out for ${duration}`,
                ephemeral: true
            })
        }
    }
} as ICommand