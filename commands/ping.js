"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'testing',
    description: 'Replies with pong',
    //delete below for global command
    slash: false,
    //delete above for global command
    callback: ({}) => {
        return 'Pong';
    }
};
//works with both /ping and !ping
