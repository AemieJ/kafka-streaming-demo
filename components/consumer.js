const {Kafka} = require("kafkajs");

const consumer = async (topicName) => {
    try {
        const kafka = new Kafka({
            clientId: "demo",
            brokers: ["aemiej-mac:9092"]
        });

        const consumer = kafka.consumer({
            groupId: "demo-consumer"
        });

        console.log('Consumer connecting with kafka broker');
        await consumer.connect();
        console.log('Consumer connected with kafka broker');

        consumer.subscribe({
            topic: topicName,
            fromBeginning: true
        });

        consumer.run({
            eachMessage: async result => {
                console.log(`Received message: ${result.message.value} on partition ${result.partition}`);
            }
        });
    } catch (e) {
        console.log(`Error produced: ${e}`);
    }
};

module.exports = consumer;