import { ICommand } from 'wokcommands'
import warnSchema from '../models/warn-schema'

export default {
    category: 'Moderation',
    description: 'Warns a user',
    requireRoles: true,
    slash: true,
    guildOnly: true,
    
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    testOnly: true,

    callback: async ({ guild, member: staff, interaction }) => {
        let user = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason')

        let warning = await warnSchema.create({
            userId: user?.id,
            staffId: staff.id,
            guildId: guild?.id,
            reason,
        })

        return {
            custom: true,
            content: `<@${user?.id}> has been warned\n${warning.id}\nReason: ${reason}`,
            allowedMentions: {
                users: [],
            },
        }
    }
} as ICommand