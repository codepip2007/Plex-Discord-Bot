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
    category: 'Verification',
    description: 'Get verified on the server',
    slash: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<First Name> <Last Name>',
    expectedArgsTypes: ['STRING', 'STRING'],
    callback: ({ message, interaction, guild, user, member }) => __awaiter(void 0, void 0, void 0, function* () {
        let firstname = interaction.options.getString('First Name');
        let lastname = interaction.options.getString('Last Name');
        const verConfirm = `**Full Name:** ${firstname} ${lastname}\n**Discord Username:** ${user.tag}\n**Tag:** <@${member.id}>`;
        interaction.reply({
            content: verConfirm,
            ephemeral: true
        });
        member.setNickname(`${firstname} ${lastname}`);
        const role = guild.roles.cache.find((role) => role.name === 'Verified');
        let roleId = role.id;
        member.roles.add(role);
        setTimeout(() => {
            interaction.editReply({
                content: 'Assigning roles',
            });
        }, 300);
        setTimeout(() => {
            interaction.editReply({
                content: 'Changing name'
            });
        }, 500);
        setTimeout(() => {
            interaction.editReply({
                content: `<@${member.id}> Verification process complete. Welcome to the server!`
            });
        }, 1000);
        setTimeout(() => {
            member.roles.add(role);
        }, 1500);
        let channel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.find((channel) => channel.name === 'Members');
        channel.send(verConfirm);
    })
};
