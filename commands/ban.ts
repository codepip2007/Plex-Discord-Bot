import { GuildMember, Interaction } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans a user',
    permissions: ['ADMINISTRATOR'],
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, interaction, args }) => {
        const target = (message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember)
        const userDm = target!.id
        if (!target) {
            return {
                custom: true,
                content: 'Please tag someone to ban',
                ephemeral: true,
            }
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
        target.send(`**You have been banned from the server! Reason:** ${reason}`)

        await target.ban({
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