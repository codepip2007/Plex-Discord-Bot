import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Reset the bot\'s status',
    ownerOnly: true,
    slash: 'both',

    callback: ({ client, text }) => {
        client.user!.setActivity()
        return {
            custom: true,
            content: 'Bot\'s status has been reset',
            ephemeral: true
        }
    }
} as ICommand