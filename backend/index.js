
const express = require('express');
const socketio = require('socket.io');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
// const jwt = require('jwt-simple');
const config  = require('./config/database');


// image Path
const path = require('path');
// const { server } = require('websocket');
// const donation = path.join(__dirname, '../uploads/donation');


mongoose.Promise = global.Promise;

mongoose.connect(config.database, {
    useNewUrlParser: true,  
    useUnifiedTopology: true        
});

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('database error ' + err);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


const server = app.listen(4000, () => console.log('Server is connected at port : 4000'));
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
io.on('connection', (socket) => {

   
    // console.log(`New connection ${socket.id}`)

    // Listening for event
    // socket.on('addDonationEmit', function(data){
    //     // console.log('chat event trigged at server');
    //     // console.log('need to notify all the clients about this event');
    //     // console.log(data)
    //     io.sockets.emit('addDonationEmit', data);
    // });
    
    // socket.on('addRoleEmit', function(data){
    //     io.sockets.emit('addRoleEmit', data);
    // });
    // socket.on('addUserEmit', function(data){
    //     io.sockets.emit('addUserEmit', data);
    // });
    // socket.on('updateUserEmit', function(data){
    //     io.sockets.emit('updateUserEmit', data);
    // });
    // socket.on('addQuakeEmit', function(data){
    //     io.sockets.emit('addQuakeEmit', data);
    // });
    // socket.on('updateQuakeEmit', function(data){
    //     io.sockets.emit('updateQuakeEmit', data);
    // });
    // socket.on('addShelterEmit', function(data){
    //     io.sockets.emit('addShelterEmit', data);
    // });
    // socket.on('updateShelterEmit', function(data){
    //     io.sockets.emit('updateShelterEmit', data);
    // });
    // socket.on('addReliefEmit', function(data){
    //     io.sockets.emit('addReliefEmit', data);
    // });
    // socket.on('updateReliefEmit', function(data){
    //     io.sockets.emit('updateReliefEmit', data);
    // });
    // socket.on('addPostEmit', function(data){
    //     io.sockets.emit('addPostEmit', data);
    // });
    // socket.on('addCommentEmit', function(data){
    //     io.sockets.emit('addCommentEmit', data);
    // });
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
    // res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-Width, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});




// file path
// app.use('/donations', express.static(path.join(__dirname, './uploads/donations')));
// app.use('/profile', express.static(path.join(__dirname, './uploads/profile')));
// app.use('/news-feeds', express.static(path.join(__dirname, './uploads/news-feeds')));

app.use('/users', require('./routes/users'));
// app.use('/donation', require('./routes/donation'));
// app.use('/image', require('./routes/image'));
// app.use('/contact', require('./routes/contact'));
// app.use('/role', require('./routes/role'));
// app.use('/quake', require('./routes/quake'));
// app.use('/shelter', require('./routes/shelter'));
// app.use('/relief', require('./routes/relief'));
// app.use('/feeds', require('./routes/feeds'));
