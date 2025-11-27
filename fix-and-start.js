const { spawn, exec } = require('child_process');
const path = require('path');

console.log('🔧 SkyReserve Fix & Start Script\n');

// Function to run commands
const runCommand = (command, cwd, description) => {
  return new Promise((resolve, reject) => {
    console.log(`📦 ${description}...`);
    const child = spawn(command, { shell: true, cwd, stdio: 'inherit' });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${description} completed\n`);
        resolve();
      } else {
        console.log(`❌ ${description} failed with code ${code}\n`);
        reject(new Error(`Command failed: ${code}`));
      }
    });
  });
};

// Main function
const main = async () => {
  try {
    console.log('🚀 Starting SkyReserve Fix & Start Process...\n');
    
    // Step 1: Install frontend dependencies
    await runCommand('npm install', path.join(__dirname, 'frontend'), 'Installing frontend dependencies');
    
    // Step 2: Install backend dependencies  
    await runCommand('npm install', path.join(__dirname, 'backend'), 'Installing backend dependencies');
    
    // Step 3: Check if MongoDB is running
    console.log('🔍 Checking MongoDB...');
    try {
      await runCommand('mongod --version', __dirname, 'Checking MongoDB');
      console.log('✅ MongoDB is available\n');
    } catch (error) {
      console.log('⚠️  MongoDB not found. Please install MongoDB first.\n');
    }
    
    // Step 4: Start backend
    console.log('📡 Starting backend server...');
    const backend = spawn('npm', ['start'], {
      cwd: path.join(__dirname, 'backend'),
      stdio: 'inherit',
      shell: true
    });
    
    // Wait for backend to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Step 5: Start frontend
    console.log('🌐 Starting frontend with Material-UI...');
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
    
    console.log('\n✅ SkyReserve is starting up!');
    console.log('📱 Frontend: http://localhost:3001');
    console.log('🔧 Backend: http://localhost:3000');
    console.log('\n🎨 Features:');
    console.log('   ✨ Professional Material-UI components');
    console.log('   🎯 Sharp, modern design');
    console.log('   📱 Fully responsive');
    console.log('   🚀 Smooth animations');
    console.log('\n💡 If you see any errors, check the troubleshooting guide!');
    console.log('🛑 Press Ctrl+C to stop both servers\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n🆘 Troubleshooting:');
    console.log('1. Make sure MongoDB is installed and running');
    console.log('2. Check that ports 3000 and 5000 are free');
    console.log('3. Try running: npm cache clean --force');
    console.log('4. Check the TROUBLESHOOTING.md file');
  }
};

main();
