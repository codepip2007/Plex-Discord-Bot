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
    maxArgs: 1,
    expectedArgs: '<ammount>',
    callback: ({ message, channel, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const amount = args.length ? parseInt(args.shift()) : 1;
        if (message) {
            yield message.delete();
        }
        // const { size } = await channel.bulkDelete(amount, true)
        const messages = yield channel.messages.fetch({ limit: amount });
        const { size } = messages;
        messages.forEach((message) => message.delete());
        if (amount === 1) {
            const reply = `Deleted ${size} message.`;
            channel.send(reply);
        }
        if (amount > 1) {
            const reply = `Deleted ${size} messages.`;
            channel.send(reply);
        }
    })
};
