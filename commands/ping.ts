import { ICommand } from 'wokcommands';

export default {
    category: 'testing',
    description: 'Replies with pong',

    //delete below for global command
    slash: false,
    testOnly: true,
    //delete above for global command

    callback: ({}) => {
        return 'Pong'
    }
} as ICommand

//works with both /ping and !ping