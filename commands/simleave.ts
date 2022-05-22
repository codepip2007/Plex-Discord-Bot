import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: "Simulates a leave",
    slash: false,
    testOnly: true,

    callback: ({ member, client }) => {
        client.emit('guildMemberRemove', member)
        return 'Leave Simulated!'
    }
} as ICommand