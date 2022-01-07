import mongoose, { Schema } from 'mongoose'

let req = {  // Makes an easier option for required strings
    type: String, 
    required: true,
}

let schema = new Schema(
    {
        userId: req, // The user to warn
        guildId: req, // The guild
        reason: req, // The reason of the warning
        staffId: req, // The moderator/staff member who warned the user
    },
    {
        timestamps: true, // Include timestamps
    }
)

let name = 'warns' // Name of the database

export default mongoose.models[name] || mongoose.model(name, schema)