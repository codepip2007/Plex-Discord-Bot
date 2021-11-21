import { ICommand } from "wokcommands";
import { MessageEmbed } from 'discord.js';

export default {
    category: 'Commands',
    description: 'Sends and embed',

    callback: async ({ message, text }) => {
            // const json = JSON.parse(text)

            // const embed = new MessageEmbed(json)

            // return embed

        const embed = new MessageEmbed()
        .setDescription("Commands Accepted by Soul Fire Bot")
        .setTitle('Soul Fire Bot Commands')
        .setColor('#1da4ed')
        .setAuthor('Soul Fire')
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
                name: '!command',
                value: 'Shows all commands',
                inline: true,
            },
            {
                name: '!verifyme [Full Name]',
                value: 'Get veified on the server',
                inline: true,
            },
            {
                name: '/ban [user] [reason]',
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
            }
        ])

        const newMessage = await message.reply({
            embeds: [embed]
        })

    },
} as ICommand