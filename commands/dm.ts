import { DMChannel, Message } from "discord.js"
import { ICommand } from "wokcommands"

export default {
    category: 'Moderation',
    description: 'Creates a DM channel with a user',
    permissions: ['MANAGE_CHANNELS'],
    slash: false,
    minArgs: 2,
    expectedArgs: '<user> <message>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, args }) => {
        const target = message.mentions.members?.first()
        const userDm = target!.id
        // console.log(userDm)
        if (!target) {
            return 'Please provide someone to DM'
        }

        args.shift()
        const text = args.join(' ')
        // const dmChannel = target.createDM
        message.guild!.members.cache.get(userDm)!.send(`**Message from a moderator:** ${text}`)
        return `Message sent to ${target}`

    }
} as ICommand