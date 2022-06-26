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
exports.config = void 0;
const discord_js_1 = require("discord.js");
exports.default = (client) => {
    var _a;
    let logChannel = (_a = client.guilds.cache.get('939091496760668160')) === null || _a === void 0 ? void 0 : _a.channels.cache.get('949961552881127464');
    client.on('channelCreate', (channel) => __awaiter(void 0, void 0, void 0, function* () {
        logChannel.send(`${channel} channel created.`);
    }));
    client.on('channelDelete', (channel) => __awaiter(void 0, void 0, void 0, function* () {
        logChannel.send(`${channel} channel deleted.`);
    }));
    client.on('channelUpdate', (channel) => __awaiter(void 0, void 0, void 0, function* () {
        logChannel.send(`${channel} updated.`);
    }));
    //
    client.on('guildBanAdd', member => {
        logChannel.send(`${member} was banned`);
    });
    client.on('guildBanRemove', member => {
        logChannel.send(`${member} was unbanned`);
    });
    client.on('guildIntegrationsUpdate', guild => {
        logChannel.send(`Guild Integrations Updated`);
    });
    client.on('guildMemberUpdate', member => {
        logChannel.send(`${member} was updated`);
    });
    client.on('guildUpdate', guild => {
        logChannel.send(`Guild Updated`);
    });
    client.on('inviteCreate', invite => {
        logChannel.send(`Server Invite Created`);
    });
    client.on('inviteDelete', invite => {
        logChannel.send(`Server Invite Deleted`);
    });
    client.on('messageDelete', message => {
        var _a;
        if ((_a = message.author) === null || _a === void 0 ? void 0 : _a.bot)
            return;
        let embed = new discord_js_1.MessageEmbed()
            .setTitle(`Message Deleted`)
            .addField(`${message.author}`, `${message.content}`);
        logChannel.send({
            embeds: [embed]
        });
    });
    client.on('messageDeleteBulk', message => {
        logChannel.send(`Message Bulk Delete Initiated`);
    });
    client.on('roleCreate', role => {
        logChannel.send(`${role} created`);
    });
    client.on('roleDelete', role => {
        logChannel.send(`${role} deleted`);
    });
    client.on('roleUpdate', role => {
        logChannel.send(`${role} updated`);
    });
};
exports.config = {
    dbName: 'mod_logs',
    displayName: 'Moderator Logs'
};
