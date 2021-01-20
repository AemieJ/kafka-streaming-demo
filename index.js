const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const localstorage = require("localstorage-polyfill");

const topic = require("./components/topic");
const topicList = require("./components/list-topics");
const producer = require("./components/producer");
const consumer = require("./components/consumer");

const app = express();
const port = 5000 || process.env.PORT;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({message: 'Backend is functioning well'});
});

app.post('/app/v1/create-topic/', async (req, res) => {
    console.log(req.body.name);
    const status = await topic(req.body.name);
    (status === 200) ? res.status(201).send('Created') : res.status(500).send('Problem');
});

app.get('/app/v1/get-topics/', async (req, res) => {
    const list = await topicList();
    res.json({
        listTopic: list
    });
});

app.post('/app/v1/post-producer-content/', async (req, res) => {
    const result = await producer(req.body.topic, req.body.content);
    res.json({
        topic: result
    });
});

app.post('/app/v1/get-consumer', async(req, res) => {
    console.log(req.body.topic);
    const result = await consumer(req.body.topic);
    res.json({
        value: result
    });
});

app.get('/app/v1/get-content', (req, res) => {
    res.json({
        partition0: localstorage.content0,
        partition1: localstorage.content1,
        topic: localstorage.topic
    });
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
