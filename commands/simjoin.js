"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: "Simulates a join",
    slash: false,
    testOnly: true,
    callback: ({ member, client }) => {
        client.emit('guildMemberAdd', member);
        return 'Join Simulated!';
    }
};
