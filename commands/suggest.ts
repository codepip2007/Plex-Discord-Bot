import { MessageEmbed, TextChannel } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    category: 'Configuration',
    description: 'Suggest a feature to the developers',
    minArgs: 1,
    expectedArgs: '<message>',
    expectedArgsTypes: ['STRING'],
    slash: true,

    callback: async ({ interaction, client }) => {
        let message = interaction.options.getString('message')
        const server = client.guilds.cache.get('917598099952787526')
        let suggestionChannel = server?.channels.cache.get('935797241585729546') as TextChannel

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