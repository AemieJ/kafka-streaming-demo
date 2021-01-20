const {Kafka} = require("kafkajs");

const producer = async (topicName, content) => {
    try {
        const kafka = new Kafka({
            clientId: "demo",
            brokers: ["aemiej-mac:9092"]
        });

        const producer = kafka.producer();
        console.log('Producer connecting with kafka broker');
        await producer.connect();
        console.log('Producer connected with kafka broker');

        const partition = content[0].toUpperCase() < 'N' ? 0 : 1;
        console.log(`Sending content ${content} on partition ${partition}`);
        const result = await producer.send({
            topic: topicName,
            messages: [
                {
                    value: content,
                    partition: partition
                }
            ]
        });
        console.log(`Sent content to broker: ${JSON.stringify(result)}`);
        console.log(result[0].topicName);
        await producer.disconnect();
        return result[0].topicName;

    } catch (e) {
        console.log(`Error produced: ${e}`);
        return '';
    }
};

// producer('toxicity', 'i hate life');
module.exports = producer;