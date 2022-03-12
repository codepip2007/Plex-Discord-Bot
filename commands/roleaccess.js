"use strict";
// Remove and add a role's access to a channel
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Moderation',
    description: 'Remove or add a role\'s access to a channel',
    guildOnly: true,
    slash: true,
    testOnly: true,
    requireRoles: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Add a role\'s access to a channel',
            options: [
                {
                    name: 'role',
                    type: 'ROLE',
                    description: 'The role to add access to the channel',
                    required: true
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel to add access to',
                    required: true
                },
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'Remove a role\'s access to a channel',
            options: [
                {
                    name: 'role',
                    type: 'ROLE',
                    description: 'The role to remove access to the channel',
                    required: true
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel to remove access to',
                    required: true
                },
            ]
        },
    ],
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let command = interaction.options.getSubcommand();
        let channel = interaction.options.getChannel('channel');
        let role = interaction.options.getRole('role');
        if (command == 'add') {
            channel.permissionOverwrites.edit(role, {
                VIEW_CHANNEL: true
            });
            interaction.reply({
                content: `${role} added to ${channel}`,
                ephemeral: true
            });
        }
        else if (command == 'remove') {
            channel.permissionOverwrites.edit(role, {
                VIEW_CHANNEL: false
            });
            interaction.reply({
                content: `${role} removed from ${channel}`,
                ephemeral: true
            });
        }
    })
};
