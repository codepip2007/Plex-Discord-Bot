import mongoose, { Schema } from 'mongoose'

const reqString = {
    type: String,
    required: true,
}

const schema = new Schema(
    {
        userId: reqString,
        guildId: reqString,
        staffId: reqString,
        reason: reqString,
        expires: Date,
        type: {
            type: String,
            required: true,
            enum: ['tempBan', 'tempMute']
        }
    },
    {
        timestamps: true,
    }
)

let name = 'punishments'
export default mongoose.models[name] || mongoose.model(name, schema)