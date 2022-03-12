import { ICommand } from 'wokcommands'
import warnSchema from '../models/warn-schema'

export default {
    category: 'Moderation',
    description: 'Removes a user\'s warnings',
    requireRoles: true,
    slash: true,
    guildOnly: true,
    
    minArgs: 2,
    expectedArgs: '<user> <id>',
    expectedArgsTypes: ['USER', 'STRING'],

    // testOnly: true,

    callback: async ({ guild, member: staff, interaction }) => {
        let user = interaction.options.getUser('user')
        let id = interaction.options.getString('id')

        let warning = await warnSchema.findByIdAndDelete(id)

        return {
            custom: true,
            content: `Removed warning \`${warning.id}\` from <@${user?.id}>`,
            allowedMentions: {
                users: [],
            },
            ephemeral: true
        }
    }
} as ICommand