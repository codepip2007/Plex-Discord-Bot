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
const punishment_schema_1 = __importDefault(require("../models/punishment-schema"));
exports.default = {
    category: 'Moderation',
    description: 'Bans a user',
    permissions: ['BAN_MEMBERS'],
    minArgs: 3,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],
    slash: true,
    callback: ({ args, member: staff, guild, client, message, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            interaction.reply({
                content: 'You can only use this in a server',
                ephemeral: true
            });
        }
        let user = interaction.options.getUser('user');
        let userId = user.id;
        let duration = interaction.options.getString('duration');
        let reason = interaction.options.getString('reason');
        if (!user) {
            interaction.reply({
                content: `Could not find <@${userId}>`,
                ephemeral: true
            });
        }
        let time;
        let type;
        try {
            const split = duration.match(/\d+|\D+/g);
            time = parseInt(split[0]);
            type = split[1].toLowerCase();
        }
        catch (e) {
            interaction.reply({
                content: "Invalid time format! Example format: \"10d\" where 'd' = days, 'h' = hours and 'm' = minutes.",
                ephemeral: true
            });
        }
        if (type === 'h') {
            time *= 60;
        }
        else if (type === 'd') {
            time *= 60 * 24;
        }
        else if (type !== 'm') {
            interaction.reply({
                content: 'Please use "m", "h", or "d" for minutes, hours, and days respectively.',
                ephemeral: true,
            });
        }
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + time);
        let result = yield punishment_schema_1.default.findOne({
            guildId: guild.id,
            userId,
            type: 'tempBan'
        });
        if (result) {
            interaction.reply({
                content: `<@${userId}> is already banned in this server.`,
                ephemeral: true
            });
        }
        try {
            yield guild.members.ban(userId, { days: 7, reason });
            yield new punishment_schema_1.default({
                userId,
                guildId: guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'tempBan'
            }).save();
        }
        catch (ignored) {
            interaction.reply({
                content: 'Cannot ban that user',
                ephemeral: true
            });
        }
        interaction.reply({
            content: `<@${userId}> has been banned for "${duration}", reason: '${reason}'`,
        });
    })
};
