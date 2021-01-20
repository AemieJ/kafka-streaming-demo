const {Kafka} = require("kafkajs");
const localstorage = require("localstorage-polyfill");

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
                // * localstorage => partition 
                // * based on partition => localstorage content-1; if partition 1
                // * localstorage content-0; if partition 0
                if (localstorage.topic !== undefined && localstorage.topic !== topicName) {
                    localstorage.content0 = '';
                    localstorage.content1 = '';
                }
                localstorage.topic = topicName; 

                if (result.partition === 0) {
                    let content = localstorage.content0;
                    if (content !== undefined) {
                        content += `${result.message.value}\n`;
                    } else {
                        content = `${result.message.value}\n`;
                    }
                    localstorage.content0 = content;
                } else if (result.partition === 1) {
                    let content = localstorage.content1;
                    if (content !== undefined) {
                        content += `${result.message.value}\n`;
                    } else {
                        content = `${result.message.value}\n`;
                    }
                    localstorage.content1 = content;
                }

                console.log(`Partition 0: ${localstorage.content0}`);
                console.log(`Partition 1: ${localstorage.content1}`);

                return {
                    content: result.message.value,
                    partition: result.partition
                }
            }
        });


    } catch (e) {
        console.log(`Error produced: ${e}`);
        return {
            content: '',
            partition: -1
        }
    }
};

// consumer('check');
module.exports = consumer;