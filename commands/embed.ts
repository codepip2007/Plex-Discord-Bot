import { ICommand } from "wokcommands";
import { MessageEmbed } from 'discord.js';

export default {
    category: 'Testing',
    description: 'Sends and embed',

    permissions: ['ADMINISTRATOR'],

    callback: async ({ message, text }) => {
            const json = JSON.parse(text)

            const embed = new MessageEmbed(json)

            return embed

        // const embed = new MessageEmbed()
        // .setDescription("Hello World")
        // .setTitle('Title')
        // .setColor('#1da4ed')
        // .setAuthor('Pip')
        // .setFooter('Footer')
        // .addFields([
        //     {
        //         name: 'name',
        //         value: 'value2',
        //         inline: true,
        //     },
        //     {
        //         name:'name2',
        //         value: 'value2',
        //         inline: true,
        //     },
        // ])
        // .addField('name three', 'value three')

        // const newMessage = await message.reply({
        //     embeds: [embed]
        // })

        // await new Promise(resolve => setTimeout(resolve, 1000))

        // const newEmbed = newMessage.embeds[0]
        // newEmbed.setTitle('Edited Title')

        // newMessage.edit({
        //     embeds: [newEmbed]
        // })
    },
} as ICommand