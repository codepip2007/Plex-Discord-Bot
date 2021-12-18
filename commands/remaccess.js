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
    description: 'Removes a user\'s access from a channel',
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <channel>',
    expectedArgsTypes: ['USER', 'CHANNEL'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let targetChannel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel'));
        let targetUser = message ? (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first() : interaction.options.getUser('user');
        let targetUserId = targetUser === null || targetUser === void 0 ? void 0 : targetUser.id;
        if (!targetChannel) {
            return {
                custom: true,
                content: 'Please tag a text channel!',
                ephemeral: true
            };
        }
        if (!targetUser) {
            return {
                custom: true,
                content: 'Please tag a user!',
                ephemeral: true
            };
        }
        if (targetChannel.isText()) {
            targetChannel.permissionOverwrites.create(targetUserId, {
                VIEW_CHANNEL: false
            });
            return {
                custom: true,
                content: `<@${targetUserId}> no longer has access to ${targetChannel}`,
                ephemeral: true
            };
        }
        else if (targetChannel.isThread()) {
            return {
                custom: true,
                content: `Cannot remove <@${targetUserId}> from a thread channel!`,
                ephemeral: true
            };
        }
        else if (targetChannel.isVoice()) {
            targetChannel.permissionOverwrites.create(targetUserId, {
                VIEW_CHANNEL: false,
                CONNECT: false
            });
            return {
                custom: true,
                content: `<@${targetUserId}> no longer has access to ${targetChannel}`,
                ephemeral: true
            };
        }
        else {
            return {
                custom: true,
                content: 'Unknown channel type',
                ephemeral: true
            };
        }
    })
};
