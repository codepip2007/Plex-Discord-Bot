"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Reset the bot\'s status',
    ownerOnly: true,
    slash: 'both',
    callback: ({ client, text }) => {
        client.user.setActivity();
        return {
            custom: true,
            content: 'Bot\'s status has been reset',
            ephemeral: true
        };
    }
};
