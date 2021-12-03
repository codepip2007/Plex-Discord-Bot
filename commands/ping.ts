import { ICommand } from 'wokcommands';

export default {
    category: 'testing',
    description: 'Replies with pong',

    slash: 'both',

    callback: ({}) => {
        return {
            custom: true,
            content: 'Pong',
            ephemeral: true
        }
    }
} as ICommand

//works with both /ping and !ping