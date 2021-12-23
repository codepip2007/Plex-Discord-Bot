import { ICommand } from 'wokcommands';

export default {
    category: 'Configuration',
    description: 'Sets the bot\'s status',
    minArgs: 1,
    expectedArgs: '<status>',
    expectedArgsTypes: ['STRING'],
    slash: true,
    ownerOnly: true,

    callback: ({ client, text, interaction }) => {
        client.user?.setPresence({
            status: 'online',
            activities: [
            {
                name: text,
            },
        ]
        })

        interaction.reply({
            content: 'Status updated',
            ephemeral: true,
        })
    }
} as ICommand