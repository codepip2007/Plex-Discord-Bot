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
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Testing',
    description: 'testing',
    slash: true,
    callback: ({ interaction: msgInt, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('yes')
            .setLabel('Confirm')
            .setStyle('SUCCESS'))
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('no')
            .setLabel('Cancel')
            .setStyle('DANGER'));
        yield msgInt.reply({
            content: 'Are you sure?',
            components: [row],
            ephemeral: true,
        });
        const filter = (butInt) => {
            return msgInt.user.id === butInt.user.id;
        };
        const collector = channel.createMessageComponentCollector({
            max: 1,
            time: 1000 * 15
        });
        collector.on('end', (collection) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            collection.forEach((click) => {
                // console.log(click.user.id, click.customId)
            });
            if (((_a = collection.first()) === null || _a === void 0 ? void 0 : _a.customId) === 'yes') {
                msgInt.editReply({
                    content: 'Sucess!',
                    components: [],
                });
            }
            else if (((_b = collection.first()) === null || _b === void 0 ? void 0 : _b.customId) === 'no') {
                msgInt.editReply({
                    content: 'Action Cancelled',
                    components: [],
                });
            }
            else {
                msgInt.editReply({
                    content: 'Something went wrong...Please try again',
                    components: []
                });
            }
        }));
    }),
};
