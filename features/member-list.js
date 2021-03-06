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
exports.config = void 0;
const DiscordUser_1 = __importDefault(require("../models/DiscordUser"));
exports.default = (client) => {
    client.on('guildMemberAdd', (member) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let logChannel = (_a = client.guilds.cache.get('939091496760668160')) === null || _a === void 0 ? void 0 : _a.channels.cache.get('949961552881127464');
        try {
            yield new DiscordUser_1.default({
                id: member.id,
                avatar: member.avatar,
                username: member.user.username,
                discriminator: member.user.discriminator,
                roles: member.roles,
                nickname: member.displayName,
                joined: member.joinedTimestamp,
                ban: {
                    kind: 'none',
                    reason: '',
                    expires: ''
                },
                last_update: new Date(Date.now())
            }).save();
            logChannel.send(`<@${member}> joined and added to database`);
        }
        catch (err) {
            logChannel.send(`<@${member}> joined, error adding to database, check logs!`);
            console.log(err);
        }
    }));
};
exports.config = {
    dbName: 'MEMBER_LIST',
    displayName: 'Member List'
};
