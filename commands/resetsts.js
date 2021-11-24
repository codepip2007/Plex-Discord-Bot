"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Reset the bot\'s status',
    ownerOnly: true,
    callback: ({ client, text }) => {
        client.user.setActivity();
        return 'Bot\'s status has been reset';
    }
};
