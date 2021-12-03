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
    description: 'Unmutes a user',
    permissions: ['BAN_MEMBERS'],
    slash: 'both',
    guildOnly: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    callback: ({ message, interaction, args, member, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        var target = (message ? message.mentions.members.first() : interaction.options.getMember('user'));
        let userDm = target.id;
        let muteRole = guild.roles.cache.find((role) => role.name === 'Muted');
        if (!target) {
            return 'Please tag someone to unmute';
        }
        args.shift();
        target.roles.remove(muteRole);
        return {
            custom: true,
            content: `<@${userDm}> has been unmuted`,
            ephemeral: true
        };
    })
};
