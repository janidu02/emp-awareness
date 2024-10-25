const mongoose = require("mongoose");

const MagicLinkSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["employee", "manager"],
        },
        department: {
            type: String,
            default: "",
            enum: ["Management", "Development", "Quality Assurance", "Human Resource", "Admin"],
        },
        pathwayId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pathway",
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        used: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Model = mongoose.model("MagicLink", MagicLinkSchema);

module.exports = Model;
