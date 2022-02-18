"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Moderation',
    description: 'Set the nickname of a user',
    guildOnly: true,
    slash: true,
    minArgs: 2,
    expectedArgs: '<user> <nickname>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ interaction }) => {
        let target = interaction.options.getMember('user');
        let nick = interaction.options.getString('nickname');
        target.setNickname(nick);
        interaction.reply({
            content: `${target} nickname changed to '${nick}'`,
            ephemeral: true
        });
    }
};
