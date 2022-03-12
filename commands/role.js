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
    category: 'Configuration',
    testOnly: true,
    description: 'Gives a role to a user',
    permissions: ['MANAGE_ROLES'],
    slash: true,
    guildOnly: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Adds a role to the user',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to add the role to',
                    required: true
                },
                {
                    name: 'role',
                    type: 'ROLE',
                    description: 'The role to add to the user',
                    required: true
                },
            ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'Removes a role from the user',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to remove the role from',
                    required: true
                },
                {
                    name: 'role',
                    type: 'ROLE',
                    description: 'The role to remove from the user',
                    required: true
                },
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'has',
            description: 'Checks if the user has the role',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'The user to evaluate',
                    required: true
                },
                {
                    name: 'role',
                    type: 'ROLE',
                    description: 'The role to check',
                    required: true
                },
            ]
        }
    ],
    callback: ({ guild, args, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let action = interaction.options.getSubcommand();
        const targetMember = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        let memberId = targetMember === null || targetMember === void 0 ? void 0 : targetMember.id;
        let roleId = role.id;
        if (!targetMember) {
            return `Could not find member <@${memberId}>`;
        }
        if (!role) {
            return `Could not find role <@&${roleId}>`;
        }
        if (action === 'has') {
            let result = targetMember.roles.cache.has(roleId);
            if (result) {
                interaction.reply({
                    content: `<@${memberId}> has <@&${roleId}>`,
                    ephemeral: true
                });
            }
            else {
                interaction.reply({
                    content: `<@${memberId}> does not have <@&${roleId}>`,
                    ephemeral: true
                });
            }
        }
        if (action === 'add') {
            targetMember.roles.add(roleId);
            interaction.reply({
                content: `Added <@&${roleId}> to <@${memberId}>`,
                ephemeral: true
            });
        }
        if (action === 'remove') {
            targetMember.roles.remove(roleId);
            interaction.reply({
                content: `Removed <@&${roleId}> from <@${memberId}>`,
                ephemeral: true
            });
        }
        interaction.reply({
            content: `Unknown role command! Please use "has", "remove", or "add"`,
            ephemeral: true
        });
    })
};
