import { TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Messages',
    description: 'Edits a message from the bot',
    permissions: ['MANAGE_MESSAGES'],
    slash: 'both',
    minArgs: 2,
    expectedArgs: '<channel> <message ID> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'STRING'],

    callback: async ({ message, interaction, args }) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            return {
                custom: true,
                content: 'Please tag a text channel',
                ephemeral: true
            }
        }
        let id = args[1]
        args.shift()
        args.shift()
        let text = args.join(' ')
        const targetMessage = await channel.messages.fetch(id, {
            cache: true,
            force: true,
        })

        if (!text) {
            return {
                custom: true,
                content: 'Please provide the new content!',
                ephemeral: true
            }
        }

        if(!targetMessage) {
            return {
                custom: true,
                content: 'Unknow message ID',
                ephemeral: true,
            }
        }
        const bot = '912138759229833226'
        if (targetMessage.author.id !== bot) {
            return {
                custom: true,
                content: `Please provide a message ID that was sent from <@${bot}>`,
                ephemeral: true
            }
        }

        targetMessage.edit(text)
        return await {
            custom: true,
            content: 'Message has been edited.',
            ephemeral: true
        }
    }
} as ICommand