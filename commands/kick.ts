import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a user',
    permissions: ['ADMINISTRATOR'],
    slash: false,
    testOnly: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, args }) => {
        const target = message.mentions.members?.first()
        if (!target) {
            return 'Please tag someone to kick'
        }
        if (!target.kickable) {
            return {
                custom: true,
                content: 'Cannot kick that user',
                ephemeral: true
            }
        }
        args.shift()
        const reason = args.join(' ')

        target.kick(reason)
        return {
            custom: true,
            content: `You kicked <@${target.id}>`,
            ephemeral: true,
        }
    }
} as ICommand