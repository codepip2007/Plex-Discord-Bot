// Remove and add a role's access to a channel

import { GuildChannel, Role } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Remove or add a role\'s access to a channel',
    guildOnly: true,
    slash: true,

    testOnly: true,
    
    requireRoles: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Add a role\'s access to a channel',
            options: [
                {
                    name: 'role',
                    type: 'ROLE',
                    description: 'The role to add access to the channel',
                    required: true
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel to add access to',
                    required: true
                },
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'Remove a role\'s access to a channel',
            options: [
                {
                    name: 'role',
                    type: 'ROLE',
                    description: 'The role to remove access to the channel',
                    required: true
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'The channel to remove access to',
                    required: true
                },
            ]
        },
    ],

    callback: async ({ interaction }) => {
        let command = interaction.options.getSubcommand()
        let channel = interaction.options.getChannel('channel') as GuildChannel
        let role = interaction.options.getRole('role') as Role

        if (command == 'add') {
            channel!.permissionOverwrites.edit(role!, {
                VIEW_CHANNEL: true
            })

            interaction.reply({
                content: `${role} added to ${channel}`,
                ephemeral: true
            })
        } else if (command == 'remove') {
            channel!.permissionOverwrites.edit(role!, {
                VIEW_CHANNEL: false
            })

            interaction.reply({
                content: `${role} removed from ${channel}`,
                ephemeral: true
            })
        }
    }
} as ICommand