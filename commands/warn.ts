import { channel } from 'diagnostics_channel'
import DiscordJS, { GuildMember, TextChannel } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Warns a user',
    permissions: ['BAN_MEMBERS'],
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

   

    callback: async ({ message, interaction, guild, args }) => {
        const client = DiscordJS.Client
        let target = (message ? message.mentions.members!.first() : interaction.options.getMember('user') as GuildMember)
        let targetId = target!.id

        if (!target) {
            return {
                custom: true,
                content: 'Please tag someone to warn',
                ephemeral: true
            }
        }
        args.shift()
        let reason = args.join(' ')
        if (!reason) {
            return {
                custom: true,
                content: 'Please provide a reason',
                ephemeral: true
            }
        }

        await target.send(`**You have been warned in the server! Reason:** ${reason}`)

        return {
            custom: true,
            content: `<@${targetId}> has been warned`,
            ephemeral: true
        }

    }
} as ICommand