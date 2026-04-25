import { computeRowHmac } from 'shared';

interface AgentLogEntry {
  jobId: string;
  agent: string;
  action: string;
  result: Record<string, unknown>;
  modelUsed: string;
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
}

export async function logAgentAction(entry: AgentLogEntry): Promise<void> {
  const { prisma } = await import('shared');

  const logData = {
    ...entry,
    createdAt: new Date(),
  };

  const hmac = computeRowHmac(logData);

  await prisma.agentActionLog.create({
    data: {
      ...logData,
      result: logData.result as Record<string, unknown>,
      hmacChecksum: hmac,
    },
  });
}
