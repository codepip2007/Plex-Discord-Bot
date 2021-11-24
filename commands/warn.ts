import { channel } from 'diagnostics_channel'
import DiscordJS, { TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Warns a user',
    permissions: ['BAN_MEMBERS'],
    slash: false,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

   

    callback: async ({ message, args }) => {
        const client = DiscordJS.Client
        let target = message.mentions.members!.first()
        let targetId = target!.id
        let warnChannel = message.guild!.channels.cache.find(channel => channel.name === "warnings") as TextChannel

        if (!target) {
            return 'Please tag someone to warn'
        }
        args.shift()
        let reason = args.join(' ')
        if (!reason) {
            return 'Please provide a reason'
        }

        await message.guild!.members.cache.get(targetId)!.send(`**You have been warned in the server! Reason:** ${reason}`)

        warnChannel.send(`<@${targetId}> has been warned! Reason: ${reason}`)  
        message.channel.send(`<@${targetId}> has been warned`)

    }
} as ICommand