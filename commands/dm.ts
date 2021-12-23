import { User } from "discord.js"
import { ICommand } from "wokcommands"

export default {
    category: 'Moderation',
    description: 'Sends a DM to a user1',
    permissions: ['MANAGE_CHANNELS'],
    slash: true,
    minArgs: 2,
    expectedArgs: '<user> <message>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ interaction, guild }) => {
        let user = interaction.options.getUser('user')
        const text = interaction.options.getString('message')

        user!.send(`**Message from a moderator in the *${guild!.name}* Discord server:** ${text}`)
        
        interaction.reply({
            content: `Message sent to ${user}`,
            ephemeral: true
        })

    }
} as ICommand