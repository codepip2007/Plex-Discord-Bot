import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a user',
    permissions: ['KICK_MEMBERS'],
    slash: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    testOnly: true,

    callback: async ({ interaction }) => {
        const target = interaction.options.getMember('user') as GuildMember
        if (!target) {
            interaction.reply({
                content: 'Please tag someone to kick',
                ephemeral: true
            })
        }
        if (!target.kickable) {
            interaction.reply({
                content: 'Cannot kick that user',
                ephemeral: true
            })
        }
        const reason = interaction.options.getString('reason')!

        target.kick(reason)

        interaction.reply({
            content: `You kicked <@${target.id}> for '${reason}'`,
            ephemeral: true
        })
    }
} as ICommand