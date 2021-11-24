import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a user',
    permissions: ['ADMINISTRATOR'],
    slash: false,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, args }) => {
        const target = message.mentions.members?.first()
        const userDm = target!.id
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
        await message.guild!.members.cache.get(userDm)!.send(`**You have been kicked from the server! Reason:** ${reason}`)

        target.kick(reason)
        return {
            custom: true,
            content: `You kicked <@${target.id}>`,
            ephemeral: true,
        }
    }
} as ICommand