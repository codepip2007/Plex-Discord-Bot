"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: "Simulates a leave",
    slash: false,
    testOnly: true,
    callback: ({ member, client }) => {
        client.emit('guildMemberRemove', member);
        return 'Leave Simulated!';
    }
};
