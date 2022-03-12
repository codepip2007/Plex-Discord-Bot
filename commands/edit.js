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
    description: 'Edits a message from the bot1',
    permissions: ['MANAGE_MESSAGES'],
    slash: true,
    minArgs: 3,
    expectedArgs: '<channel> <messageid> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'STRING'],
    testOnly: true,
    callback: ({ message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = interaction.options.getChannel('channel');
        if (!channel || !channel.isText()) {
            interaction.reply({
                content: 'Please tag a text channel',
                ephemeral: true
            });
        }
        let id = interaction.options.getString('messageid');
        let text = interaction.options.getString('text');
        let targetMessage = yield channel.messages.fetch(id, {
            cache: true,
            force: true,
        });
        if (!text) {
            interaction.reply({
                content: 'Please provide the new content!',
                ephemeral: true
            });
        }
        if (!targetMessage) {
            interaction.reply({
                content: 'Unknow message ID',
                ephemeral: true,
            });
        }
        // const bot = '912138759229833226'
        // if (targetMessage.author.id !== bot) {
        //     interaction.reply({
        //         content: `Please provide a message ID that was sent from <@${bot}>`,
        //         ephemeral: true
        //     })
        // }
        yield targetMessage.edit(text);
        yield interaction.reply({
            content: 'Message has been edited.',
            ephemeral: true
        });
    })
};
