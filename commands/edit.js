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
    category: 'Messages',
    description: 'Edits a message from the bot',
    permissions: ['MANAGE_MESSAGES'],
    slash: 'both',
    minArgs: 2,
    expectedArgs: '<channel> <message ID> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'STRING'],
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return {
                custom: true,
                content: 'Please tag a text channel',
                ephemeral: true
            };
        }
        let id = args[1];
        args.shift();
        args.shift();
        let text = args.join(' ');
        const targetMessage = yield channel.messages.fetch(id, {
            cache: true,
            force: true,
        });
        if (!text) {
            return {
                custom: true,
                content: 'Please provide the new content!',
                ephemeral: true
            };
        }
        if (!targetMessage) {
            return {
                custom: true,
                content: 'Unknow message ID',
                ephemeral: true,
            };
        }
        const bot = '912138759229833226';
        if (targetMessage.author.id !== bot) {
            return {
                custom: true,
                content: `Please provide a message ID that was sent from <@${bot}>`,
                ephemeral: true
            };
        }
        targetMessage.edit(text);
        return yield {
            custom: true,
            content: 'Message has been edited.',
            ephemeral: true
        };
    })
};
