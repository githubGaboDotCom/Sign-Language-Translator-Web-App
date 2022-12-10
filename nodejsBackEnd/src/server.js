import express from 'express';
import login from './login.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({origin: ['http://localhost:3000'], credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", login);

app.get("/api/tsjMyModel/model.json", (req, res) => {
    
    const absolutePathModel = path.resolve("./src/tsjMyModel/model.json");
    res.sendFile(absolutePathModel, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("File sent!");
        }
    });
});

app.get("/api/tsjMyModel/group1-shard1of3.bin", (req, res) => {
    
    const absolutePathShard1 = path.resolve("./src/tsjMyModel/group1-shard1of3.bin");
    res.sendFile(absolutePathShard1, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("File sent!");
        }
    });
});

app.get("/api/tsjMyModel/group1-shard2of3.bin", (req, res) => {
    
    const absolutePathShard2 = path.resolve("./src/tsjMyModel/group1-shard2of3.bin");
    res.sendFile(absolutePathShard2, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("File sent!");
        }
    });
});

app.get("/api/tsjMyModel/group1-shard3of3.bin", (req, res) => {
    
    const absolutePathShard3 = path.resolve("./src/tsjMyModel/group1-shard3of3.bin");
    res.sendFile(absolutePathShard3, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("File sent!");
        }
    });
});

app.listen(PORT, () => {
    console.log("Server listening in port 8000");
});