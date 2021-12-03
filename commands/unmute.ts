import { ICommand } from 'wokcommands';
import { GuildMember } from 'discord.js'

export default {
    category: 'Moderation',
    description: 'Unmutes a user',
    permissions: ['BAN_MEMBERS'],
    slash: 'both',
    guildOnly: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, args, member, guild }) => {
        var target = (message ? message.mentions.members!.first() : interaction.options.getMember('user') as GuildMember)
        let userDm = target!.id
        let muteRole =  guild!.roles.cache.find((role) => role.name === 'Muted')

        if (!target) {
            return 'Please tag someone to unmute'
        }

        args.shift()
        target.roles.remove(muteRole!)
        return {
            custom: true,
            content: `<@${userDm}> has been unmuted`,
            ephemeral: true
        }
    }
} as ICommand