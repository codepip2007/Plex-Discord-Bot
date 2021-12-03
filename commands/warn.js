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
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, interaction, guild, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const client = discord_js_1.default.Client;
        let target = (message ? message.mentions.members.first() : interaction.options.getMember('user'));
        let targetId = target.id;
        if (!target) {
            return {
                custom: true,
                content: 'Please tag someone to warn',
                ephemeral: true
            };
        }
        args.shift();
        let reason = args.join(' ');
        if (!reason) {
            return {
                custom: true,
                content: 'Please provide a reason',
                ephemeral: true
            };
        }
        yield target.send(`**You have been warned in the server! Reason:** ${reason}`);
        return {
            custom: true,
            content: `<@${targetId}> has been warned`,
            ephemeral: true
        };
    })
};
