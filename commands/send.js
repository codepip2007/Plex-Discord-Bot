"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Sends a message',
    permissions: ['ADMINISTRATOR'],
    minArgs: 1,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    slash: false,
    guildOnly: true,
    callback: ({ message, interaction, args }) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel';
        }
        args.shift(); // Removes the channel from the arguments array
        const text = args.join(' '); // Changes ['hello', 'world'] into 'hello world'
        channel.send(text);
        if (interaction) {
            interaction.reply({
                content: 'Sent messsage!',
                ephemeral: true,
            });
        }
    }
};
