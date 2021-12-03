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
    description: 'Bans a user',
    permissions: ['ADMINISTRATOR'],
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const target = (message ? (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first() : interaction.options.getMember('user'));
        const userDm = target.id;
        if (!target) {
            return {
                custom: true,
                content: 'Please tag someone to ban',
                ephemeral: true,
            };
        }
        if (!target.bannable) {
            return {
                custom: true,
                content: 'Cannot ban that user',
                ephemeral: true
            };
        }
        args.shift();
        const reason = args.join(' ');
        target.send(`**You have been banned from the server! Reason:** ${reason}`);
        yield target.ban({
            reason,
            days: 7
        });
        return {
            custom: true,
            content: `You banned <@${target.id}>`,
            ephemeral: true,
        };
    })
};
