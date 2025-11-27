# ✈️ SkyReserve - Professional Flight Booking System

A modern, full-stack flight booking application built with the MERN stack, featuring a beautiful Airbnb-inspired UI and complete booking functionality.

![SkyReserve](https://img.shields.io/badge/SkyReserve-Flight%20Booking-blue?style=for-the-badge&logo=airplane)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.0-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)

## 🌟 Features

### ✨ Modern UI/UX
- **Airbnb-inspired Design**: Clean, modern interface with professional styling
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Beautiful transitions and hover effects
- **Professional Color Scheme**: Carefully chosen colors for optimal user experience

### 🛫 Flight Management
- **Search & Filter**: Find flights by destination, date, and airline
- **Real-time Availability**: Live seat availability updates
- **Flight Details**: Comprehensive flight information with airline logos
- **Price Display**: Clear pricing with currency formatting

### 📋 Booking System
- **Complete Booking Flow**: End-to-end booking process
- **Passenger Information**: Collect passenger details securely
- **Seat Selection**: Choose number of seats (1-9)
- **Price Calculation**: Automatic total price calculation
- **Booking Confirmation**: Instant booking confirmation with ID

### 👤 User Management
- **User Authentication**: Secure login and registration
- **Profile Management**: User profile with booking history
- **Booking History**: View and manage all bookings
- **Booking Cancellation**: Cancel bookings with seat return

### 🔧 Admin Features
- **Admin Dashboard**: Complete admin panel
- **Flight Management**: Add, edit, and delete flights
- **Booking Overview**: View all bookings across the system
- **User Management**: Manage user accounts

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skyreserve
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Setup environment**
   ```bash
   npm run setup
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   Or for quick start:
   ```bash
   npm run quick-start
   ```

### 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🏗️ Project Structure

```
skyreserve/
├── backend/                 # Node.js/Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Authentication middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── data/              # Sample flight data
│   └── server.js          # Main server file
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   └── styles/        # CSS styles
│   └── public/            # Static assets
└── package.json           # Root package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Flights
- `GET /api/flights` - Get all flights (with filters)
- `GET /api/flights/:id` - Get specific flight
- `POST /api/flights` - Create flight (admin)
- `PUT /api/flights/:id` - Update flight (admin)
- `DELETE /api/flights/:id` - Delete flight (admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/all` - Get all bookings (admin)
- `DELETE /api/bookings/:id` - Cancel booking

## 🎨 UI Components

### Core Components
- **FlightCard**: Individual flight display with booking button
- **BookingForm**: Modal form for flight booking
- **FlightList**: Grid of available flights with filters
- **Navbar**: Navigation with authentication
- **Notification**: Toast notifications for user feedback

### Pages
- **Home**: Landing page with flight search
- **Login/Signup**: Authentication pages
- **MyBookings**: User booking management
- **AdminDashboard**: Admin panel for system management

## 🎯 Key Features Implemented

### ✅ Complete Booking System
- ✅ Flight search and filtering
- ✅ Real-time seat availability
- ✅ Booking form with validation
- ✅ Price calculation
- ✅ Booking confirmation
- ✅ Booking cancellation
- ✅ User booking history

### ✅ Professional UI/UX
- ✅ Airbnb-inspired design
- ✅ Responsive layout
- ✅ Modern animations
- ✅ Professional color scheme
- ✅ Smooth transitions
- ✅ Mobile-friendly

### ✅ Backend Functionality
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ MongoDB integration
- ✅ Data validation
- ✅ Error handling
- ✅ Admin functionality

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Protected routes
- Admin role management

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface

## 🎨 Design System

### Color Palette
- **Primary**: #FF385C (Airbnb Red)
- **Secondary**: #00A699 (Teal)
- **Accent**: #FFB400 (Gold)
- **Text**: #222222 (Dark Gray)
- **Background**: #FFFFFF (White)

### Typography
- **Font**: Circular (Airbnb's font)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

### Components
- **Border Radius**: 8px, 12px, 16px
- **Shadows**: Light, Medium, Heavy
- **Spacing**: 8px grid system
- **Transitions**: 0.2s ease

## 🚀 Deployment

### Environment Variables
Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/skyreserve
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd ../backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Airbnb**: Design inspiration and UI patterns
- **React**: Frontend framework
- **Express.js**: Backend framework
- **MongoDB**: Database
- **Material-UI**: Component inspiration

## 📞 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the SkyReserve Team**

*Fly with confidence, book with ease! ✈️*