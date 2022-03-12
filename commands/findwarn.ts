import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import warnSchema from '../models/warn-schema'

export default {
    category: 'Moderation',
    description: 'Finds a user\'s warnings',
    requireRoles: true,
    slash: true,
    guildOnly: true,
    
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    testOnly: true,

    callback: async ({ guild, member: staff, interaction }) => {
        let user = interaction.options.getUser('user')

        let warnings = await warnSchema.find({
            userId: user?.id,
            guildId: guild?.id,
        })

        let description = `Warnings for <@${user?.id}>: \n\n`

        for (const warn of warnings) {
            description += `**ID:** ${warn._id}\n`
            description += `**Date:** ${warn.createdAt.toLocaleString()}\n`
            description += `**Staff:** <@${warn.staffId}>\n`
            description += `**Reason:** ${warn.reason}\n\n`
        }

        let embed = new MessageEmbed().setDescription(description)

        return embed
    }
} as ICommand