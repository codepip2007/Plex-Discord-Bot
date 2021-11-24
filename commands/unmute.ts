import { ICommand } from 'wokcommands';
import { GuildMember } from 'discord.js'
import { channel } from 'diagnostics_channel';

export default {
    category: 'Moderation',
    description: 'Unmutes a user',
    permissions: ['BAN_MEMBERS'],
    slash: false,
    guildOnly: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, args, member }) => {
        var target = message.mentions.members!.first()
        let userDm = target!.id
        let muteRole = message.guild!.roles.cache.find(role => role.name === "Muted");

        if (!target) {
            return 'Please tag someone to unmute'
        }

        args.shift()
        target.roles.remove(muteRole!)
        await message.channel.send(`<@${userDm}> has been unmuted`)
    }
} as ICommand