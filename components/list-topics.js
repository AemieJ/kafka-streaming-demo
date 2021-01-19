const {Kafka} = require("kafkajs");

const topicList = async () => {
    try {
        const kafka = new Kafka({
            clientId: "demo",
            brokers: ["aemiej-mac:9092"]
        });

        const admin = kafka.admin();
        console.log('Admin connecting with kafka broker');
        await admin.connect();
        console.log('Admin connected with kafka broker');

        console.log('Fetching list of topics');
        const res = await admin.listTopics();
        console.log(`Topics list: ${res}`);

        await admin.disconnect();
        return res;

    } catch (e) {
        console.log(`Error produced: ${e}`);
        return 500;
    }
};

// topicList();
module.exports = topicList;