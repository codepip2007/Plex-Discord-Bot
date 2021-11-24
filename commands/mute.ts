import { ICommand } from 'wokcommands';
import { GuildMember } from 'discord.js'
import { channel } from 'diagnostics_channel';

export default {
    category: 'Moderation',
    description: 'Mutes a user',
    permissions: ['BAN_MEMBERS'],
    slash: false,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: async ({ message, args, member }) => {
        var target = message.mentions.members!.first()
        let userDm = target!.id
        let muteRole = message.guild!.roles.cache.find(role => role.name === "Muted");

        if (!target) {
            return 'Please tag someone to mute'
        }

        args.shift()
        let reason = args.join(' ')
        await message.guild!.members.cache.get(userDm)!.send(`**You have been muted in the server! Reason:** ${reason}`)
        target.roles.add(muteRole!)
        await message.channel.send(`<@${userDm}> has been muted`)
    }
} as ICommand