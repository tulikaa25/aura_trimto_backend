import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
        validate: {
            validator: function(v) {
                // Simple Regex for email format check
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); 
            },
            message: props => `${props.value} is not a valid email address!`
        }
    
  },
  phone: {
    type: String,
    required:true,
    validate: {
            validator: function(v) {
                // Regex for a 10-digit phone number (Common in India)
                return /^\d{10}$/.test(v); 
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
