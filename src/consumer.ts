import * as Kafka from 'node-rdkafka';

Z

const consumer = new Kafka.KafkaConsumer({
    'debug': "all",
    'metadata.broker.list': brokerHost,
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