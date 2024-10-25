const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        department: {
            type: String,
            default: "",
            enum: ["Management", "Development", "Quality Assurance", "Human Resource", "Admin"],
        },

        phoneNo: [
            {
                type: String,
            },
        ],
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "employee",
        },
        id: {
            type: String,
            unique: true,
        },
        profileImage: {
            type: String,
            default: "",
        },
        active: {
            type: Boolean,
            default: true,
        },
        address: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    // :TODO: use bcrypt.genSalt() to generate a salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    //  generate id from role
    const role = user.role.slice(0, 3).toUpperCase();
    //  generate id sequence Eg: EMP-0001
    let sequence =
        (await mongoose.models.User.countDocuments({
            role: user.role,
        })) + 1;
    let newId = `${role}-${sequence.toString().padStart(4, "0")}`;
    // user.id = `${role}-${sequence.toString().padStart(4, "0")}`;
    // check if id already exists
    const generateUniqueId = async () => {
        while (true) {
            console.log("Sequence", sequence);
            const existingUser = await mongoose.models.User.findOne({
                id: newId,
            });
            if (!existingUser) {
                return newId;
            }
            sequence++;
            newId = `${role}-${sequence.toString().padStart(4, "0")}`;
        }
    };

    user.id = await generateUniqueId();
    console.log("New ID", user.id);

    next();
});

UserSchema.methods.comparePassword = async function comparePassword(password) {
    return await bcrypt.compare(password, this.password);
};

const Model = mongoose.model("User", UserSchema);

module.exports = Model;
