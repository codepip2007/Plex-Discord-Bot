import { ICommand } from 'wokcommands';

export default {
    category: 'Configuration',
    description: 'Sets the bot\'s status',
    minArgs: 1,
    expectedArgs: '<status>',
    slash: 'both',
    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user?.setPresence({
            status: 'online',
            activities: [
            {
                name: text
            }
        ]
        })

        return 'Ststus updated'
    }
} as ICommand