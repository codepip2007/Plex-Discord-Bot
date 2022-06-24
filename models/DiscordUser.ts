import * as mongoose from 'mongoose';

const DiscordUserSchema = new mongoose.Schema({
    id: String,
    avatar: String,
    username: String,
    discriminator: String,
    roles: [String],
    nickname: String,
    joined: Number,
    ban: {
        kind: {
            type: String, 
            enum: ['none', 'mute', 'hard'],
            default: 'none'
        },
        reason: String,
        expires: Date | String
    },
    last_update: Date,
},
{
    timestamps: true
});

let name = 'members'
export default mongoose.models[name] || mongoose.model(name, DiscordUserSchema)