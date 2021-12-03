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
const punishment_schema_1 = __importDefault(require("../models/punishment-schema"));
exports.default = (client) => {
    client.on('guildMemberAdd', (member) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield punishment_schema_1.default.findOne({
            guildId: member.guild.id,
            userId: member.id,
            type: 'tempMute'
        });
        if (result) {
            let mutedRole = member.guild.roles.cache.find((role) => role.name === 'Muted');
            if (mutedRole) {
                member.roles.add(mutedRole);
            }
        }
    }));
    let check = () => __awaiter(void 0, void 0, void 0, function* () {
        let query = {
            expires: { $lt: new Date() }
        };
        let results = yield punishment_schema_1.default.find(query);
        for (const result of results) {
            const { guildId, userId, type } = result;
            let guild = yield client.guilds.fetch(guildId);
            if (!guild) {
                console.log(`Guild "${guildId}" no longer uses this bot.`);
                continue;
            }
            if (type === 'tempBan') {
                guild.members.unban(userId, 'Ban expired');
            }
            else if (type === 'tempMute') {
                let muteRole = guild.roles.cache.find((role) => role.name === 'Muted');
                if (!muteRole) {
                    console.log(`Guild "${guildId}" has no "Muted" role`);
                    continue;
                }
                let member = guild.members.cache.get(userId);
                if (!member) {
                    continue;
                }
                member.roles.remove(muteRole);
            }
        }
        yield punishment_schema_1.default.deleteMany(query);
        setTimeout(check, 1000 * 60);
    });
    check();
};
exports.config = {
    dbName: 'EXPIRED_PUNISHMENTS',
    displayName: 'Expired Punishments'
};
