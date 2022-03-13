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
    description: 'Immediate ban and unban',
    slash: true,
    guildOnly: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    testOnly: true,
    callback: ({ interaction, user, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        let target = interaction.options.getMember('user');
        target === null || target === void 0 ? void 0 : target.ban({
            days: 7
        });
        yield (guild === null || guild === void 0 ? void 0 : guild.bans.remove(target.id).then(r => interaction.reply({
            content: `${r.username} was softbanned`
        })).catch(console.error));
    })
};
