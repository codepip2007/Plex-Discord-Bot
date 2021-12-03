"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Sets the bot\'s status',
    minArgs: 1,
    expectedArgs: '<status>',
    expectedArgsTypes: ['STRING'],
    slash: 'both',
    ownerOnly: true,
    callback: ({ client, text }) => {
        var _a;
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
            status: 'online',
            activities: [
                {
                    name: text,
                },
            ]
        });
        return {
            custom: true,
            content: 'Status updated',
            ephemeral: true,
        };
    }
};
