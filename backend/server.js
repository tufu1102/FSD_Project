const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Flight = require('./models/Flight');
const flightsData = require('./data/flightsData');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('Environment variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/flights', require('./routes/flightRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Seed flights data if database is empty
const seedFlights = async () => {
  try {
    const flightCount = await Flight.countDocuments();
    
    if (flightCount === 0) {
      console.log('Seeding flights data...');
      await Flight.insertMany(flightsData);
      console.log('Flights data seeded successfully');
    } else {
      console.log('Flights data already exists');
    }
  } catch (error) {
    console.error('Error seeding flights:', error);
  }
};

// Seed default admin user if it doesn't exist
const seedAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const adminUser = new User({
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'admin1', // will be hashed by User pre-save hook
      isAdmin: true,
      emailVerified: true
    });

    await adminUser.save();
    console.log('Default admin user created: admin@gmail.com / admin1');
  } catch (err) {
    console.error('Error seeding admin user:', err);
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'SkyReserve API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedFlights();
  await seedAdminUser();
});
