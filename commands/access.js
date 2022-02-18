"use strict";
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
    description: 'Grants a user access to a channel',
    slash: true,
    guildOnly: true,
    // minArgs: 2,
    // expectedArgs: '<user> <channel>',
    // expectedArgsTypes: ['USER', 'CHANNEL'],
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Give a user access to a channel',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to give access to',
                    required: true
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel that the user will have access to',
                    required: true,
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'Remove a user\'s access from a channel',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to remove access from',
                    required: true,
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel the user will no longer have access to',
                    required: true
                }
            ]
        }
    ],
    testOnly: true,
    callback: ({ message, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let targetChannel = interaction.options.getChannel('channel');
        let targetUser = interaction.options.getUser('user');
        let targetUserId = targetUser === null || targetUser === void 0 ? void 0 : targetUser.id;
        let command = interaction.options.getSubcommand();
        if (!targetChannel) {
            interaction.reply({
                content: 'Please tag a text channel!',
                ephemeral: true
            });
        }
        if (!targetUser) {
            interaction.reply({
                content: 'Please tag a user!',
                ephemeral: true
            });
        }
        if (command == 'add') {
            if (targetChannel.isText()) {
                targetChannel.permissionOverwrites.create(targetUserId, {
                    VIEW_CHANNEL: true,
                    CONNECT: true
                });
                interaction.reply({
                    content: `<@${targetUserId}> was granted access to ${targetChannel}`,
                    ephemeral: true
                });
            }
            else {
                interaction.reply({
                    content: 'Unknown channel type! Please tag a text channel.',
                    ephemeral: true
                });
            }
        }
        else if (command == 'remove') {
            if (targetChannel.isText()) {
                targetChannel.permissionOverwrites.create(targetUserId, {
                    VIEW_CHANNEL: false,
                    CONNECT: false
                });
                interaction.reply({
                    content: `<@${targetUserId}> no longer has access to ${targetChannel}`,
                    ephemeral: true
                });
            }
            else {
                interaction.reply({
                    content: 'Unknown channel type! Please tag a text channel.',
                    ephemeral: true
                });
            }
        }
    })
};
