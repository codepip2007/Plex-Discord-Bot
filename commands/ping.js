"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'testing',
    description: 'Replies with pong',
    slash: 'both',
    callback: ({}) => {
        return {
            custom: true,
            content: 'Pong',
            ephemeral: true
        };
    }
};
//works with both /ping and !ping
