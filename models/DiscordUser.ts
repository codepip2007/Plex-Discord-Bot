import * as mongoose from 'mongoose';

const DiscordUserSchema = new mongoose.Schema({
    id: String,
    avatar: String,
    username: String,
    discriminator: String,
    roles: [String],
    nickname: String,
    joined: Number,
    allowed: Boolean,
    ban: {
        kind: {
            type: String, 
            lowercase: true,
            maxLength: 4
        },
        reason: String,
        expires: Date
    },
    last_update: Date,
},
{
    timestamps: true
});

let name = 'members'
export default mongoose.models[name] || mongoose.model(name, DiscordUserSchema)