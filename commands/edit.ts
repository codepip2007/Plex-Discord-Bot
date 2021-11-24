import { TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Messages',
    description: 'Edits a message from the bot',
    permissions: ['MANAGE_MESSAGES'],
    minArgs: 2,
    expectedArgs: '<channel> <message ID> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'STRING'],

    callback: async ({ message, args }) => {
        const channel = message.mentions.channels.first() as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel'
        }
        let id = args[1]
        args.shift()
        args.shift()
        let text = args.join(' ')
        const targetMessage = await channel.messages.fetch(id, {
            cache: true,
            force: true,
        })

        if(!targetMessage) {
            return 'Unknow message ID'
        }
        const bot = '912138759229833226'
        if (targetMessage.author.id !== bot) {
            return `Please provide a message ID that was sent from <@${bot}>`
        }

        targetMessage.edit(text)
        await message.channel.send('Message has been edited.')
    }
} as ICommand