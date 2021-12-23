import { ICommand } from 'wokcommands';

export default {
    category: 'testing',
    description: 'Replies with pong',

    slash: true,

    callback: ({ interaction }) => {
        interaction.reply({
            content: 'Pong!',
            ephemeral: true
        })
    }
} as ICommand

//works with both /ping and !ping