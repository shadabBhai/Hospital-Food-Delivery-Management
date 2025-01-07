const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const users = [
  {
    email: "hospital_manager@xyz.com",
    password: "Password@2025",
    role: "manager",
  },
  {
    email: "hospital_pantry@xyz.com",
    password: "Password@2025",
    role: "pantry",
  },
  {
    email: "hospital_delivery@xyz.com",
    password: "Password@2025",
    role: "delivery",
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Hash passwords and save users
    for (let user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new User({ ...user, password: hashedPassword });
      await newUser.save();
    }

    console.log("Users seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding users:", error.message);
  }
};

seedUsers();
