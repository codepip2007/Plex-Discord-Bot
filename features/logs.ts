import { Client, MessageEmbed, TextChannel } from 'discord.js'


export default (client: Client) => {
    let logChannel = client.guilds.cache.get('939091496760668160')?.channels.cache.get('949961552881127464') as TextChannel

    client.on('channelCreate', async channel => {
        logChannel.send(`${channel} channel created.`)
    })

    client.on('channelDelete', async (channel) => {
        logChannel.send(`${channel} channel deleted.`)
    })

    client.on('channelUpdate', async (channel) => {
        logChannel.send(`${channel} updated.`)
    })

    //

    client.on('guildBanAdd', member => {
        logChannel.send(`${member} was banned`)
    })

    client.on('guildBanRemove', member => {
        logChannel.send(`${member} was unbanned`)
    })

    client.on('guildIntegrationsUpdate', guild => {
        logChannel.send(`Guild Integrations Updated`)
    })

    client.on('guildMemberUpdate', member => {
        logChannel.send(`${member} was updated`)
    })

    client.on('guildUpdate', guild => {
        logChannel.send(`Guild Updated`)
    })

    client.on('inviteCreate', invite => {
        logChannel.send(`Server Invite Created`)
    })

    client.on('inviteDelete', invite => {
        logChannel.send(`Server Invite Deleted`)
    })

    client.on('messageDelete', message => {
        if (message.author?.bot) return;
        let embed = new MessageEmbed()
            .setTitle(`Message Deleted`)
            .addField(`${message.author}`, `${message.content}`)

        logChannel.send({
            embeds: [embed]
        })
    })

    client.on('messageDeleteBulk', message => {
        logChannel.send(`Message Bulk Delete Initiated`)
    })

    client.on('roleCreate', role => {
        logChannel.send(`${role} created`)
    })

    client.on('roleDelete', role => {
        logChannel.send(`${role} deleted`)
    })

    client.on('roleUpdate', role => {
        logChannel.send(`${role} updated`)
    })
}

export const config = {
    dbName: 'mod_logs',
    displayName: 'Moderator Logs'
}