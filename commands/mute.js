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
    slash: false,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, args, member }) => __awaiter(void 0, void 0, void 0, function* () {
        var target = message.mentions.members.first();
        let userDm = target.id;
        let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
        if (!target) {
            return 'Please tag someone to mute';
        }
        args.shift();
        let reason = args.join(' ');
        yield message.guild.members.cache.get(userDm).send(`**You have been muted in the server! Reason:** ${reason}`);
        target.roles.add(muteRole);
        yield message.channel.send(`<@${userDm}> has been muted`);
    })
};
