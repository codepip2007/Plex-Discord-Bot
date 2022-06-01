// import { Client } from 'discord.js';
// import DiscordUser from '../models/DiscordUser';

// export default (client: Client) => {
//     const recordMembers = async () => {
//         const guild = client.guilds.cache.get("939091496760668160")

//         guild!.members.fetch().then(members => {
//             members.forEach(async member => {
//                 await DiscordUser.create({
//                     id: member.id,
//                     avatar: member.avatarURL(),
//                     username: member.user.username,
//                     discriminator: member.user.discriminator,
//                     roles: member.roles,
//                     nickname: member.nickname,
//                     joined: member.joinedTimestamp,
//                     allowed: true,
//                     ban: {
//                         kind: 'none',
//                         reason: '',
//                         expires: new Date(Date.now())
//                     },
//                     last_update: new Date(Date.now()),
//                 })
//             })
//         })

//         setTimeout(recordMembers, 1000 * 60 * 15)
//     }
//     recordMembers()
// }

// export const config = {
//     dbName: 'MEMBER_LIST',
//     displayname: 'Member List'
// }