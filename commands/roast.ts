import { ICommand } from 'wokcommands'

export default {
    category: 'Games',
    description: 'Roasts the mentioned user',
    slash: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    testOnly: true,

    callback: async ({ interaction }) => {
        let target = interaction.options.getUser('user')
        let arr = ["Mirrors can't talk. lucky for you, they can't laugh either ",
        "I bet your brain feels as good as new, seeing that you haven't used it",
        "If I got a dime for every brain you didn't have, I'd have a dime",
        "I don't hate you, but I would unplug your life support to charge my phone",
        "Somewhere there is a tree making oxygen for you, you owe that tree an apology",
        "I may not be perfect, but at least im not you",
        "I'm jealous of all the people that haven't met you",
        "I refuse to have a battle of wits with an unarmed person",
        "You must have been born on a highway because thats where accidents happen",
        "Your kid is so annoying he makes his Happy Meal cry",
        "There are empty petri dishes more cultured than you",
        "They say people get what they deserve, in your case, it's a participations trophy",
        "Someday you’ll go far. And I really hope you stay there.",
        "Oops, my bad. I could’ve sworn I was dealing with an adult.",
        "I love what you’ve done with your hair. How do you get it to come out of your nostrils like that?",
        "Remember that time you were saying that thing I didn’t care about? Yeah, that is now.",
        "I’m busy right now, can I ignore you another time?",
        "Oh, you don’t like being treated the way you treat me? That must suck.",
        "I wish I had a flip phone, so I could slam it shut on this conversation.",
        "I’ve been called worse things by better men.",
        "You’re a gray sprinkle on a rainbow cupcake.",
        "Your secrets are always safe with me. I never even listen when you tell me those.",
        "You bring everyone so much joy! You know, when you leave the room. But, still.",
        "You are more disappointing than an unsalted pretzel.",
        "I’ll never forget the first time we met. But I’ll keep trying.",
        "Oh, I’m sorry. Did the middle of my sentence interrupt the beginning of yours?",
        "Hold still. I’m trying to imagine you with personality.",
        "I’m not insulting you, I’m describing you.",
        "Keep rolling your eyes, you might eventually find a brain.",
        "Your face makes onions cry.",
        "Our kid must have gotten his brain from you! I still have mine.",
        "If your brain was dynamite, there wouldn’t be enough to blow your hat off.",
        "You’re cute, like my dog. He also chases his tail for entertainment.",
        "You are like a cloud. When you disappear, it’s a beautiful day.",
        "You have an entire life to be an idiot. Why not take today off?",
        "Your kid is so annoying, he makes his Happy Meal cry.",
        "Your face is just fine, but we’ll have to put a bag over that personality.",
        "I’m not a nerd. I’m just smarter than you.",
        "I may love to shop but I will never buy your bull.",
        "Child, I’ve forgotten more than you ever knew.",
        "I’m an acquired taste. If you don’t like me, acquire some taste.",
        "Bye. Hope to see you never.",
        "Don’t worry, the first 40 years of childhood are always the hardest.",
        "If you’re going to be two-faced, at least make one of them pretty.",
        "The only way my husband would ever get hurt during an activity is if the TV exploded.",
        "I thought of you today. It reminded me to take out the trash.",
        "You bring everyone so much joy when you leave the room.",
        "Did the mental hospital test too many drugs on you today?",
        "OH MY GOSH! IT SPEAKS!",
        "Beauty is only skin deep, but ugly goes clean to the bone.",
        "I’d like to help you out. Which way did you come in?",
        "I forgot the world revolves around you. My apologies, how silly of me.",
        "Light travels faster than sound which is why you seemed bright until you spoke.",
        "I’d rather treat my baby’s diaper rash than have lunch with you.",
        "You look so pretty. Not at all gross, today.",
        "When you look in the mirror, say hi to the clown you see in there for me, would you?"]

        let roast = arr[Math.floor(Math.random()*arr.length)]

        await interaction.reply({
            content: `${target} ${roast}`
        })
    }
} as ICommand