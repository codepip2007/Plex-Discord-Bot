import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sends a message',
    permissions: ['ADMINISTRATOR'],
    minArgs: 1,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    slash: 'both',
    guildOnly: true,
    callback: ({ message, interaction, args }) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            return {
                custom: true,
                content: 'Please tag a text channel',
                ephemeral: true
            }
        }

        args.shift() // Removes the channel from the arguments array
        const text = args.join(' ') // Changes ['hello', 'world'] into 'hello world'

        channel.send(text)

        if (interaction) {
            interaction.reply({
                content: 'Sent messsage!',
                ephemeral: true,
            })
        }
    }

} as ICommand