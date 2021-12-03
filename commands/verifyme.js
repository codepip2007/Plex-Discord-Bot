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
    category: 'Verification',
    description: 'Get verified on the server',
    slash: false,
    guildOnly: true,
    minArgs: 1,
    expectedArgs: '<Full Name>',
    expectedArgsTypes: [],
    callback: ({ message, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const name = message.content.replace('!verifyme', '');
        if (!name) {
            return {
                custom: true,
                content: 'Please provide your full name! Example: "!verify John Doe"',
                ephemeral: true
            };
        }
        else {
            const verConfirm = `**Full Name:** ${name}\n**Discord Username:** ${message.author.tag}\n**Tag:** <@${message.author.id}>`;
            const msg = yield message.channel.send(verConfirm);
            const memberNick = message.author.id;
            if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
                return message.channel.send('I don\'t have permission to change your nickname!');
            }
            else {
                message.member.setNickname(message.content.replace('!verifyme ', ''));
            }
            const member = message.author;
            if (!((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.permissions.has('MANAGE_ROLES'))) {
                return message.channel.send('I don\'t have permisssion to assign you a role');
            }
            else {
                message.member.roles.add('874996734189772871');
                message.member.roles.remove('874997865825587260');
            }
            setTimeout(() => {
                msg.edit('Assigning roles');
            }, 300);
            setTimeout(() => {
                msg.edit('Changing nickname');
            }, 500);
            setTimeout(() => {
                msg.edit(`<@${message.author.id}> Verification process complete. Welcome to the server!`);
            }, 1000);
            let newMemberChannel = message.guild.channels.cache.get('875229171872305223');
            newMemberChannel.send(verConfirm);
        }
    })
};
