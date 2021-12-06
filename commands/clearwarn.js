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
const warn_schema_1 = __importDefault(require("../models/warn-schema"));
exports.default = {
    category: 'Moderation',
    description: 'Removes a user\'s warnings',
    requireRoles: true,
    slash: true,
    guildOnly: true,
    testOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <id>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ guild, member: staff, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let user = interaction.options.getUser('user');
        let id = interaction.options.getString('id');
        let warning = yield warn_schema_1.default.findByIdAndDelete(id);
        return {
            custom: true,
            content: `Removed warning ${warning.id} from <@${user === null || user === void 0 ? void 0 : user.id}>`,
            allowedMentions: {
                users: [],
            },
            ephemeral: true
        };
    })
};
