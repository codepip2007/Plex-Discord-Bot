import { TextChannel } from 'discord.js';
import { client } from '../index';

export default () => {
    client.on('guildMemberAdd', async (member) => {
        let welcomeChannel = client.guilds.cache.get('939091496760668160')?.channels.cache.get('959233753304154132') as TextChannel

        let welcomeMessage = `Hey ${member}! Welcome to **Pip's Server**! Make sure you:\n> Read the rules in <#939092358266503209>\n> Verify yourself in <#960128401954451496>\n> Check out the available resources in <#939091496760668164>\n> Get access to various topic-based channels, and sign up for notifications in <#945187335073591306>\n> Let us know who you are in <#945189771150508033>\n\nWelcome to the server, if you see something against the rules, report is using the \`/report\` command. Enjoy!`
        welcomeChannel!.send(`${welcomeMessage}`)
    })

    client.on('guildMemberRemove', async (member) => {
        let logChannel = client.guilds.cache.get('939091496760668160')?.channels.cache.get('949961552881127464') as TextChannel

        let welcomeMessage = `${member} left the server`
        logChannel!.send(`${welcomeMessage}`)
    })
}

export const config = {
    dbName: 'WELCOME_MESSAGE',
    displayName: 'Welcome Message'
}