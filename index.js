"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = __importStar(require("discord.js"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
exports.client = new discord_js_1.default.Client({
    // These intents are recommended for the built in help menu
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
        discord_js_1.Intents.FLAGS.GUILD_PRESENCES,
        discord_js_1.Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        discord_js_1.Intents.FLAGS.GUILD_BANS,
    ],
});
exports.client.on('ready', () => {
    const dbOptions = {
        // These are the default values
        keepAlive: true
    };
    new wokcommands_1.default(exports.client, {
        // The name of the local folder for your command files
        commandsDir: path_1.default.join(__dirname, 'commands'),
        // The name of the local folder for your feature files
        featuresDir: path_1.default.join(__dirname, 'features'),
        // Allow importing of .ts files if you are using ts-node
        typeScript: false,
        // Specify which are the Test Servers
        testServers: ['949962861369765898', '939091496760668160'],
        // Specify which users are bot owners
        botOwners: '759374512256057344',
        // Pass in the new dbOptions
        dbOptions,
        // Pass in your own mongo connection URI
        mongoUri: process.env.MONGODB
    })
        .setDisplayName("Plex Discord Bot")
        .setCategorySettings([
        {
            name: 'Games',
            emoji: '🎮'
        },
        {
            name: 'Moderation',
            emoji: '🔨'
        },
        {
            name: 'Messages',
            emoji: '📩'
        },
        {
            name: 'Testing',
            emoji: '🧪'
        },
        {
            name: 'Commands',
            emoji: '🛠'
        },
        {
            name: 'Verification',
            emoji: '✔'
        }
    ]);
});
const Filter = require('bad-words');
const filter = new Filter();
let whiteList = ['crap', 'fart', 'turd', 'poop', 'damn'];
filter.removeWords(...whiteList);
exports.client.on('message', msg => {
    if (filter.isProfane(msg.content)) {
        msg.delete().catch(err => console.log(err));
        msg.reply(`${msg.author} NO SWEARING!!!`).then(r => {
            setTimeout(() => r.delete(), 3000);
        });
    }
});
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
// Login to the client
exports.client.login(process.env.TOKEN);
