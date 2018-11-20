import * as Kafka from 'node-rdkafka';

const broker =  "YOUR_BROKER"
const username = "SASL_SSL_YOUR_USERNAME"
const password = "SASL_SSL_YOUR_PASSWORD"

const consumer = new Kafka.KafkaConsumer({
    'debug': "all",
    'metadata.broker.list': broker,
    'group.id': '$Default',
    'enable.auto.commit': false,
    'security.protocol': 'SASL_SSL',
    'sasl.mechanisms': 'PLAIN',
    'sasl.username': username,
    'sasl.password': password
}, {
    'auto.offset.reset': 'latest'
  });


consumer.on('event.log', function(log) {
    console.log(log);
});

consumer.on('event.error', function(err) {
    console.error('Error from consumer:' + JSON.stringify(err));
});

consumer.on('ready', function() {
    console.log('The consumer has started');

    consumer.subscribe(["test"]);
});

consumer.on('data', function(m) {
    console.log("consumed", m)
});

consumer.connect();