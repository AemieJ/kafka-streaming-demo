const { Kafka } = require("kafkajs");

const topic = async (topicName) => {
  try {
    const kafka = new Kafka({
      clientId: "demo",
      brokers: ["aemiej-mac:9092"],
    });

    const admin = kafka.admin();
    console.log("Admin connecting with kafka broker");
    await admin.connect();
    console.log("Admin connected with kafka broker");

    console.log(`Creating topic ${topicName}`);
    const topicCreated = await admin.createTopics({
      topics: [
        {
          topic: topicName,
          numPartitions: 2,
        },
      ],
    });

    await admin.disconnect();

    if (topicCreated) {
      console.log(`Created topic ${topicName}`);
      return 200;
    }
  } catch (e) {
    console.log(`Error produced: ${e}`);
    return 500;
  }
};

// topic(process.argv[2]);
module.exports = topic;
