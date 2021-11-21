import { ButtonInteraction, MessageActionRow, MessageButton, MessageComponentInteraction } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    category: 'Testing',
    description: 'testing',
    slash: true,

    callback: async ({ interaction: msgInt, channel }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('yes')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('no')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            )
        
        await msgInt.reply({
            content: 'Are you sure?',
            components: [row],
            ephemeral:true,
        })

        const filter = (butInt: ButtonInteraction) => {
            return msgInt.user.id === butInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            max: 1,
            time: 1000 * 15
        })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                // console.log(click.user.id, click.customId)
            })

            if (collection.first()?.customId === 'yes') {
                msgInt.editReply({
                    content: 'Sucess!',
                    components: [],
                })
            } else if (collection.first()?.customId === 'no') {
                msgInt.editReply({
                    content: 'Action Cancelled',
                    components: [],
                })
            } else {
                msgInt.editReply({
                    content: 'Something went wrong...Please try again',
                    components: []
                })
            }
        })
    },
} as ICommand