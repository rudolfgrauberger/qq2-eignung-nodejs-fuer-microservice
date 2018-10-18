const { Producer } = require('sinek');

const config = {
   kafkaHost: 'qq2.ddnss.de:9092', //no trailing slash here!

   logger: {
      debug: msg => console.log(msg),
      info: msg => console.log(msg),
      warn: msg => console.log(msg),
      error: msg => console.log(msg)
   },
   clientName: 'rg',
   workerPerPartition: 1,
   options: {
      sessionTimeout: 8000,
      protocol: ['roundrobin'],
      fromOffset: 'earliest', //latest
      fetchMaxBytes: 1024 * 100,
      fetchMinBytes: 1,
      fetchMaxWaitMs: 10,
      heartbeatInterval: 250,
      retryMinTimeout: 250,
      autoCommit: true,
      autoCommitIntervalMs: 1000,
      requireAcks: 0,
      ackTimeoutMs: 100,
      partitionerType: 3
   }
};

const partitions = 1;
const producer = new Producer(config, ['logging'], partitions);
let connected = false;

producer.connect().then((_) => {
   connected = true;
   console.log('connected');
}, (error) => {
   console.log(error);
});

const createKafkaMessage = (req, res, par) => JSON.stringify({
   request: req,
   response: res,
   params: par
}, undefined, 3);

const logToKafka = (req, res, par) => {
   if (connected) {
      const msg = createKafkaMessage(req, res, par);
      producer.send('logging', JSON.stringify({
         service_name: '1_NodeJs_1',
         operation: req.method,
         message: msg
      }));
   }
};

module.exports = {
   logToKafka
};