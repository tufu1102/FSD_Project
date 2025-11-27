const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting SkyReserve Flight Booking System...\n');

// Start backend server
console.log('📡 Starting backend server...');
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Wait a moment for backend to start
setTimeout(() => {
  console.log('\n🌐 Starting frontend application...');
  const frontend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });

  frontend.on('error', (err) => {
    console.error('❌ Frontend error:', err);
  });

}, 3000);

backend.on('error', (err) => {
  console.error('❌ Backend error:', err);
});

console.log('\n✅ Servers starting up...');
console.log('📱 Frontend will be available at: http://localhost:3000');
console.log('🔧 Backend API will be available at: http://localhost:5000');
console.log('\n💡 Make sure MongoDB is running on your system!');
console.log('🛑 Press Ctrl+C to stop both servers\n');
