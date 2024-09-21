const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50
    },

    email:{
        type: String,
        required: [true, "Please provide email"],
        minlength: 3,
        maxlength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 3,
        // validate: {
        //     validator: function (value) {
        //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
        //     },
        //     message: props => `${props.value} is not a valid password!`
        //   }
    },
    cin: { type: String, default: null }, // Optionnel pour les clients
    taxiId: { type: String, default: null }, // Optionnel pour les clients
    role: { type: String, required: true, enum: ["client", "driver"] },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpiry: Date
});

DriverSchema.pre("save", async function(){
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

DriverSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

DriverSchema.methods.createVerificationToken = function() {
    const token = crypto.randomBytes(32).toString('hex');
    this.verificationToken = crypto.createHash('sha256').update(token).digest('hex');
    this.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    return token;
}

module.exports = mongoose.model("Driver", DriverSchema);

