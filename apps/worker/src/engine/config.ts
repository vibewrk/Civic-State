export interface AgentConfig {
  name: string;
  queue: string;
  model: string;
  maxTokens: number;
  systemPromptCacheKey?: string; // For prompt caching (AGNT-04)
}

const DEFAULT_CONFIGS: Record<string, AgentConfig> = {
  classifier: {
    name: 'Classifier',
    queue: 'classifier',
    model: 'claude-haiku-4-5-20250401', // Haiku for classification
    maxTokens: 1024,
    systemPromptCacheKey: 'classifier-system-v1',
  },
  researcher: {
    name: 'Researcher',
    queue: 'researcher',
    model: 'claude-sonnet-4-6-20250401', // Sonnet for research
    maxTokens: 4096,
    systemPromptCacheKey: 'researcher-system-v1',
  },
  drafter: {
    name: 'Drafter',
    queue: 'drafter',
    model: 'claude-sonnet-4-6-20250401', // Sonnet for drafting
    maxTokens: 4096,
    systemPromptCacheKey: 'drafter-system-v1',
  },
  delivery: {
    name: 'Delivery',
    queue: 'delivery',
    model: 'claude-haiku-4-5-20250401', // Haiku for delivery formatting
    maxTokens: 1024,
  },
  treasury: {
    name: 'Treasury',
    queue: 'treasury',
    model: 'claude-haiku-4-5-20250401', // Haiku for treasury
    maxTokens: 1024,
  },
};

// Environment variable override forces ALL agents to one model (per D-21)
export function getAgentConfig(agentName: string): AgentConfig {
  const config = DEFAULT_CONFIGS[agentName];
  if (!config) throw new Error(`Unknown agent: ${agentName}`);

  const override = process.env.AGENT_MODEL_OVERRIDE;
  if (override) {
    return { ...config, model: override };
  }
  return config;
}

export function getAllAgentConfigs(): Record<string, AgentConfig> {
  return { ...DEFAULT_CONFIGS };
}
