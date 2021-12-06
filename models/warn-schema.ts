import mongoose, { Schema } from 'mongoose'

let req = {
    type: String,
    required: true,
}

let schema = new Schema(
    {
        userId: req,
        guildId: req,
        reason: req,
        staffId: req,
    },
    {
        timestamps: true,
    }
)

let name = 'warns'

export default mongoose.models[name] || mongoose.model(name, schema)