const { spawn } = require('child_process');
const path = require('path');

console.log('🎨 Starting SkyReserve with Material-UI...\n');

// Start backend server
console.log('📡 Starting backend server...');
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Wait a moment for backend to start
setTimeout(() => {
  console.log('\n🌐 Starting frontend with Material-UI...');
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

console.log('\n✅ Material-UI SkyReserve starting up...');
console.log('📱 Frontend: http://localhost:3000');
console.log('🔧 Backend API: http://localhost:5000');
console.log('\n🎨 Features:');
console.log('   ✨ Professional Material-UI components');
console.log('   🎯 Sharp, modern design');
console.log('   📱 Fully responsive');
console.log('   🚀 Smooth animations');
console.log('   🎨 Consistent theming');
console.log('\n💡 Make sure MongoDB is running!');
console.log('🛑 Press Ctrl+C to stop both servers\n');
