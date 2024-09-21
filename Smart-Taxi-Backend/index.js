

require("dotenv").config();
require('express-async-errors');

const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require("./db/connect");
const { login, register, registerDriver, getAllUsers, getAllDrivers,verifyEmail } = require("./controllers/user");
const authMiddleware = require('./middleware/auth');

// Initialize express and create server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://assma:PFS2001@pfscluster.u2qnqqs.mongodb.net/users';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas', err);
});

// Define Schemas and Models
const locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
}, { timestamps: true });
const Location = mongoose.model('Location', locationSchema);

const taxiLocationSchema = new mongoose.Schema({
  taxiId: String,
  lat: Number,
  lng: Number,
}, { timestamps: true });
const TaxiLocation = mongoose.model('TaxiLocation', taxiLocationSchema);

const requestSchema = new mongoose.Schema({
  taxiLat: Number,
  taxiLng: Number,
  clientLat: Number,
  clientLng: Number,
  destinationLat: Number,
  destinationLng: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'denied'],
    default: 'pending'
  }
}, { timestamps: true });
const Request = mongoose.model('Request', requestSchema);

// Define API routes
const mainRouter = express.Router();
mainRouter.route("/login").post(login);
mainRouter.route("/register").post(register);
mainRouter.route("/registerD").post(registerDriver);
mainRouter.route("/dashboard").get(authMiddleware);
mainRouter.route("/users").get(getAllUsers);
mainRouter.route("/drivers").get(getAllDrivers);
mainRouter.route("/verify-email").get(verifyEmail);
mainRouter.route('/update-location').post(async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const location = new Location({ lat, lng });
    await location.save();
    console.log('Location saved:', location);

    io.emit('locationUpdate', { lat, lng });

    res.status(200).send('Location updated');
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).send('Error updating location');
  }
});
mainRouter.route('/update-taxi-location').post(async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const taxiLocation = new TaxiLocation({ lat, lng });
    await taxiLocation.save();
    console.log('Taxi location saved:', taxiLocation);

    io.emit('taxiLocationUpdate', { lat, lng });

    res.status(200).send('Taxi location updated');
  } catch (error) {
    console.error('Error saving taxi location:', error);
    res.status(500).send('Error updating taxi location');
  }
});
mainRouter.route('/update-request-status').post(async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).send('Request not found');
    }
    request.status = status;
    await request.save();

    if (status === 'accepted') {
      io.emit('requestAccepted', request);
    } else {
      io.emit('requestDenied', request);
    }

    res.status(200).send('Request status updated');
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).send('Error updating request status');
  }
});
mainRouter.route('/update-destination').post(async (req, res) => {
  try {
    const { requestId, destinationLat, destinationLng } = req.body;
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).send('Request not found');
    }
    request.destinationLat = destinationLat;
    request.destinationLng = destinationLng;
    await request.save();

    io.emit('destinationUpdate', request);

    res.status(200).send('Destination updated');
  } catch (error) {
    console.error('Error updating destination:', error);
    res.status(500).send('Error updating destination');
  }
});

// Use the main router for API routes
app.use("/api/v1", mainRouter);

// Socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('taxiLocation', (location) => {
    console.log('Taxi location received:', location);
    io.emit('taxiLocationUpdate', location);
  });

  socket.on('location', (location) => {
    console.log('Client location received:', location);
    io.emit('locationUpdate', location);
  });

  socket.on('sendRequest', async (request) => {
    try {
      const newRequest = new Request(request);
      await newRequest.save();
      console.log('Request saved:', newRequest);

      io.emit('receiveRequest', newRequest);
    } catch (error) {
      console.error('Error saving request:', error);
    }
  });

  socket.on('updateDestination', async ({ requestId, destinationLat, destinationLng }) => {
    try {
      const request = await Request.findByIdAndUpdate(requestId, {
        destinationLat,
        destinationLng
      }, { new: true });

      io.emit('clientDestination', { lat: destinationLat, lng: destinationLng });
      console.log('Destination updated:', request);
    } catch (error) {
      console.error('Error updating destination:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
