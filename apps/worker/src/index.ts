import { classifierWorker } from './agents/classifier.js';
import { researcherWorker } from './agents/researcher.js';
import { drafterWorker } from './agents/drafter.js';
import { deliveryWorker } from './agents/delivery.js';
import { treasuryWorker } from './agents/treasury.js';

console.log('CivicState OpenClaw worker starting...');
console.log(
  'Registered agents:',
  [
    classifierWorker.name,
    researcherWorker.name,
    drafterWorker.name,
    deliveryWorker.name,
    treasuryWorker.name,
  ].join(', '),
);

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down workers...');
  await Promise.all([
    classifierWorker.close(),
    researcherWorker.close(),
    drafterWorker.close(),
    deliveryWorker.close(),
    treasuryWorker.close(),
  ]);
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
