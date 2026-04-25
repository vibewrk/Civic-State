import { FlowProducer } from 'bullmq';
import { createRedisConnection } from './connection.js';

// FlowProducer gets its own dedicated Redis connection (per Pitfall 2)
const flowProducer = new FlowProducer({ connection: createRedisConnection() });

export interface SubmissionFlowData {
  submissionId: string;
  userId: string;
  issueDescription: string;
  desiredOutcome: string;
  zipCode: string;
  isAnonymous: boolean;
}

// Creates the initial submission flow: parent submission job with classifier child
// Additional children (researcher, drafter, etc.) are added dynamically after classification
export async function createSubmissionFlow(data: SubmissionFlowData) {
  return flowProducer.add({
    name: `submission-${data.submissionId}`,
    queueName: 'submission',
    data: { ...data, status: 'submitted' },
    children: [
      {
        name: `classify-${data.submissionId}`,
        queueName: 'classifier',
        data: { ...data },
      },
    ],
  });
}

export { flowProducer };
