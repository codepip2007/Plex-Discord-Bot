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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
exports.default = {
    category: 'Moderation',
    description: 'Warns a user',
    permissions: ['BAN_MEMBERS'],
    slash: false,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const client = discord_js_1.default.Client;
        let target = message.mentions.members.first();
        let targetId = target.id;
        let warnChannel = message.guild.channels.cache.find(channel => channel.name === "warnings");
        if (!target) {
            return 'Please tag someone to warn';
        }
        args.shift();
        let reason = args.join(' ');
        if (!reason) {
            return 'Please provide a reason';
        }
        yield message.guild.members.cache.get(targetId).send(`**You have been warned in the server! Reason:** ${reason}`);
        warnChannel.send(`<@${targetId}> has been warned! Reason: ${reason}`);
    })
};
