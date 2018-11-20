import * as Kafka from 'node-rdkafka';

const brokerHost =  "BROKER_HOST"
const username = "USERNAME"
const password = "PASSWORD"

var producer = new Kafka.Producer(
    {
        'debug': "all",
        'metadata.broker.list': brokerHost,
        'security.protocol': 'SASL_SSL',
        'sasl.mechanisms': 'PLAIN',
        'sasl.username': username,
        'sasl.password': password
    },
    {}
);

producer.on('ready', function() {
    try {
        console.log('ready');
        producer.produce(
            'test',
            null,
            Buffer.from("Hello world"),
        );
        console.log('message success');
    } catch (err) {
        console.error('A problem occurred when sending our message');
        console.error(err);
    }
});

producer.on('event.error', function(err) {
    console.error('Error from producer');
    console.error(err);
});

producer.on('event.log', log => {
    console.log(log);
});

producer.connect();

