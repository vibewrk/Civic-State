import type { JobStatus } from 'shared';

// Valid state transitions (per D-20)
const TRANSITIONS: Record<string, string[]> = {
  submitted: ['classifying', 'failed'],
  classifying: ['researching', 'failed'],
  researching: ['drafting', 'failed'],
  drafting: ['payment_pending', 'failed'],
  payment_pending: ['paid', 'failed'],
  paid: ['delivering', 'failed'],
  delivering: ['delivered', 'failed'],
  delivered: [], // Terminal state
  failed: [], // Terminal state
};

export function canTransition(from: string, to: string): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export async function transitionJob(
  jobId: string,
  fromStatus: string,
  toStatus: string,
  agentName: string,
): Promise<void> {
  if (!canTransition(fromStatus, toStatus)) {
    throw new Error(
      `Invalid state transition: ${fromStatus} -> ${toStatus} (agent: ${agentName}, job: ${jobId})`,
    );
  }

  // Import Prisma lazily to avoid circular deps
  const { prisma } = await import('shared');
  const { computeRowHmac } = await import('shared');

  // Update job status in database
  await prisma.job.update({
    where: { id: jobId },
    data: {
      status: toStatus,
      ...(toStatus === 'delivered' || toStatus === 'failed'
        ? { completedAt: new Date() }
        : {}),
    },
  });

  // Log state transition to agent_action_logs (per AGNT-06)
  const logEntry = {
    jobId,
    agent: agentName,
    action: 'state_transition',
    result: { from: fromStatus, to: toStatus },
    modelUsed: '',
    inputTokens: 0,
    outputTokens: 0,
    durationMs: 0,
    createdAt: new Date(),
  };

  const hmac = computeRowHmac(logEntry);

  await prisma.agentActionLog.create({
    data: {
      ...logEntry,
      result: logEntry.result as Record<string, unknown>,
      hmacChecksum: hmac,
    },
  });
}

export { TRANSITIONS };
