import { ICommand } from 'wokcommands';
import { GuildMember } from 'discord.js'
import { channel } from 'diagnostics_channel';

export default {
    category: 'Moderation',
    description: 'Mutes a user',
    permissions: ['BAN_MEMBERS'],
    slash: 'both',
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, args, interaction, guild }) => {
        var target = (message ? message.mentions.members!.first() : interaction.options.getMember('user') as GuildMember)
        let userDm = target!.id
        let muteRole =  guild!.roles.cache.find((role) => role.name === 'Muted')

        if (!target) {
            return {
                custom: true,
                content: 'Please tag someone to mute',
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
        await target.send(`**You have been muted in the server! Reason:** ${reason}`)
        target.roles.add(muteRole!)
        return {
            custom: true,
            content: `<@${userDm}> has been muted`,
            ephemeral: true
        }
    }
} as ICommand