"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Games',
    description: 'Plays truth or dare',
    minArgs: 1,
    expectedArgs: '<target>',
    expectedArgsTypes: ['USER'],
    slash: true,
    guildOnly: true,
    callback: ({ interaction, member, channel, message }) => __awaiter(void 0, void 0, void 0, function* () {
        let target = interaction.options.getUser('target');
        let row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('truth')
            .setLabel('Truth')
            .setStyle('SUCCESS'))
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('dare')
            .setLabel('Dare')
            .setStyle('DANGER'));
        interaction.reply({
            content: `${target} Truth or Dare`,
            components: [row]
        });
        let collector = channel.createMessageComponentCollector({
            time: 1000 * 60 * 5, //5 Minutes
        });
        collector.on('collect', (collection) => __awaiter(void 0, void 0, void 0, function* () {
            if (collection.user.id === target.id) {
                if (collection.customId === 'truth') {
                    let truthArr = ["What was the last thing you searched for on your phone?", "After you've dropped a piece of food, what's the longest time you've left it on the ground and then ate it?", "Have you ever tasted a booger?", "Have you ever peed in the pool?", "Who do you think is the worst-dressed person in your family?", "Have you ever farted in an elevator?", "What are some things you think about when sitting on the toilet?", "Did you have an imaginary friend growing up?", "Do you cover your eyes during a scary part in a movie?", "Have you ever practiced kissing in a mirror?", "What is your worst habit?", "Have you ever walked into a wall?", "Do you pick your nose?", "Do you sing in the shower?", "Have you ever peed yourself?", "What was your most embarrassing moment in public?", "Have you ever farted loudly in class?", "Do you ever talk to yourself in the mirror?", "Do you sleep with a stuffed animal?", "Do you drool in your sleep?", "Do you talk in your sleep?", "What is your go-to song for the shower?", "How would you rate your looks on a scale of 1 to 10?", "What was the last thing you texted?", "Have you ever tasted ear wax?", "Have you ever farted and then blamed someone else?", "Have you ever tasted your sweat?", "What is the most illegal thing you have ever done?", "What is your biggest pet peeve?", "Would you rather live with no internet or no A/C or heating?", "If you could go back in time in erase one thing you said or did, what would it be?", "If you were reborn, what decade would you want to be born in?", "If you could suddenly become invisible, what would you do?", "Have you ever waved at someone thinking they saw you when really they didn't? What did you do when you realized it?", "What is the most childish thing that you still do?"];
                    let randTruth = truthArr[Math.floor(Math.random() * truthArr.length)];
                    interaction.editReply({
                        content: `<@${member.id}> asks ${target}: ${randTruth}`,
                        components: []
                    });
                }
                else if (collection.customId === 'dare') {
                    let dareArr = ["Talk in an accent for the next two rounds.", "Pop a balloon without using your mouth or your hands.", "Stack 5 Oreos on your forehead", "Say a tongue twister 3 times in a row.", "Eat a spoonful of peanut butter.", "Spin around 10 times and try to walk straight.", "Do the worm.", "Give someone a piggyback ride around the room.", "Do as many pushups as you can in one minute.", "Sing “I’m a Little Teapot” and do all the actions.", "Tell us your best joke.", "Act like a chicken for 30 seconds.", "Put ice cubes in your shirt.", "Touch your nose with your tongue.", "Eat a spoonful of sugar.", "Say the alphabet backwards.", "Do your best model runway walk.", "Pour a cup of ice-cold water on yourself.", "Everything you say for the rest of the game has to rhyme.", "Find something to wear that can be a cape and act like a superhero.", "Eat a snack without using hands.", "Run around the room while you act like a monkey.", "Go outside and sing the chorus of your favorite song at the top of your lungs.", "Dance crazy with no music.", "Have the person on your left do your hair any way that they choose.", "Everything you say for the next 10 minutes has to be sung to the tune of “Mary had a little lamb”.", "Eat a spoonful of any item in the fridge the person to your right chooses.", "Pretend to be the person on your left for 5 minutes.", "Eat a mouthful of saltines and try to whistle.", "Do 10 cartwheels in a row.", "Do jumping jacks for ten minutes.", "Take a bite out of a stick of butter."];
                    let randDare = dareArr[Math.floor(Math.random() * dareArr.length)];
                    interaction.editReply({
                        content: `<@${member.id}> dares ${target} to ${randDare}`,
                        components: []
                    });
                }
                else {
                    interaction.editReply({
                        content: `Times up! Please run the command again!`,
                        components: []
                    });
                }
            }
            else {
                collection.reply({
                    content: `It's not your choice!`,
                    ephemeral: true,
                    components: []
                });
                return;
            }
        }));
    })
};
