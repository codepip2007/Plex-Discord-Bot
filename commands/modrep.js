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
    category: 'Moderation',
    description: 'Resolve or claim a report',
    guildOnly: true,
    slash: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'claim',
            description: 'Claim a report',
            options: [
                {
                    name: 'report',
                    type: 'STRING',
                    description: 'The ID of the report message',
                    required: true
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'resolve',
            description: 'Resolve a report',
            options: [
                {
                    name: 'report',
                    type: 'STRING',
                    description: 'The ID of the report message',
                    required: true
                }
            ]
        }
    ],
    requireRoles: true,
    testOnly: true,
    callback: ({ interaction, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        let command = interaction.options.getSubcommand();
        let mesId = interaction.options.getString('report');
        let reportChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.find((channel) => channel.name == 'reports');
        const targetMessage = yield reportChannel.messages.fetch(mesId, {
            cache: true,
            force: true
        });
        let oldEmbed = targetMessage.embeds[0];
        let newEmbed = new discord_js_1.MessageEmbed()
            .setTitle(oldEmbed.title)
            .setDescription(oldEmbed.description)
            .addFields(oldEmbed.fields);
        if (command == 'claim') {
            newEmbed.fields[2] = {
                name: 'Status',
                value: `Claimed by ${interaction.user}`,
                inline: false
            };
            newEmbed.setColor('YELLOW');
            targetMessage.edit({
                embeds: [newEmbed]
            });
            interaction.reply({
                content: 'Report Claimed!',
                ephemeral: true
            });
        }
        else if (command == 'resolve') {
            newEmbed.fields[2] = {
                name: 'Status',
                value: `Resolved by ${interaction.user}`,
                inline: false
            };
            newEmbed.setColor('GREEN');
            targetMessage.edit({
                embeds: [newEmbed]
            });
            interaction.reply({
                content: 'Report Resolved!',
                ephemeral: true
            });
        }
    })
};
