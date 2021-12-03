"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Gets information about the server',
    slash: true,
    guildOnly: true,
    callback: ({ message, guild }) => {
        // let { name, memberCount } = guild!
        return {
            custom: true,
            content: `**Server Name:** ${guild.name}\n**Members:** ${guild.memberCount}`,
            ephemeral: true
        };
    }
};
