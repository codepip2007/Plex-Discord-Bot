import { ICommand } from 'wokcommands'

export default {
    category: 'Configuration',
    description: 'Gets information about the server',
    slash: true,
    guildOnly: true,

    callback: ({ interaction, guild }) => {

        // let { name, memberCount } = guild!

        interaction.reply({
            content: `**Server Name:** ${guild!.name}\n**Members:** ${guild!.memberCount}`,
            ephemeral: true
        })
    }
} as ICommand