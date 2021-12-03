import { User } from 'discord.js'
import { ICommand } from 'wokcommands'
import punishmentSchema from '../models/punishment-schema'

export default {
    category: 'Moderation',
    description: 'Mutes a user',
    permissions: ['BAN_MEMBERS'],
    requireRoles: true,
    minArgs: 3,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],
    slash: 'both',

    callback: async ({ 
        args,
        member: staff,
        guild,
        client,
        message,
        interaction
    }) => {
        if (!guild) {
            return {
                custom: true,
                content: 'You can only use this in a server',
                ephemeral: true
            }
        }

        let userId = args.shift()!
        let duration = args.shift()!
        let reason = args.join(' ')
        let user: User | undefined

        if (message) {
            user = message.mentions.users?.first()
        } else {
            user = interaction.options.getUser('user') as User
        }

        if (!user) {
            userId = userId.replace(/[<@!>]/g, '')
            user = await client.users.fetch(userId)

            if (!user) {
                return {
                    custom: true,
                    content: `Could not find a user with the ID "${userId}"`,
                    ephemeral: true,
                }
            }
        }

        userId = user.id

        let time
        let type
        try {
            const split = duration.match(/\d+|\D+/g)
            time = parseInt(split![0])
            type = split![1].toLowerCase()
        } catch (e) {
            return {
                custom: true,
                content: "Invalid time format! Example format: \"10d\" where 'd' = days, 'h' = hours and 'm' = minutes.",
                ephemaral: true
            }
        }

        if (type === 'h') {
            time *= 60
        } else if (type === 'd') {
            time *= 60 * 24
        } else if (type !== 'm') {
            return {
                custom: true,
                content: 'Please use "m", "h", or "d" for minutes, hours, and days respectively.',
                ephemeral: true,
            }
        }

        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + time)

        let result = await punishmentSchema.findOne({
            guildId: guild.id,
            userId,
            type: 'tempMute'
        })

        if (result) {
            return {
                custom: true,
                content: `<@${userId}> is already muted in this server.`,
                ephemeral: true
            }
        }

        try {
            const member = await guild.members.fetch(userId)
            if (member) {
                const muteRole = guild.roles.cache.find((role) => role.name === 'Muted')
                if (!muteRole) {
                    return {
                        custom: true,
                        cotent: 'This server does not have a "Muted" role',
                        ephemeral: true
                    }
                }

                member.roles.add(muteRole)
            }

            await new punishmentSchema({
                userId,
                guildId: guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'tempMute'
            }).save()
        } catch (ignored) {
            return {
                custom: true,
                content: 'Cannot mute that user',
                ephemeral: true
            }
        }

        user!.send(`**You have been temporarily muted in the *${guild!.name}* Discord server! Duration:** ${duration}. **Reason:** ${reason}`)

        return {
            custom: true,
            content: `<@${userId}> has been muted for "${duration}"`,
            ephemeral: true
        }

    }
} as ICommand