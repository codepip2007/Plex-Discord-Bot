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
exports.default = {
    category: 'Moderation',
    description: 'Sends a DM to a user1',
    permissions: ['MANAGE_CHANNELS'],
    slash: true,
    minArgs: 2,
    expectedArgs: '<user> <message>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ interaction, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        let user = interaction.options.getUser('user');
        const text = interaction.options.getString('message');
        user.send(`**Message from a moderator in the *${guild.name}* Discord server:** ${text}`);
        interaction.reply({
            content: `Message sent to ${user}`,
            ephemeral: true
        });
    })
};
