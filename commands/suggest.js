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
    category: 'Configuration',
    description: 'Suggest something to the server staff',
    minArgs: 1,
    expectedArgs: '<message>',
    expectedArgsTypes: ['STRING'],
    slash: true,
    // testOnly: true,
    callback: ({ interaction, client }) => __awaiter(void 0, void 0, void 0, function* () {
        let message = interaction.options.getString('message');
        const server = client.guilds.cache.get('939091496760668160');
        let suggestionChannel = server === null || server === void 0 ? void 0 : server.channels.cache.get('952064098596696115');
        let embed = new discord_js_1.MessageEmbed()
            .setTitle('New Suggestion')
            .setDescription(`${message}`)
            .setColor('BLUE')
            .addField('Status:', 'Waiting for feedback...');
        suggestionChannel.send({
            embeds: [embed]
        }).then(sentEmbed => {
            sentEmbed.react('👍');
            sentEmbed.react('👎');
        });
        interaction.reply({
            content: 'Suggestion sent!',
            ephemeral: true
        });
    })
};
