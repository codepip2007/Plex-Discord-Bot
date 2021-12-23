"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'testing',
    description: 'Replies with pong',
    slash: true,
    callback: ({ interaction }) => {
        interaction.reply({
            content: 'Pong!',
            ephemeral: true
        });
    }
};
//works with both /ping and !ping
