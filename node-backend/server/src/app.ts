import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import express, { Express } from "express";

// routes
import authRoute from './routes/auth.router';
import packageRoute from './routes/package.route';
import schedRoute from './routes/schedule.route';
import memberRoute from './routes/member.route';
import staffRoute from './routes/staff.route';
import trainerRoute from './routes/trainer.route';
import paymentRoute from './routes/payment.route';
import announcementRoute from './routes/announcement.route';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;


// Logging
app.use(morgan("dev"));

// Parse the request
app.use(express.urlencoded({ extended: false }));

// Takes care of json data
app.use(express.json({ limit: "100mb" })); // Setting the data size of an json
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Default route
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'OK' });
})

// Routes here
app.use('/api', authRoute);
app.use('/api/package', packageRoute);
app.use('/api/schedule', schedRoute);
app.use('/api/member', memberRoute);
app.use('/api/staff', staffRoute);
app.use('/api/trainer', trainerRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/announcement', announcementRoute);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.info(`Server listening on Port ${PORT}`);
});
