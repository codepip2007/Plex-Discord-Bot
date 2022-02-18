import { Client } from 'discord.js'

export default (client: Client) => {
    let limit = 10;
    let time = 5000;
    client.on('message', async (message) => {
        if (message.author.bot) return;

        
        
    })
}