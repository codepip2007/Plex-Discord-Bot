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
    description: 'Mutes a user',
    permissions: ['BAN_MEMBERS'],
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, args, interaction, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        var target = (message ? message.mentions.members.first() : interaction.options.getMember('user'));
        let userDm = target.id;
        let muteRole = guild.roles.cache.find((role) => role.name === 'Muted');
        if (!target) {
            return {
                custom: true,
                content: 'Please tag someone to mute',
                ephemeral: true
            };
        }
        args.shift();
        let reason = args.join(' ');
        if (!reason) {
            return {
                custom: true,
                content: 'Please provide a reason',
                ephemeral: true
            };
        }
        let { name } = guild;
        yield target.send(`**You have been muted in the *${name}* Discord server! Reason:** ${reason}`);
        target.roles.add(muteRole);
        return {
            custom: true,
            content: `<@${userDm}> has been muted`,
            ephemeral: true
        };
    })
};
