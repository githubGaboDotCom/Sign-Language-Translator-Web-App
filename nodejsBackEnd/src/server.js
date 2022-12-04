import express from 'express';
import login from './login.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({origin: ['http://localhost:3000'], credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", login);

app.listen(PORT, () => {
    console.log("Server listening in port 8000");
});