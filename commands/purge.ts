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

        await interaction.reply({
            content: `Deleting ${amount} message(s)...`,
            ephemeral: true
        })

        const { size } = await channel.bulkDelete(amount, true)

        if (amount === 1) {
            await interaction.editReply({
                content: `Deleted ${size} message.`,
            })
        }
        if (amount > 1) {
            await interaction.editReply({
                content: `Deleted ${size} messages.`,
            })
        }

        if (amount > 100) {
            await interaction.editReply({
                content: `Please provide an amount not greater than 100!`,
            })
        }
    }
} as ICommand