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
const discord_js_1 = __importStar(require("discord.js"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
// import testSchema from './test-schema'
const client = new discord_js_1.default.Client({
    // These intents are recommended for the built in help menu
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
client.on('ready', () => {
    console.log('The bot is ready!');
    const dbOptions = {
        // These are the default values
        keepAlive: true
    };
    new wokcommands_1.default(client, {
        // The name of the local folder for your command files
        commandsDir: path_1.default.join(__dirname, 'commands'),
        // The name of the local folder for your feature files
        featuresDir: path_1.default.join(__dirname, 'features'),
        // Allow importing of .ts files if you are using ts-node
        typeScript: false,
        // Specify which are the Test Servers
        testServers: '900321207277195284',
        // Specify which users are bot owners
        botOwners: '759374512256057344',
        // Pass in the new dbOptions
        dbOptions,
        // Pass in your own mongo connection URI
        mongoUri: process.env.MONGODB
    });
    // setTimeout(async () => {
    //   await new testSchema({
    //     message: 'hello world',
    //   }).save()
    // }, 1000)
});
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
client.login(process.env.TOKEN);
