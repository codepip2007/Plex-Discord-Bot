import { MessageEmbed, TextChannel } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    category: 'Configuration',
    description: 'Suggest something to the server staff',
    minArgs: 1,
    expectedArgs: '<message>',
    expectedArgsTypes: ['STRING'],
    slash: true,

    // testOnly: true,

    callback: async ({ interaction, client }) => {
        let message = interaction.options.getString('message')
        const server = client.guilds.cache.get('939091496760668160')
        let suggestionChannel = server?.channels.cache.get('952064098596696115') as TextChannel

        let embed = new MessageEmbed()
        .setTitle('New Suggestion')
        .setDescription(`${message}`) 
        .setColor('BLUE')
        .addField('Status:', 'Waiting for feedback...')

        suggestionChannel.send({
            embeds: [embed]
        }).then(sentEmbed => {
            sentEmbed.react('👍')
            sentEmbed.react('👎')
        })

        interaction.reply({
            content: 'Suggestion sent!',
            ephemeral: true
        })
    }
} as ICommand