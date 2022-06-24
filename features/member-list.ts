import { Client, TextChannel } from 'discord.js';
import DiscordUser from '../models/DiscordUser';

export default (client: Client) => {
    client.on('guildMemberAdd', async (member) => {
        let logChannel = client.guilds.cache.get('939091496760668160')?.channels.cache.get('949961552881127464') as TextChannel

        try {
            await new DiscordUser({
                id: member.id,
                avatar: member.avatar,
                username: member.user.username,
                discriminator: member.user.discriminator,
                roles: member.roles,
                nickname: member.displayName,
                joined: member.joinedTimestamp,
                ban: {
                    kind: 'none',
                    reason: '',
                    expires: ''
                },
                last_update: new Date(Date.now())
            }).save()
            logChannel.send(`<@${member}> joined and added to database`)
        } catch (err) {
            logChannel.send(`<@${member}> joined, error adding to database, check logs!`)
            console.log(err)
        }
    })
}

export const config = {
    dbName: 'MEMBER_LIST',
    displayName: 'Member List'
}