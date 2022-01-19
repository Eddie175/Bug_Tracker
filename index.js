const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const {
	MONGO_USER,
	MONGO_PASSWORD,
	MONGO_IP,
	MONGO_PORT,
	SESSION_SECRET,
	ENVIRONMENT,
} = require('./config/config');

const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');

const app = express();

const mongoURL = (ENVIRONMENT === 'development')
	? `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
	: process.env.DB_URL;

const connectWithRetry = () => {
	mongoose
		.connect(mongoURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('successfully connected to DB'))
		.catch((e) => {
			console.log(e);
			setTimeout(connectWithRetry, 5000);
		});
};

connectWithRetry();

app.enable('trust proxy');
app.use(cors({}));
app.use(
	session({
		secret: SESSION_SECRET,
		cookie: {
			secure: false,
			resave: false,
			saveUninitialized: false,
			httpOnly: true,
			maxAge: 30000,
		},
	})
);

app.use(express.json());

app.get('/api/v1', (req, res) => {
	res.send('<h2>Hi There</h2><p>This is where my frontend app will go</p>');
	console.log('yeah it ran');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tickets', ticketRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
