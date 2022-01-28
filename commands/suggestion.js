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
    description: 'Accept or Deny a suggestion',
    ownerOnly: true,
    slash: true,
    guildOnly: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'accept',
            description: 'Accept a suggestion',
            options: [
                {
                    name: 'message',
                    type: 'STRING',
                    description: 'The message ID of the suggestion to accept',
                    required: true
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'Reason for accepting',
                    required: false
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'reject',
            description: 'Reject a suggestion',
            options: [
                {
                    name: 'message',
                    type: 'STRING',
                    description: 'The message ID of the suggestion to reject',
                    required: true
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'Reason for rejecting',
                    required: false
                },
            ],
        }
    ],
    callback: ({ interaction, guild, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        let command = interaction.options.getSubcommand();
        let mesId = interaction.options.getString('message');
        let reason = interaction.options.getString('reason');
        let suggestChannel = '935797241585729546';
        let sugchan = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(suggestChannel);
        const targetMessage = yield sugchan.messages.fetch(mesId, {
            cache: true,
            force: true
        });
        let oldEmbed = targetMessage.embeds[0];
        let newEmbed = new discord_js_1.MessageEmbed()
            .setTitle(oldEmbed.title)
            .setDescription(oldEmbed.description);
        if (command == 'reject') {
            newEmbed.addField('Status:', `❌ Denied${reason ? ` Reason: ${reason}` : ''}`);
            newEmbed.setColor('RED');
            targetMessage.edit({
                embeds: [newEmbed]
            });
            interaction.reply({
                content: 'Suggestion Rejected!',
                ephemeral: true
            });
        }
        else if (command == 'accept') {
            newEmbed.addField('Status:', `✅ Accepted${reason ? ` Reason: ${reason}` : ''}`);
            newEmbed.setColor('GREEN');
            targetMessage.edit({
                embeds: [newEmbed]
            });
            interaction.reply({
                content: 'Suggestion Accepted',
                ephemeral: true
            });
        }
        else {
            interaction.reply({
                content: 'Unknown Command!',
                ephemeral: true
            });
        }
    })
};
