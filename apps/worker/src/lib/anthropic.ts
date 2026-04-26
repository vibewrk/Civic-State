import Anthropic from '@anthropic-ai/sdk';
import { getAgentConfig } from '../engine/config.js';
import { logAgentAction } from './logger.js';

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!client) {
    client = new Anthropic();
  }
  return client;
}

interface CallWithLoggingOptions {
  agentName: string;
  jobId: string;
  action: string;
  systemPrompt: string;
  userMessage: string;
  temperature?: number;
  maxTokens?: number;
}

interface CallWithLoggingResult {
  text: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
}

export async function callWithLogging(
  options: CallWithLoggingOptions,
): Promise<CallWithLoggingResult> {
  const { agentName, jobId, action, systemPrompt, userMessage, temperature } =
    options;

  const config = getAgentConfig(agentName);
  const anthropic = getAnthropicClient();
  const startTime = Date.now();

  const response = await anthropic.messages.create({
    model: config.model,
    max_tokens: options.maxTokens ?? config.maxTokens,
    temperature: temperature ?? undefined,
    system: [
      {
        type: 'text',
        text: systemPrompt,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: userMessage }],
  });

  const text =
    response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('') || '';

  const inputTokens = response.usage.input_tokens;
  const outputTokens = response.usage.output_tokens;
  const usageAny = response.usage as unknown as Record<string, number>;
  const cacheReadTokens = usageAny.cache_read_input_tokens ?? 0;
  const cacheCreationTokens = usageAny.cache_creation_input_tokens ?? 0;

  const durationMs = Date.now() - startTime;

  await logAgentAction({
    jobId,
    agent: config.name,
    action,
    result: {
      inputTokens,
      outputTokens,
      cacheReadTokens,
      cacheCreationTokens,
      model: config.model,
    },
    modelUsed: config.model,
    inputTokens,
    outputTokens,
    durationMs,
  });

  return { text, inputTokens, outputTokens, cacheReadTokens, cacheCreationTokens };
}
