import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Set the nickname of a user',
    guildOnly: true,
    slash: true,
    minArgs: 2,
    expectedArgs: '<user> <nickname>',
    expectedArgsTypes: ['USER', 'STRING'],
    permissions: ['MANAGE_NICKNAMES'],

    // testOnly: true,

    callback: ({ interaction }) => {
        let target = interaction.options.getMember('user') as GuildMember
        let nick = interaction.options.getString('nickname')

        target.setNickname(nick)

        interaction.reply({
            content: `${target} nickname changed to '${nick}'`,
            ephemeral: true
        })
    }
} as ICommand