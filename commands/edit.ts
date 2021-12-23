import { TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Messages',
    description: 'Edits a message from the bot1',
    permissions: ['MANAGE_MESSAGES'],
    slash: true,
    minArgs: 3,
    expectedArgs: '<channel> <messageid> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'STRING'],
    testOnly: true,

    callback: async ({ message, interaction, args }) => {
        const channel = interaction.options.getChannel('channel') as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            interaction.reply({
                content: 'Please tag a text channel',
                ephemeral: true
            })
        }
        let id = interaction.options.getString('messageid')
        let text = interaction.options.getString('text')!
        let targetMessage = await channel!.messages.fetch(id!, {
            cache: true,
            force: true,
        })

        if (!text) {
            interaction.reply({
                content: 'Please provide the new content!',
                ephemeral: true
            })
        }

        if(!targetMessage) {
            interaction.reply({
                content: 'Unknow message ID',
                ephemeral: true,
            })
        }
        // const bot = '912138759229833226'
        // if (targetMessage.author.id !== bot) {
        //     interaction.reply({
        //         content: `Please provide a message ID that was sent from <@${bot}>`,
        //         ephemeral: true
        //     })
        // }

        await targetMessage.edit(text)
        await interaction.reply({
            content: 'Message has been edited.',
            ephemeral: true
        })
    }
} as ICommand