import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: "Simulates a join",
    slash: false,
    testOnly: true,

    callback: ({ member, client }) => {
        client.emit('guildMemberAdd', member)
        return 'Join Simulated!'
    }
} as ICommand