import { ICommand } from "wokcommands";
import { MessageEmbed } from 'discord.js';

export default {
    category: 'Commands',
    description: 'Sends and embed',

    callback: async ({ message, text }) => {

        const embed = new MessageEmbed()
        .setDescription("Commands Accepted by Plex")
        .setTitle('Plex Commands')
        .setColor('#1da4ed')
        .setAuthor('Plex by PC')
        .setFooter('Commands are subject to permissions!')
        .addFields([
            {
                name: '/test',
                value: 'Tests the Bot',
                inline: true,
            },
            {
                name:'!ping',
                value: 'Replies with "Pong"',
                inline: true,
            },
            {
                name: '!c',
                value: 'Shows all commands',
                inline: true,
            },
            {
                name: '!verifyme [Full Name]',
                value: 'Get veified on the server',
                inline: true,
            },
            {
                name: '!ban [user] [reason]',
                value: 'Bans a user',
                inline: true,
            },
            {
                name: '!kick [user] [reason]',
                value: 'Kicks a user',
                inline: true,
            },
            {
                name: '!status [status]',
                value: 'Sets the bot\'s status (Only available to bot owners)',
                inline: true,
            },
            {
                name: '!send [channel] [text]',
                value: 'Sends specified text to the mentioned channel',
                inline: true
            },
            {
                name: '!addrole [channel] [messageId] [role @]',
                value: 'Adds role to role select menu',
                inline: true
            },
            {
                name: '!resetsts',
                value: 'Resets the bot\'s status (Only available to bot owners)',
                inline: true
            },
            {
                name: '!help',
                value: 'Displays the bot\'s help menu',
                inline: true
            },
            {
                name: '!command ["enable" or "disable"] [command name]',
                value: 'Enable/Disable a command',
                inline: true
            },
            {
                name: '!dm [user @] [text]',
                value: 'Sends a direct message to the tagged user',
                inline: true
            },
            {
                name: '!purge [amount]',
                value: 'Deletes the specified amount of messages',
                inline: true
            },
            {
                name: '!role add [user @] [role @]',
                value: 'Assigns role to user',
                inline: true,
            },
            {
                name: '!role remove [user @] [role @]',
                value: 'Removes role from user',
                inline: true,
            },
            {
                name: '!role has [user @] [role @]',
                value: 'Checks if user has role',
                inline: true,
            },
            {
                name: '!mute [user @] [reason]',
                value: 'Mutes a user',
                inline: true
            },
            {
                name: '!unmute [user @]',
                value: 'Unmutes a user',
                inline: true
            }
            
        ])

        const newMessage = await message.reply({
            embeds: [embed]
        })

    },
} as ICommand