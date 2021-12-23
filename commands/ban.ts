import { GuildMember, Interaction } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans a user',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, interaction, args, guild }) => {
        const target = interaction.options.getMember('user') as GuildMember
        const userDm = target!.id
        if (!target) {
            interaction.reply({
                content: 'Please tag someone to ban',
                ephemeral: true,
            })
        }
        if (!target.bannable) {
            interaction.reply({
                content: 'Cannot ban that user',
                ephemeral: true
            })
        }
        const reason = interaction.options.getString('reason')!
        target.send(`**You have been banned from the *${guild!.name}* Discord Server! Reason:** ${reason}`)

        await target.ban({
            reason,
            days: 7
        })
        interaction.reply({
            content: `You banned <@${target.id}>`,
            ephemeral: true,
        })
    }
} as ICommand