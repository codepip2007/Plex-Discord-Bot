import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes multiple messages',
    permissions: ['MANAGE_MESSAGES'],
    maxArgs: 1,
    expectedArgs: '<ammount>',
    
    callback: async ({ message, channel, args }) => {
        const amount = args.length ? parseInt(args.shift()!) : 1

        if (message) {
            await message.delete()
        }

        // const { size } = await channel.bulkDelete(amount, true)

        const messages = await channel.messages.fetch({ limit: amount })
        const { size } = messages
        messages.forEach((message) => message.delete())

        if (amount === 1) {
            const reply = `Deleted ${size} message.`
            channel.send(reply)
        }
        if (amount > 1) {
            const reply = `Deleted ${size} messages.`
            channel.send(reply)
        }
    }
} as ICommand