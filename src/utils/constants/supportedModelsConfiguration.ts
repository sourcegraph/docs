type ProviderData = {
    provider: string;
    model: string;
    status: string;
};

interface TableData {
    cody: {
        [key: string]: ProviderData[];
    };
    byok: {
        [key: string]: ProviderData[];
    };
}

export const chatTableDataConf: TableData = {
  cody: {
      'Sourcegraph': [
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: 'openai/gpt-3.5-turbo' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: 'openai/gpt-4-turbo' },
          { provider: 'OpenAI', model: 'gpt-4o', status: 'openai/gpt-4o' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: 'anthropic/claude-instant-1.2' },
          { provider: 'Anthropic', model: 'Anthropic', status: 'anthropic/claude-2.0' },
          { provider: 'Anthropic', model: 'claude-2.1', status: 'anthropic/claude-2.1' },
          { provider: 'Anthropic', model: 'claude-3 Haiku', status: 'anthropic/claude-3-haiku-20240307' },
          { provider: 'Anthropic', model: 'claude-3 Sonnet', status: 'anthropic/claude-3-sonnet-20240229' },
          { provider: 'Anthropic', model: 'claude-3 Opus', status: 'anthropic/claude-3-opus-20240229' },
          { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: 'anthropic/claude-3-5-sonnet-20240620' },
          { provider: 'Google', model: 'Gemini 1.5 Pro', status: 'google/gemini-1.5-pro-latest' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: 'google/gemini-1.5-flash-latest' },
          { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ]
  },
  byok: {
      'OpenAI': [
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: 'openai/gpt-3.5-turbo' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: 'openai/gpt-4-turbo' },
          { provider: 'OpenAI', model: 'gpt-4o', status: 'openai/gpt-4o' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
          { provider: 'Anthropic', model: 'Anthropic', status: '❌' },
          { provider: 'Anthropic', model: 'claude-2.1 ', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Haiku', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Sonnet', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Opus', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'Anthropic': [
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: 'anthropic/claude-instant-1.2' },
          { provider: 'Anthropic', model: 'Anthropic', status: 'anthropic/claude-2.0' },
          { provider: 'Anthropic', model: 'claude-2.1', status: 'anthropic/claude-2.1' },
          { provider: 'Anthropic', model: 'claude-3 Haiku', status: 'anthropic/claude-3-haiku-20240307' },
          { provider: 'Anthropic', model: 'claude-3 Sonnet', status: 'anthropic/claude-3-sonnet-20240229' },
          { provider: 'Anthropic', model: 'claude-3 Opus', status: 'anthropic/claude-3-opus-20240229' },
          { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: 'anthropic/claude-3-5-sonnet-20240620' },
          { provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'Google': [
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
          { provider: 'Anthropic', model: 'Anthropic', status: '❌' },
          { provider: 'Anthropic', model: 'claude-2.1 ', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Haiku', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Sonnet', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Opus', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Pro', status: 'google/gemini-1.5-pro-latest' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: 'google/gemini-1.5-flash-latest' },
          { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'Azure OpenAI': [
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅ ' },
          { provider: 'OpenAI', model: 'gpt-4', status: '✅ ' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅ ' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '✅ * (5.4.5099 and above)' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
          { provider: 'Anthropic', model: 'Anthropic', status: '❌' },
          { provider: 'Anthropic', model: 'claude-2.1 ', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Haiku', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Sonnet', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Opus', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'AWS Bedrock': [
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: 'anthropic.claude-instant-v1' },
          { provider: 'Anthropic', model: 'Anthropic', status: 'anthropic.claude-v2' },
          { provider: 'Anthropic', model: 'claude-2.1 ', status: 'anthropic.claude-v2:1' },
          { provider: 'Anthropic', model: 'claude-3 Haiku', status: 'anthropic.claude-3-haiku-20240307-v1:0' },
          { provider: 'Anthropic', model: 'claude-3 Sonnet', status: 'anthropic.claude-3-sonnet-20240229-v1:0 ' },
          { provider: 'Anthropic', model: 'claude-3 Opus', status: 'anthropic.claude-3-opus-20240229-v1:0 ' },
          { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: 'anthropic.claude-3-5-sonnet-20240620-v1:0' },
          { provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'GCP Vertex': [
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
          { provider: 'Anthropic', model: 'Anthropic', status: '❌' },
          { provider: 'Anthropic', model: 'claude-2.1 ', status: '❌' },
          { provider: 'Anthropic', model: 'claude-3 Haiku', status: 'claude-3-haiku@20240307' },
          { provider: 'Anthropic', model: 'claude-3 Sonnet', status: 'claude-3-sonnet@20240229' },
          { provider: 'Anthropic', model: 'claude-3 Opus', status: 'claude-3-opus@20240229 ' },
          { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: 'claude-3-5-sonnet@20240620 ' },
          { provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ]
  }
};

export const autocompleteTableDataConf: TableData = {
  cody: {
      'Sourcegraph': [
          { provider: 'OpenAI', model: 'gpt-3.5-instruct', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Fireworks', model: 'StarCoder', status: 'fireworks/starcoder' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: 'anthropic/claude-instant-1.2' },
          { provider: 'Anthropic', model: 'Claude-3 Haiku', status: 'anthropic/claude-3-haiku-20240307' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: 'google/gemini-1.5-flash ' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ]
  },
  byok: {
      'OpenAI': [
          { provider: 'OpenAI', model: 'gpt-3.5-instruct ', status: 'gpt-3.5-turbo-instruct ' },
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'Anthropic': [
          { provider: 'OpenAI', model: 'gpt-3.5-instruct', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: 'claude-instant-1.2' },
          { provider: 'Anthropic', model: 'Claude-3 Haiku', status: 'claude-3-haiku-20240307' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'Google': [
          { provider: 'OpenAI', model: 'gpt-3.5-instruct', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'Azure OpenAI': [
          { provider: 'OpenAI', model: 'gpt-3.5-instruct', status: '✅ ' },
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅ * (5.5.0 and above)' },
          { provider: 'OpenAI', model: 'gpt-4', status: '🟨 * (5.5.0 and above)' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '🟨 * (5.5.0 and above) ' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '🟨 * (5.5.0 and above) ' },
          { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'AWS Bedrock': [
          { provider: 'OpenAI', model: 'gpt-3.5-instruct', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: 'anthropic.claude-instant-v1' },
          { provider: 'Anthropic', model: 'Claude-3 Haiku', status: 'anthropic.claude-3-haiku-20240307-v1:0' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ],
      'GCP Vertex': [
          { provider: 'OpenAI', model: 'gpt-3.5-instruct', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
          { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
          { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
          { provider: 'Anthropic', model: 'Claude-3 Haiku', status: 'claude-3-haiku@20240307' },
          { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
          { provider: 'Ollama*', model: 'variety', status: '❌' }
      ]
  }
};
