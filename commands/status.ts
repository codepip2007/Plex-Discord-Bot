import { ICommand } from 'wokcommands';

export default {
    category: 'Configuration',
    description: 'Sets the bot\'s status',
    minArgs: 1,
    expectedArgs: '<status>',
    expectedArgsTypes: ['STRING'],
    slash: 'both',
    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user?.setPresence({
            status: 'online',
            activities: [
            {
                name: text,
            },
        ]
        })

        return {
            custom: true,
            content: 'Status updated',
            ephemeral: true,
        }
    }
} as ICommand