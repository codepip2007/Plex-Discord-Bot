import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import 'dotenv/config'
const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})
client.on('ready', () => {
    console.log('The bot is ready!')
  // const dbOptions = {
  //   // These are the default values
  //   keepAlive: true
  // }
  new WOKCommands(client, {
    // The name of the local folder for your command files
    commandsDir: path.join(__dirname, 'commands'),
    // Allow importing of .ts files if you are using ts-node
    typeScript: true,
    // Specify which are the Test Servers
    testServers: '900321207277195284',
    // // Pass in the new dbOptions
    // dbOptions,
    // Pass in your own mongo connection URI
    // mongoUri: process.env.MONGO
  })
  
 });
  process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
  });

client.login(process.env.TOKEN)

