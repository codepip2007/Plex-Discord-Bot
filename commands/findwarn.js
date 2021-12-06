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
const discord_js_1 = require("discord.js");
const warn_schema_1 = __importDefault(require("../models/warn-schema"));
exports.default = {
    category: 'Moderation',
    description: 'Finds a user\'s warnings',
    requireRoles: true,
    slash: true,
    guildOnly: true,
    testOnly: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    callback: ({ guild, member: staff, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let user = interaction.options.getUser('user');
        let warnings = yield warn_schema_1.default.find({
            userId: user === null || user === void 0 ? void 0 : user.id,
            guildId: guild === null || guild === void 0 ? void 0 : guild.id,
        });
        let description = `Warnings for <@${user === null || user === void 0 ? void 0 : user.id}>: \n\n`;
        for (const warn of warnings) {
            description += `**ID:** ${warn._id}\n`;
            description += `**Date:** ${warn.createdAt.toLocaleString()}\n`;
            description += `**Staff:** <@${warn.staffId}>\n`;
            description += `**Reason:** ${warn.reason}\n\n`;
        }
        let embed = new discord_js_1.MessageEmbed().setDescription(description);
        return embed;
    })
};
