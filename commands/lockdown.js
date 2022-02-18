"use strict";
// Remove send messages permission when command is used
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
    description: 'Lockdown a channel/server',
    guildOnly: true,
    slash: true,
    requireRoles: true,
    options: [
        {
            name: 'channel',
            type: 'SUB_COMMAND',
            description: 'Lockdown a channel',
            options: [
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel to lockdown',
                    required: true
                },
            ]
        },
        {
            name: 'server',
            type: 'SUB_COMMAND',
            description: 'Lockdown a server',
        },
        {
            name: 'unlock',
            type: 'SUB_COMMAND',
            description: 'Unlock a channel/server',
            options: [
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel to unlock',
                },
            ]
        }
    ],
    callback: ({ interaction, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        let command = interaction.options.getSubcommand();
        let channel = interaction.options.getChannel('channel');
        if (command == 'channel') {
            channel.permissionOverwrites.edit(guild === null || guild === void 0 ? void 0 : guild.roles.everyone, {
                VIEW_CHANNEL: false
            });
            interaction.reply({
                content: `${channel} locked down`,
                ephemeral: true
            });
        }
        else if (command == 'server') {
            guild.channels.cache.forEach((channel) => __awaiter(void 0, void 0, void 0, function* () {
                if (channel.type == 'GUILD_TEXT' || channel.type == 'GUILD_VOICE') {
                    channel.permissionOverwrites.edit(guild === null || guild === void 0 ? void 0 : guild.roles.everyone, {
                        VIEW_CHANNEL: false
                    });
                    yield interaction.reply({
                        content: `${guild} locked down`,
                        ephemeral: true
                    });
                }
                else {
                    return;
                }
            }));
        }
        else if (command == 'unlock') {
            if (channel) {
                channel.permissionOverwrites.edit(guild === null || guild === void 0 ? void 0 : guild.roles.everyone, {
                    VIEW_CHANNEL: null
                });
                interaction.reply({
                    content: `${channel} unlocked`,
                    ephemeral: true
                });
            }
            else {
                guild.channels.cache.forEach((channel) => {
                    if (channel.type == 'GUILD_TEXT' || channel.type == 'GUILD_VOICE') {
                        channel.permissionOverwrites.edit(guild === null || guild === void 0 ? void 0 : guild.roles.everyone, {
                            VIEW_CHANNEL: null
                        });
                    }
                    else {
                        return;
                    }
                });
                interaction.reply({
                    content: `${guild} unlocked`,
                    ephemeral: true
                });
            }
        }
    })
};
