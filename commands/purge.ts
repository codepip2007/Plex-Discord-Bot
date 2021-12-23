import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes multiple messages',
    permissions: ['MANAGE_MESSAGES'],
    minArgs: 1,
    slash: true,
    expectedArgs: '<amount>',
    expectedArgsTypes: ['NUMBER'],
    
    callback: async ({ message, channel, interaction }) => {
        const amount = interaction.options.getNumber('amount')!

        if (!amount) {
            interaction.reply({
                content: 'Please specify an amount of messages to delete!',
                ephemeral: true
            })
        }

        const { size } = await channel.bulkDelete(amount, true)

        if (amount === 1) {
            message.channel.send(`Deleted ${size} message.`)
        }
        if (amount > 1) {
            message.channel.send(`Deleted ${size} messages.`)
        }
    }
} as ICommand