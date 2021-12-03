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
    description: 'Mutes a user',
    permissions: ['BAN_MEMBERS'],
    requireRoles: true,
    minArgs: 3,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],
    slash: 'both',
    callback: ({ args, member: staff, guild, client, message, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!guild) {
            return {
                custom: true,
                content: 'You can only use this in a server',
                ephemeral: true
            };
        }
        let userId = args.shift();
        let duration = args.shift();
        let reason = args.join(' ');
        let user;
        if (message) {
            user = (_a = message.mentions.users) === null || _a === void 0 ? void 0 : _a.first();
        }
        else {
            user = interaction.options.getUser('user');
        }
        if (!user) {
            userId = userId.replace(/[<@!>]/g, '');
            user = yield client.users.fetch(userId);
            if (!user) {
                return {
                    custom: true,
                    content: `Could not find a user with the ID "${userId}"`,
                    ephemeral: true,
                };
            }
        }
        userId = user.id;
        let time;
        let type;
        try {
            const split = duration.match(/\d+|\D+/g);
            time = parseInt(split[0]);
            type = split[1].toLowerCase();
        }
        catch (e) {
            return {
                custom: true,
                content: "Invalid time format! Example format: \"10d\" where 'd' = days, 'h' = hours and 'm' = minutes.",
                ephemaral: true
            };
        }
        if (type === 'h') {
            time *= 60;
        }
        else if (type === 'd') {
            time *= 60 * 24;
        }
        else if (type !== 'm') {
            return {
                custom: true,
                content: 'Please use "m", "h", or "d" for minutes, hours, and days respectively.',
                ephemeral: true,
            };
        }
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + time);
        let result = yield punishment_schema_1.default.findOne({
            guildId: guild.id,
            userId,
            type: 'tempMute'
        });
        if (result) {
            return {
                custom: true,
                content: `<@${userId}> is already muted in this server.`,
                ephemeral: true
            };
        }
        try {
            const member = yield guild.members.fetch(userId);
            if (member) {
                const muteRole = guild.roles.cache.find((role) => role.name === 'Muted');
                if (!muteRole) {
                    return {
                        custom: true,
                        cotent: 'This server does not have a "Muted" role',
                        ephemeral: true
                    };
                }
                member.roles.add(muteRole);
            }
            yield new punishment_schema_1.default({
                userId,
                guildId: guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'tempMute'
            }).save();
        }
        catch (ignored) {
            return {
                custom: true,
                content: 'Cannot mute that user',
                ephemeral: true
            };
        }
        user.send(`**You have been temporarily muted in the *${guild.name}* Discord server! Duration:** ${duration}. **Reason:** ${reason}`);
        return {
            custom: true,
            content: `<@${userId}> has been muted for "${duration}"`,
            ephemeral: true
        };
    })
};
