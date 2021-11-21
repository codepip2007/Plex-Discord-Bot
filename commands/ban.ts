import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans a user',
    permissions: ['ADMINISTRATOR'],
    slash: false,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, args }) => {
        const target = message.mentions.members?.first()
        if (!target) {
            return 'Please tag someone to ban'
        }
        if (!target.bannable) {
            return {
                custom: true,
                content: 'Cannot ban that user',
                ephemeral: true
            }
        }
        args.shift()
        const reason = args.join(' ')

        target.ban({
            reason,
            days: 7
        })
        return {
            custom: true,
            content: `You banned <@${target.id}>`,
            ephemeral: true,
        }
    }
} as ICommand