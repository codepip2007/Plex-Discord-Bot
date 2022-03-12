import { MessageEmbed, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Submit a report to the moderators',
    minArgs: 2,
    expectedArgs: '<message> <offender>',
    expectedArgsTypes: ['STRING', 'USER'],
    guildOnly: true,
    slash: true,

    testOnly: true,

    callback: ({ interaction, guild }) => {
        let report = interaction.options.getString('message')
        let user = interaction.options.getUser('offender')

        let reportChannel = guild?.channels.cache.find((channel) => channel.name == 'reports') as TextChannel

        if (!reportChannel) {
            interaction.reply({
                content: 'Report could not send! Please contact a moderator!',
                ephemeral: true
            })
        }

        let embed = new MessageEmbed()
        .setTitle('Report')
        .setDescription(report!)
        .setColor('RED')
        .addField('From:', `${interaction.user.tag}\n${interaction.user}`)
        .addField('Reporting:', `${user}`)
        .addField('Status:', 'Investigating')

        reportChannel.send({
            embeds: [embed]
        })

        interaction.reply({
            content: 'Report sent to moderators',
            ephemeral: true
        })
    }
} as ICommand