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
const DiscordUser_1 = __importDefault(require("../models/DiscordUser"));
exports.default = {
    category: 'Moderation',
    description: 'Adds a user to the database',
    slash: false,
    guildOnly: true,
    requireRoles: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    testOnly: true,
    callback: ({ message, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let member = message.mentions.members.first();
        let logChannel = (_a = client.guilds.cache.get('939091496760668160')) === null || _a === void 0 ? void 0 : _a.channels.cache.get('949961552881127464');
        try {
            yield new DiscordUser_1.default({
                id: member.id,
                avatar: member.avatar,
                username: member.user.username,
                discriminator: member.user.discriminator,
                roles: member.roles.highest,
                nickname: member.displayName,
                joined: member.joinedTimestamp,
                ban: {
                    kind: 'none',
                    reason: '',
                    expires: ''
                },
                last_update: new Date(Date.now())
            }).save();
            logChannel.send(`${member} added to database`);
            // interaction.reply(`${member} added to database`)
        }
        catch (err) {
            logChannel.send(`Error adding ${member} to database, check logs!`);
            // interaction.reply(`Error adding ${member} to database, check logs!`)
            console.log(err);
        }
    })
};
