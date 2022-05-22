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
    const recordMembers = () => __awaiter(void 0, void 0, void 0, function* () {
        const guild = client.guilds.cache.get("939091496760668160");
        guild.members.fetch().then(members => {
            members.forEach((member) => __awaiter(void 0, void 0, void 0, function* () {
                yield DiscordUser_1.default.create({
                    id: member.id,
                    avatar: member.avatarURL(),
                    username: member.user.username,
                    discriminator: member.user.discriminator,
                    roles: member.roles,
                    nickname: member.nickname,
                    joined: member.joinedTimestamp,
                    allowed: true,
                    ban: {
                        kind: 'none',
                        reason: '',
                        expires: new Date(Date.now())
                    },
                    last_update: new Date(Date.now()),
                });
            }));
        });
        setTimeout(recordMembers, 1000 * 60 * 15);
    });
    recordMembers();
};
exports.config = {
    dbName: 'MEMBER_LIST',
    displayname: 'Member List'
};
