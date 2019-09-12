const Worker = require('camunda-worker-node');

const engineEndpoint = 'http://localhost:8080/engine-rest';

const workerId = 'payment-processor';
const workerTopic = 'process-payment';

const worker = new Worker(engineEndpoint, {
  workerId
});


worker.subscribe(workerTopic, async function(context) {
  console.log(context)

  const {
    activityId,
    id
  } = context;

  console.log('Completing work %s on topic %s for activity %s', id, workerTopic, activityId);

  return new Promise((resolve) => {
    setTimeout(function() {
      console.log('Work completed on topic %s', workerTopic);

      resolve({
        variables: {
          paymentNumber: 42
        }
      });
    }, 5000);
  })
});

console.log('Registered external task worker %s for topic %s', workerId, workerTopic);