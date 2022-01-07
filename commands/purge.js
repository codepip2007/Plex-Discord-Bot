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
    description: 'Deletes multiple messages',
    permissions: ['MANAGE_MESSAGES'],
    minArgs: 1,
    slash: true,
    expectedArgs: '<amount>',
    expectedArgsTypes: ['NUMBER'],
    callback: ({ message, channel, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const amount = interaction.options.getNumber('amount');
        if (!amount) {
            interaction.reply({
                content: 'Please specify an amount of messages to delete!',
                ephemeral: true
            });
        }
        yield interaction.reply({
            content: `Deleting ${amount} message(s)...`,
            ephemeral: true
        });
        const { size } = yield channel.bulkDelete(amount, true);
        if (amount === 1) {
            yield interaction.editReply({
                content: `Deleted ${size} message.`,
            });
        }
        if (amount > 1) {
            yield interaction.editReply({
                content: `Deleted ${size} messages.`,
            });
        }
        if (amount > 100) {
            yield interaction.editReply({
                content: `Please provide an amount not greater than 100!`,
            });
        }
    })
};
