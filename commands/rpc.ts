import { MessageActionRow, MessageButton } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Games',
    description: 'Plays rock, paper, scissors with the bot',
    slash: true,

    callback: async ({ interaction, channel }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setStyle('PRIMARY')
            )

        let collector = channel.createMessageComponentCollector({
            max: 1,
            time: 1000 * 60 * 2 //60 seconds times 2 = 2 minutes
        })

        let rpc = ['Rock', 'Paper', 'Scissors']
        let botChoice = rpc[Math.floor(Math.random()*rpc.length)]

        await interaction.reply({
            content: `What did you choose?`,
            components: [row],
            ephemeral: true
        })
        
        collector.on('end', async (collection) => {
            if (collection.first()?.customId === 'rock' && botChoice === 'Rock') {
                interaction.editReply({
                    content: `I chose "Rock" as well. It's a draw!`,
                    components: [],
                })
            } else if (collection.first()?.customId === 'rock' && botChoice === 'Paper') {
                interaction.editReply({
                    content: `I chose "Paper". I win!`,
                    components: []
                })
            } else if (collection.first()?.customId === 'rock' && botChoice === 'Scissors') {
                interaction.editReply({
                    content: `I chose "Scissors". You win!`,
                    components: []
                })
            } else if (collection.first()?.customId === 'paper' && botChoice === 'Rock') {
                interaction.editReply({
                    content: `I chose "Paper". You win!`,
                    components: []
                })
            } else if (collection.first()?.customId === 'paper' && botChoice === 'Paper') {
                interaction.editReply({
                    content: `I also chose "Paper". It's a draw!`,
                    components: []
                })
            } else if (collection.first()?.customId === 'paper' && botChoice === 'Scissors') {
                interaction.editReply({
                    content: `I chose "Scissors". You lose!`,
                    components: []
                })
            } else if (collection.first()?.customId === 'scissors' && botChoice === 'Rock') {
                interaction.editReply({
                    content: `I chose "Rock". You lose!`,
                    components: []
                })
            } else if (collection.first()?.customId === 'scissors' && botChoice === 'Paper') {
                interaction.editReply({
                    content: `I chose "Paper". You win!`,
                    components: []
                })
            } else if (collection.first()?.customId === 'scissors' && botChoice === 'Scissors') {
                interaction.editReply({
                    content: `I chose "Scissors". It's a draw!`,
                    components: []
                })
            } else {
                interaction.editReply({
                    content: `Something went wrong...Please try again`,
                    components: []
                })
            }
        })
    }
} as ICommand