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
    slash: false,
    callback: ({ message, text }) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new discord_js_1.MessageEmbed()
            .setDescription("Commands Accepted by Plex")
            .setTitle('Plex Commands')
            .setColor('#1da4ed')
            .setAuthor('Plex by PC')
            .setFooter('Commands are subject to permissions!')
            .addField('/test', 'Tests the bot', true)
            .addField('!ping or /ping', 'Replies with "Pong"', true)
            .addField('!c', 'Shows all commands', true)
            .addField('!verifyme [Full Name]', 'Get verified on the server', true)
            .addField('/ban or !ban [user] [reason]', 'Bans a user', true)
            .addField('/kick or !kick [user] [reason]', 'Kicks a user', true)
            .addField('/status or !status [status]', 'Sets the bot\'s status', true)
            .addField('/resetsts or !resetsts', 'Resets the bot\'s status', true)
            .addField('/send or !send [channel] [text]', 'Sends the provided text in the specified channel', true)
            .addField('/addrole or !addrole [channel] [message ID] [role]', 'Adds the tagged role to the role menu', true)
            .addField('!help', 'Displays the bot\'s help menu', true)
            .addField('/command or !command ["enable" or "disable"] [command]', 'Enables or disables a command in a server', true)
            .addField('/dm or !dm [user] [text]', 'Direct messages the specified user the provided text', true)
            .addField('!purge [amount]', 'Deletes the specified ammount of messages from a channel', true)
            .addField('!role add [user] [role]', 'Adds a role to a user', true)
            .addField('!role remove [user] [role]', 'Removes a role from a user', true)
            .addField('!role has [user] [role]', 'Checks if a user has a role', true)
            .addField('/tmute or !tmute [user] [duration] [reason]', 'Temporarily mutes the specified user', true)
            .addField('/tban or !tban [user] [duration] [reason]', 'Temporarily bans a user from the server', true)
            .addField('/warn', 'Warns a user', true)
            .addField('/clearwarn', 'Deletes the warning from the user', true)
            .addField('/findwarn', 'Lists all the warnings for the specified user', true)
            .addField('/edit or !edit [channel] [message ID] [new text]', 'Edits the bot\'s message', true)
            .addField('/server or !server', 'Lists server information', true)
            .addField('Find docs to the current version here:', 'https://tinyurl.com/plexbotv12docs');
        const newMessage = yield message.reply({
            embeds: [embed]
        });
    }),
};
