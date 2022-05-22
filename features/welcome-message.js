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
exports.config = void 0;
const index_1 = require("../index");
exports.default = () => {
    index_1.client.on('guildMemberAdd', (member) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let welcomeChannel = (_a = index_1.client.guilds.cache.get('939091496760668160')) === null || _a === void 0 ? void 0 : _a.channels.cache.get('959233753304154132');
        let welcomeMessage = `Hey ${member}! Welcome to **Pip's Server**! Make sure you:\n> Read the rules in <#939092358266503209>\n> Verify yourself in <#960128401954451496>\n> Check our the available resources in <#939091496760668164>\n> Get access to various topic-based channels, and sign up for notifications in <#945187335073591306>\n> Let us know who you are in <#945189771150508033>\n\nWelcome to the server, if you see something against the rules, report is using the \`/report\` command. Enjoy!`;
        welcomeChannel.send(`${welcomeMessage}`);
    }));
    index_1.client.on('guildMemberRemove', (member) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        let logChannel = (_b = index_1.client.guilds.cache.get('939091496760668160')) === null || _b === void 0 ? void 0 : _b.channels.cache.get('949961552881127464');
        let welcomeMessage = `${member} left the server`;
        logChannel.send(`${welcomeMessage}`);
    }));
};
exports.config = {
    dbName: 'WELCOME_MESSAGE',
    displayName: 'Welcome Message'
};
