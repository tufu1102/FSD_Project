const fs = require('fs');
const path = require('path');

// Create .env file in backend if it doesn't exist
const envPath = path.join(__dirname, 'backend', '.env');
const envExamplePath = path.join(__dirname, 'backend', 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file in backend directory');
  } else {
    const envContent = `MONGODB_URI=mongodb://localhost:27017/skyreserve
JWT_SECRET=skyreserve_jwt_secret_key_2024
PORT=3000`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file in backend directory');
  }
} else {
  console.log('✅ .env file already exists');
}

console.log('\n🚀 SkyReserve Setup Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Install dependencies: npm run install-all');
console.log('3. Start the application: npm run dev');
console.log('\n🌐 The app will be available at:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend: http://localhost:5000');
console.log('\n👤 Default admin user will be created on first registration');
console.log('   (You can manually set isAdmin: true in MongoDB for admin access)');
