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
    description: 'Activates slowmode on a channel',
    slash: true,
    guildOnly: true,
    permissions: ['MANAGE_CHANNELS'],
    expectedArgs: '<channel> <slowmode>',
    expectedArgsTypes: ['CHANNEL', 'NUMBER'],
    minArgs: 2,
    testOnly: true,
    callback: ({ interaction, guild, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let target = interaction.options.getChannel('channel');
        let sl = interaction.options.getNumber('slowmode');
        let targetChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(target.id);
        if (sl > 21600) {
            interaction.reply({
                ephemeral: true,
                content: `<@${user.id}> slowmode can only be set to 21600 seconds or less!`
            });
        }
        else {
            if ((targetChannel === null || targetChannel === void 0 ? void 0 : targetChannel.type) == 'GUILD_TEXT' ||
                (targetChannel === null || targetChannel === void 0 ? void 0 : targetChannel.type) == 'GUILD_PUBLIC_THREAD' ||
                (targetChannel === null || targetChannel === void 0 ? void 0 : targetChannel.type) == 'GUILD_PRIVATE_THREAD') {
                targetChannel.setRateLimitPerUser(sl);
                yield interaction.reply({
                    content: `<@${user.id}> set slowmode to ${sl}s`
                });
            }
            else {
                interaction.reply({
                    content: `${target} is not a text channel!`
                });
            }
        }
    })
};
