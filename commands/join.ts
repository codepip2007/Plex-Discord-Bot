import { GuildMember, TextChannel } from 'discord.js';
import { ICommand } from 'wokcommands';
import DiscordUser from '../models/DiscordUser';

export default {
    category: 'Moderation',
    description: 'Adds a user to the database',
    slash: false,
    guildOnly: true,
    requireRoles: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    testOnly: true,

    callback: async ({ message, client }) => {
        let member = message.mentions.members!.first() as GuildMember

        let logChannel = client.guilds.cache.get('939091496760668160')?.channels.cache.get('949961552881127464') as TextChannel

        try {
            await new DiscordUser({
                id: member!.id,
                avatar: member!.avatar,
                username: member!.user.username,
                discriminator: member!.user.discriminator,
                roles: member!.roles.highest,
                nickname: member!.displayName,
                joined: member!.joinedTimestamp,
                ban: {
                    kind: 'none',
                    reason: '',
                    expires: ''
                },
                last_update: new Date(Date.now())
            }).save()
            logChannel.send(`${member} added to database`)
            // interaction.reply(`${member} added to database`)
        } catch (err) {
            logChannel.send(`Error adding ${member} to database, check logs!`)
            // interaction.reply(`Error adding ${member} to database, check logs!`)
            console.log(err)
        }
    }
} as ICommand