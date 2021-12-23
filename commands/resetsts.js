"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Reset the bot\'s status',
    ownerOnly: true,
    slash: true,
    callback: ({ client, interaction }) => {
        client.user.setActivity();
        interaction.reply({
            content: 'Bot\'s status has been reset',
            ephemeral: true
        });
    }
};
