import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Messages',
    description: 'Sends a message',
    permissions: ['MANAGE_MESSAGES'],
    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    slash: true,
    guildOnly: true,

    // testOnly: true,

    callback: ({ message, interaction, args }) => {
        const channel = interaction.options.getChannel('channel') as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            interaction.reply({
                content: 'Please tag a text channel',
                ephemeral: true
            })
        }

        let text = interaction.options.getString('text')!

        channel.send(text)

        if (interaction) {
            interaction.reply({
                content: 'Sent messsage!',
                ephemeral: true,
            })
        }
    }

} as ICommand