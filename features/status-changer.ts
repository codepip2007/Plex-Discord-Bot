import { Client } from "discord.js";

export default (client: Client) => {
    const statusOptions = [
        'Plex',
        'making sure you\'re behaving',
    ]
    let counter = 0

    const updateStatus = () => {
        client.user?.setPresence({
            status: "online",
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        })
        
        if (++counter >= statusOptions.length) {
            counter = 0
        }

        setTimeout(updateStatus, 1000 * 60 * 15)
    }
    updateStatus()
}

export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer',
}