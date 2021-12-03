import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a user',
    permissions: ['ADMINISTRATOR'],
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, interaction, args, guild }) => {
        const target = (message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember)
        const userDm = target!.id
        if (!target) {
            return {
                custom: true,
                content: 'Please tag someone to kick',
                ephemeral: true
            }
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

        await target.send(`**You have been kicked from the *${guild!.name}* Discord server! Reason:** ${reason}`)

        target.kick(reason)
        return {
            custom: true,
            content: `You kicked <@${target.id}>`,
            ephemeral: true
        }
    }
} as ICommand