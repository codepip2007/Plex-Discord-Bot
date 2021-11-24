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
const actions = ['add', 'remove', 'has'];
exports.default = {
    category: 'Configuration',
    description: 'Gives a role to a user',
    permissions: ['MANAGE_ROLES'],
    minArgs: 3,
    expectedArgs: `<"${actions.join('", "')}"> <user @> <role @>"`,
    slash: false,
    guildOnly: true,
    callback: ({ guild, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const action = args.shift();
        if (!action || !actions.includes(action)) {
            return `Unknown action! Please use one of the follwoing: ${actions.join(', ')}`;
        }
        const memberId = args.shift().replace(/[<@!&>]/g, '');
        const roleId = args.shift().replace(/[<@!&>]/g, '');
        const member = guild.members.cache.get(memberId);
        const role = guild.roles.cache.get(roleId);
        if (!member) {
            return `Could not find member with ID ${memberId}`;
        }
        if (!role) {
            return `Could not find role with ID ${roleId}`;
        }
        if (action === 'has') {
            return member.roles.cache.has(roleId)
                ? 'User has role'
                : 'User does not have role';
        }
        if (action === 'add') {
            member.roles.add(role);
            return 'Role given';
        }
        if (action === 'remove') {
            member.roles.remove(role);
            return 'Role removed';
        }
        return 'Unknown action';
    })
};
