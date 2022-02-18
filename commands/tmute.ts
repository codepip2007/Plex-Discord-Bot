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
    slash: true,

    callback: async ({ 
        args,
        member: staff,
        guild,
        client,
        message,
        interaction
    }) => {
        if (!guild) {
            interaction.reply({
                content: 'You can only use this in a server',
                ephemeral: true
            })
        }

        let user = interaction.options.getUser('user') as User
        let userId = user.id
        let duration = interaction.options.getString('duration')
        let reason = interaction.options.getString('reason')

            if (!user) {
                interaction.reply({
                    content: `Could not find a user <@${userId}>`,
                    ephemeral: true,
                })
            }

        let time
        let type
        try {
            const split = duration!.match(/\d+|\D+/g)
            time = parseInt(split![0])
            type = split![1].toLowerCase()
        } catch (e) {
            interaction.reply({
                content: "Invalid time format! Example format: \"10d\" where 'd' = days, 'h' = hours and 'm' = minutes.",
                ephemeral: true
            })
        }

        if (type === 'h') {
            time *= 60
        } else if (type === 'd') {
            time *= 60 * 24
        } else if (type !== 'm') {
            interaction.reply({
                content: 'Please use "m", "h", or "d" for minutes, hours, and days respectively.',
                ephemeral: true,
            })
        }

        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + time)

        let result = await punishmentSchema.findOne({
            guildId: guild!.id,
            userId,
            type: 'tempMute'
        })

        if (result) {
            interaction.reply({
                content: `<@${userId}> is already muted in this server.`,
                ephemeral: true
            })
        }

        try {
            const member = await guild!.members.fetch(userId)
            if (member) {
                const muteRole = guild!.roles.cache.find((role) => role.name === 'Muted')!
                if (!muteRole) {
                    interaction.reply({
                        content: 'This server does not have a "Muted" role',
                        ephemeral: true
                    })
                }

                member.roles.add(muteRole)
            }

            await new punishmentSchema({
                userId,
                guildId: guild!.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'tempMute'
            }).save()
        } catch (ignored) {
            interaction.reply({
                content: 'Cannot mute that user',
                ephemeral: true
            })
        }

        await user!.send(`**You have been temporarily muted in the *${guild!.name}* Discord server! Duration:** ${duration}. **Reason:** ${reason}`)

        interaction.reply({
            content: `<@${userId}> has been muted for "${duration}"`,
            ephemeral: true
        })

    }
} as ICommand