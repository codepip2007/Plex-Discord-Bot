import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

// export default {
//     category: 'Testing',
//     description: 'Testing',
//     ephemeral: true,
//     testOnly: true,

//     callback: ({ message, channel, member }) => {
//         message.reply('Please enter your full name')

//         const filter = (m: Message) => {
//             return m.author.id === message.author.id
//         }
//         const collector = channel.createMessageCollector({
//             filter,
//             max: 1,
//             time: 1000 * 20
//         })

//         // const filter = (rection: MessageReaction, user: User) => {
//         //     return user.id === message.author.id
//         // }
//         // const collector = message.createReactionCollector({
//         //     filter,
//         //     max: 1,
//         //     time: 1000 * 10
//         // })

//         collector.on('collect',  async message => {
//             // console.log(message.content)
//         })

//         collector.on('end', collected => {
//             if (collected.size === 0) {
//                 message.reply('You did not enter your full name. Please try again!')
//                 return
//             }

//             let text = '**Full Name:** '

//             collected.forEach((message) => {
//                 text += `${message.content}\n**Discord Username:** ${message.author.tag}\n**Tag:** <@${message.author.id}>`
//                 // TextChannel.fetch(911479289038393345).send(text)
//                 let newMemberChannel = message.guild!.channels.cache.get('911479289038393345') as TextChannel
//                 newMemberChannel!.send(text)
//                 let newMember = message.author as unknown as GuildMember
//                 newMember.roles.add('911468582473437246')
//                 newMember.setNickname(`${message.content}`)
//             })

//             message.reply(text)
            
//         })
//     }

// } as ICommand

export default {
    category: 'Verification',
    description: 'Get verified on the server',
    slash: false,
    testOnly: true,
    guildOnly: true,
    minArgs: 1,
    expectedArgs: '<Full Name>',
    expectedArgsTypes: [],

    callback: async ({ message, args }) => {
        const name = message.content.replace('!verify', '')


        if (!name) {
            return 'Please provide your full name! Example: "!verify John Doe"';
        } else {
    
        const verConfirm = `**Full Name:** ${name}\n**Discord Username:** ${message.author.tag}\n**Tag:** <@${message.author.id}>`;
        await message.channel.edit(verConfirm)
        let newMemberChannel = message.guild!.channels.cache.get('911479289038393345') as TextChannel;
        newMemberChannel!.send(verConfirm);
        // message.author.roles.add('911468582473437246')
        // const roleMessage = 'Roles have been assigned'
        // message.channel.send(roleMessage)
        // message.author.setNickname(name)
        // const nickMessage = 'Nickname changed'
        // message.channel.edit(nickMessage)
        // const complete = 'Verification process complete. Welcome to the server!'
        // message.channel.send(complete)
        
        }
    }
}