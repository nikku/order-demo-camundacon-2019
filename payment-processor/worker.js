const Worker = require('camunda-worker-node');

const engineEndpoint = 'http://localhost:8080/engine-rest';

const workerId = 'payment-processor';
const workerTopic = 'process-payment';

const worker = new Worker(engineEndpoint, {
  workerId
});


worker.subscribe(workerTopic, async function(context) {

  console.log('Completing work on topic %s', workerTopic);

  return {
    variables: {
      paymentNumber: 42
    }
  };
});

console.log('Registered external task worker %s for topic %s', workerId, workerTopic);