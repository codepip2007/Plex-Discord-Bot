import { ICommand } from "wokcommands";
import { Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

export default {
    category: 'Commands',
    description: 'Shows all commands',
    slash: true,
    testOnly: true,

    callback: async ({ interaction, channel }) => {
        let fun = new MessageEmbed()
        .setDescription("Commands Accepted by Plex")
        .setTitle('Fun Commands')
        .setColor('#1da4ed')
        .setAuthor('Plex by PC')
        .setFooter('Find docs to the current version here: https://tinyurl.com/plexv14docs')
        .addField('/rpc', 'Plays \'rock, paper, scissors\' with the bot', true)
        .addField('/roast', 'Roasts the mentioned user', true)
        .addField('/test', 'Tests the bot', true)
        .addField('/ping','Replies with "Pong"', true)

        let mod = new MessageEmbed()
        .setDescription("Commands Accepted by Plex")
        .setTitle('Moderator Commands')
        .setColor('#1da4ed')
        .setAuthor('Plex by PC')
        .setFooter('Find docs to the current version here: https://tinyurl.com/plexv14docs')
        .addField('/ban', 'Bans a user', true)
        .addField('/kick','Kicks a user', true)
        .addField('/send', 'Sends the provided text in the specified channel', true)
        .addField('/addrole', 'Adds the tagged role to the role menu', true)
        .addField('/command', 'Enables or disables a command in a server', true)
        .addField('/dm', 'Direct messages the specified user the provided text', true)
        .addField('/purge', 'Deletes the specified ammount of messages from a channel', true)
        .addField('/role add', 'Adds a role to a user', true)
        .addField('/role remove', 'Removes a role from a user', true)
        .addField('/role has', 'Checks if a user has a role', true)
        .addField('/tmute', 'Temporarily mutes the specified user', true)
        .addField('/tban', 'Temporarily bans a user from the server', true)
        .addField('/warn','Warns a user', true)
        .addField('/clearwarn','Deletes the warning from the user', true)
        .addField('/findwarn','Lists all the warnings for the specified user', true)
        .addField('/edit','Edits the bot\'s message', true)
        .addField('/access', 'Gives a user access to a channel', true)
        .addField('/remaccess', 'Removes a user\'s access from a channel', true)

        let general = new MessageEmbed()
        .setDescription("Commands Accepted by Plex")
        .setTitle('General Commands')
        .setColor('#1da4ed')
        .setAuthor('Plex by PC')
        .setFooter('Find docs to the current version here: https://tinyurl.com/plexv14docs')
        .addField('/verifyme','Get verified on the server', true)
        .addField('!help','Displays the bot\'s help menu', true)
        .addField('/server', 'Lists server information', true)

        let owner = new MessageEmbed()
        .setDescription("Commands Accepted by Plex")
        .setTitle('Bot-Owner Commands')
        .setColor('#1da4ed')
        .setAuthor('Plex by PC')
        .setFooter('Find docs to the current version here: https://tinyurl.com/plexv14docs')
        .addField('/status','Sets the bot\'s status', true)
        .addField('/resetsts','Resets the bot\'s status', true)

        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('general')
                    .setLabel('💬 General')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('mod')
                    .setLabel('🛠️ Moderator')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('fun')
                    .setLabel('🎉 Fun')
                    .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('owner')
                    .setLabel('🛑 Owner')
                    .setStyle('PRIMARY')
            )

        let collector = channel.createMessageComponentCollector({
            max: 50,
            time: 1000 * 60 * 2 //60 seconds times 2 = 5 minutes            
        })

        await interaction.reply({
            embeds: [general],
            components: [row]
        })

        collector.on('collect', async (collection) => {
            if (collection.customId === 'general') {
                interaction.editReply({
                    embeds: [general],
                    components: [row],
                    content: 'General Commands',
                })
            }
            if (collection.customId === 'mod') {
                interaction.editReply({
                    embeds: [mod],
                    components: [row],
                    content: 'Moderator Commands'
                })
            }
            if (collection.customId === 'fun') {
                interaction.editReply({
                    embeds: [fun],
                    components: [row],
                    content: 'Fun Commands'
                })
            }
            if (collection.customId === 'owner') {
                interaction.editReply({
                    embeds: [owner],
                    components: [row],
                    content: 'Owner Commands'
                })
            }
        })
    }
} as ICommand