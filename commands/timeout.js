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
    description: 'Timeout a user',
    slash: true,
    guildOnly: true,
    minArgs: 3,
    permissions: ['KICK_MEMBERS'],
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],
    testOnly: true,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let target = interaction.options.getMember('user');
        let reason = interaction.options.getString('reason');
        let duration = interaction.options.getString('duration');
        let time;
        if (duration == '60s') {
            time = 1000 * 60;
        }
        else if (duration == '5m') {
            time = 1000 * 60 * 5;
        }
        else if (duration == '10m') {
            time = 1000 * 60 * 10;
        }
        else if (duration == '1h') {
            time = 1000 * 60 * 60;
        }
        else if (duration == '1d') {
            time = 1000 * 60 * 60 * 24;
        }
        else if (duration == '1w') {
            time = 1000 * 60 * 60 * 24 * 7;
        }
        else {
            interaction.reply({
                content: 'Invalid time! Please use 60s, 5m, 10m, 1h, 1d, or 1w for 60 seconds, 5 minutes, 10 minutes, 1 hour, 1 day, or 1 week respectively!',
                ephemeral: true
            });
        }
        let timeout = yield target.timeout(time, reason);
        if (!timeout) {
            interaction.reply({
                content: 'Sorry, something went wrong!',
                ephemeral: true
            });
        }
        else {
            interaction.reply({
                content: `${target} has been timed out for ${duration}`,
                ephemeral: true
            });
        }
    })
};
