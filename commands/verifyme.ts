import { GuildMember, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Verification',
    description: 'Get verified on the server',
    slash: false,
    guildOnly: true,
    minArgs: 1,
    expectedArgs: '<Full Name>',
    expectedArgsTypes: [],

    callback: async({ message, args }) => {
        const name = message.content.replace('!verifyme', '')


        if (!name) {
            return {
                custom: true,
                content: 'Please provide your full name! Example: "!verify John Doe"',
                ephemeral: true
            };
        } else {
    
        const verConfirm = `**Full Name:** ${name}\n**Discord Username:** ${message.author.tag}\n**Tag:** <@${message.author.id}>`;
        const msg = await message.channel.send(verConfirm);
        const memberNick = message.author.id as unknown as GuildMember
        if (!message.guild!.me!.permissions.has('MANAGE_NICKNAMES')) {
            return message.channel.send('I don\'t have permission to change your nickname!');
        } else {
            message.member!.setNickname(message.content.replace('!verifyme ', ''));
        }
        const member = message.author as unknown as GuildMember
        if (!message.guild?.me?.permissions.has('MANAGE_ROLES')) {
            return message.channel.send('I don\'t have permisssion to assign you a role');
        } else {
            message.member!.roles.add('874996734189772871')
            message.member!.roles.remove('874997865825587260')
        }


        setTimeout(() => {
            msg.edit('Assigning roles');
        }, 300);
        setTimeout(() => {
            msg.edit('Changing nickname');
        }, 500);
        setTimeout(() => {
            msg.edit(`<@${message.author.id}> Verification process complete. Welcome to the server!`);
        }, 1000);

        let newMemberChannel = message.guild!.channels.cache.get('875229171872305223') as TextChannel;
        newMemberChannel!.send(verConfirm);
    
                
    }
}
} as ICommand