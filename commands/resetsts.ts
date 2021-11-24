import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Reset the bot\'s status',
    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user!.setActivity()
        return 'Bot\'s status has been reset'
    }
} as ICommand