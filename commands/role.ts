import { ICommand } from 'wokcommands';

const actions = ['add', 'remove', 'has']

export default {
    category: 'Configuration',
    description: 'Gives a role to a user',
    permissions: ['MANAGE_ROLES'],
    minArgs: 3,
    expectedArgs: `<"${actions.join('", "')}"> <user @> <role @>"`,
    expectedArgsTypes: ['STRING', 'USER', 'ROLE'],
    slash: false,
    guildOnly: true,

    callback: async ({ guild, args }) => {
        const action = args.shift()
        if (!action || !actions.includes(action)) {
            return `Unknown action! Please use one of the follwoing: ${actions.join(', ')}`
        }

        const memberId = args.shift()!.replace(/[<@!&>]/g, '')
        const roleId = args.shift()!.replace(/[<@!&>]/g, '')

        const member = guild!.members.cache.get(memberId)
        const role = guild!.roles.cache.get(roleId)

        if (!member) {
            return `Could not find member with ID ${memberId}`
        }
        if (!role) {
            return `Could not find role with ID ${roleId}`
        }

        if (action === 'has') {
            return member.roles.cache.has(roleId) 
            ? 'User has role'
            : 'User does not have role'
        }
        if (action === 'add') {
            member.roles.add(role)
            return 'Role given'
        }
        if (action === 'remove') {
            member.roles.remove(role)
            return 'Role removed'
        }

        return 'Unknown action'
    }
} as ICommand