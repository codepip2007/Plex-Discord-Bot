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
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Games',
    description: 'Plays rock, paper, scissors with the bot',
    slash: true,
    callback: ({ interaction, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('rock')
            .setLabel('Rock')
            .setStyle('PRIMARY'))
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('paper')
            .setLabel('Paper')
            .setStyle('PRIMARY'))
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('scissors')
            .setLabel('Scissors')
            .setStyle('PRIMARY'));
        let collector = channel.createMessageComponentCollector({
            max: 1,
            time: 1000 * 60 * 2 //60 seconds times 2 = 2 minutes
        });
        let rpc = ['Rock', 'Paper', 'Scissors'];
        let botChoice = rpc[Math.floor(Math.random() * rpc.length)];
        yield interaction.reply({
            content: `What did you choose?`,
            components: [row],
            ephemeral: true
        });
        collector.on('end', (collection) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            if (((_a = collection.first()) === null || _a === void 0 ? void 0 : _a.customId) === 'rock' && botChoice === 'Rock') {
                interaction.editReply({
                    content: `I chose "Rock" as well. It's a draw!`,
                    components: [],
                });
            }
            else if (((_b = collection.first()) === null || _b === void 0 ? void 0 : _b.customId) === 'rock' && botChoice === 'Paper') {
                interaction.editReply({
                    content: `I chose "Paper". I win!`,
                    components: []
                });
            }
            else if (((_c = collection.first()) === null || _c === void 0 ? void 0 : _c.customId) === 'rock' && botChoice === 'Scissors') {
                interaction.editReply({
                    content: `I chose "Scissors". You win!`,
                    components: []
                });
            }
            else if (((_d = collection.first()) === null || _d === void 0 ? void 0 : _d.customId) === 'paper' && botChoice === 'Rock') {
                interaction.editReply({
                    content: `I chose "Paper". You win!`,
                    components: []
                });
            }
            else if (((_e = collection.first()) === null || _e === void 0 ? void 0 : _e.customId) === 'paper' && botChoice === 'Paper') {
                interaction.editReply({
                    content: `I also chose "Paper". It's a draw!`,
                    components: []
                });
            }
            else if (((_f = collection.first()) === null || _f === void 0 ? void 0 : _f.customId) === 'paper' && botChoice === 'Scissors') {
                interaction.editReply({
                    content: `I chose "Scissors". You lose!`,
                    components: []
                });
            }
            else if (((_g = collection.first()) === null || _g === void 0 ? void 0 : _g.customId) === 'scissors' && botChoice === 'Rock') {
                interaction.editReply({
                    content: `I chose "Rock". You lose!`,
                    components: []
                });
            }
            else if (((_h = collection.first()) === null || _h === void 0 ? void 0 : _h.customId) === 'scissors' && botChoice === 'Paper') {
                interaction.editReply({
                    content: `I chose "Paper". You win!`,
                    components: []
                });
            }
            else if (((_j = collection.first()) === null || _j === void 0 ? void 0 : _j.customId) === 'scissors' && botChoice === 'Scissors') {
                interaction.editReply({
                    content: `I chose "Scissors". It's a draw!`,
                    components: []
                });
            }
            else {
                interaction.editReply({
                    content: `Something went wrong...Please try again`,
                    components: []
                });
            }
        }));
    })
};
