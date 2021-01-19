const {Kafka} = require("kafkajs");
const user = process.argv[2];

const producer = async (topicName) => {
    try {
        const kafka = new Kafka({
            clientId: "demo",
            brokers: ["aemiej-mac:9092"]
        });

        const producer = kafka.producer();
        console.log('Producer connecting with kafka broker');
        await producer.connect();
        console.log('Producer connected with kafka broker');

        const partition = user[0].toUpperCase() < 'N' ? 0 : 1;
        console.log(`Sending user ${user} on partition ${partition}`);
        const result = await producer.send({
            topic: topicName,
            messages: [
                {
                    value: user,
                    partition: partition
                }
            ]
        });
        console.log(`Sent to broker: ${JSON.stringify(result)}`);

        await producer.disconnect();

    } catch (e) {
        console.log(`Error produced: ${e}`);
    } finally {
        process.exit(0);
    }
};

module.exports = producer;