import { GuildMember } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    category: 'Moderation',
    description: 'Immediate ban and unban',
    slash: true,
    guildOnly: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    permissions: ['BAN_MEMBERS'],

    // testOnly: true,

    callback: async ({ interaction, user, guild }) => {
        let target = interaction.options.getMember('user') as GuildMember
        
        target?.ban({
            days: 7
        })

        await guild?.bans.remove(target.id)
            .then(r => interaction.reply({
                content: `${r!.username} was softbanned`
            }))
        .catch(console.error);
    }
} as ICommand