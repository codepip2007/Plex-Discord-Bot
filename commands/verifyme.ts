import { GuildMember, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Verification',
    description: 'Get verified on the server',
    slash: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<First Name> <Last Name>',
    expectedArgsTypes: ['STRING', 'STRING'],

    callback: async({ message, interaction, guild, user, member }) => {
        let firstname = interaction.options.getString('First Name')
        let lastname = interaction.options.getString('Last Name')

        const verConfirm = `**Full Name:** ${firstname} ${lastname}\n**Discord Username:** ${user.tag}\n**Tag:** <@${member.id}>`;
        interaction.reply({
            content: verConfirm,
            ephemeral: true
        })
        member!.setNickname(`${firstname} ${lastname}`);
        const role = guild!.roles.cache.find((role) => role.name === 'Verified')!
        let roleId = role!.id
        member!.roles.add(role)

        setTimeout(() => {
            interaction.editReply({
                content: 'Assigning roles',
            })
        }, 300);
        setTimeout(() => {
            interaction.editReply({
                content: 'Changing name'
            })
        }, 500);
        setTimeout(() => {
            interaction.editReply({
                content: `<@${member.id}> Verification process complete. Welcome to the server!`
            })
        }, 1000);

        setTimeout(() => {
            member!.roles.add(role)
        }, 1500)

        let channel = guild?.channels.cache.find((channel) => channel.name === 'Members') as TextChannel
        channel.send(verConfirm);
}
} as ICommand