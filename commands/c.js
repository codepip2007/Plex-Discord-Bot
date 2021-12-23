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
    category: 'Commands',
    description: 'Sends and embed',
    slash: true,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new discord_js_1.MessageEmbed()
            .setDescription("Commands Accepted by Plex")
            .setTitle('Plex Commands')
            .setColor('#1da4ed')
            .setAuthor('Plex by PC')
            .setFooter('Commands are subject to permissions!')
            .addField('/test', 'Tests the bot', true)
            .addField('/ping', 'Replies with "Pong"', true)
            .addField('/c', 'Shows all commands', true)
            .addField('/verifyme', 'Get verified on the server', true)
            .addField('/ban', 'Bans a user', true)
            .addField('/kick', 'Kicks a user', true)
            .addField('/status', 'Sets the bot\'s status', true)
            .addField('/resetsts', 'Resets the bot\'s status', true)
            .addField('/send', 'Sends the provided text in the specified channel', true)
            .addField('/addrole', 'Adds the tagged role to the role menu', true)
            .addField('!help', 'Displays the bot\'s help menu', true)
            .addField('/command', 'Enables or disables a command in a server', true)
            .addField('/dm', 'Direct messages the specified user the provided text', true)
            .addField('/purge', 'Deletes the specified ammount of messages from a channel', true)
            .addField('/role add', 'Adds a role to a user', true)
            .addField('/role remove', 'Removes a role from a user', true)
            .addField('/role has', 'Checks if a user has a role', true)
            .addField('/tmute', 'Temporarily mutes the specified user', true)
            .addField('/tban', 'Temporarily bans a user from the server', true)
            .addField('/warn', 'Warns a user', true)
            .addField('/clearwarn', 'Deletes the warning from the user', true)
            .addField('/findwarn', 'Lists all the warnings for the specified user', true)
            .addField('/edit', 'Edits the bot\'s message', true)
            .addField('/server', 'Lists server information', true)
            .addField('/access', 'Gives a user access to a channel', true)
            .addField('/remaccess', 'Removes a user\'s access from a channel', true)
            .addField('/rpc', 'Plays rock, paper, scissors with the bot', true)
            .addField('Find docs to the current version here:', 'https://tinyurl.com/plexv14docs');
        const newMessage = yield interaction.reply({
            embeds: [embed]
        });
    }),
};
