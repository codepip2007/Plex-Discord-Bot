import { User } from "discord.js"
import { ICommand } from "wokcommands"

export default {
    category: 'Moderation',
    description: 'Sends a DM to a user1',
    permissions: ['MANAGE_CHANNELS'],
    slash: 'both',
    minArgs: 2,
    expectedArgs: '<user> <message>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, interaction, args, }) => {
        let user: User | undefined
        if (message) {
            user = message.mentions.users?.first()
        } else {
            user = interaction.options.getUser('user') as User
        }
        if (!user) {
            return {
                custom: true,
                content: 'Please provide someone to DM',
                ephemeral: true
            }
        }

        args.shift()
        const text = args.join(' ')
        user.send(`**Message from a moderator:** ${text}`)
        return {
            custom: true,
            content: `Message sent to ${user}`,
            ephemeral: true
        }

    }
} as ICommand