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
    description: 'Kicks a user',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, interaction, args, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        const target = interaction.options.getMember('user');
        if (!target) {
            interaction.reply({
                content: 'Please tag someone to kick',
                ephemeral: true
            });
        }
        if (!target.kickable) {
            interaction.reply({
                content: 'Cannot kick that user',
                ephemeral: true
            });
        }
        const reason = interaction.options.getString('reason');
        target.kick(reason);
        yield target.send(`**You have been kicked from the *${guild.name}* Discord server! Reason:** ${reason}`);
        interaction.reply({
            content: `You kicked <@${target.id}>`,
            ephemeral: true
        });
    })
};
