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

export const options = {
    tableType: [
        { label: 'Chat', value: 'chat' },
        { label: 'Autocomplete', value: 'autocomplete' }
    ],
    initial: [
        { label: 'Cody Gateway', value: 'cody' },
        { label: 'BYOK', value: 'byok' }
    ],
    deployment: [
        { label: 'Sourcegraph', value: 'Sourcegraph' },
        { label: 'OpenAI', value: 'OpenAI' },
        { label: 'Anthropic', value: 'Anthropic' },
        { label: 'Google', value: 'Google' },
        { label: 'Azure OpenAI', value: 'Azure OpenAI' },
        { label: 'AWS Bedrock', value: 'AWS Bedrock' },
        { label: 'GCP Vertex', value: 'GCP Vertex' }
    ],
    version: [
        { label: 'All Versions', value: 'all' },
        { label: '5.4.5099 and above', value: '5.4.5099 and above' },
        { label: '5.3.9104 and above', value: '5.3.9104 and above' },
        { label: '5.5.0 and above', value: '5.5.0 and above' },
        { label: 'Note 2', value: 'Note 2' },
        { label: 'Note 1', value: 'Note 1' }
    ]
};

export const chatTableDataEnt: TableData = {
    cody: {
        'Sourcegraph': [
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
            { provider: 'OpenAI', model: 'gpt-4 (both 8k and 32k)', status: '✅' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '✅ * (5.4.5099 and above)' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
            { provider: 'Anthropic', model: 'claude-2.0', status: '✅' },
            { provider: 'Anthropic', model: 'claude-2.1 (See Note 2)', status: '✅' },
            { provider: 'Anthropic', model: 'claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3 Sonnet', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3 Opus', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '✅ * (5.5.0 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Pro', status: '✅ * (5.4.5099 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '✅ * (5.4.5099 and above)' },
            { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ]
    },
    byok: {
        'OpenAI': [
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
            { provider: 'OpenAI', model: 'gpt-4 (both 8k and 32k)', status: '✅' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '✅ * (5.4.5099 and above)' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
            { provider: 'Anthropic', model: 'claude-2.0', status: '❌' },
            { provider: 'Anthropic', model: 'claude-2.1 (See Note 2)', status: '❌' },
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
            { provider: 'OpenAI', model: 'gpt-4 (both 8k and 32k)', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
            { provider: 'Anthropic', model: 'claude-2.0', status: '✅' },
            { provider: 'Anthropic', model: 'claude-2.1 (See Note 2)', status: '✅' },
            { provider: 'Anthropic', model: 'claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3 Sonnet', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3 Opus', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '✅ * (5.5.0 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
            { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ],
        'Google': [
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 (both 8k and 32k)', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
            { provider: 'Anthropic', model: 'claude-2.0', status: '❌' },
            { provider: 'Anthropic', model: 'claude-2.1 (See Note 2)', status: '❌' },
            { provider: 'Anthropic', model: 'claude-3 Haiku', status: '❌' },
            { provider: 'Anthropic', model: 'claude-3 Sonnet', status: '❌' },
            { provider: 'Anthropic', model: 'claude-3 Opus', status: '❌' },
            { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '❌' },
            { provider: 'Google', model: 'Gemini 1.5 Pro', status: '✅ * (5.4.5099 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '✅ * (5.4.5099 and above)' },
            { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ],
        'Azure OpenAI': [
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅ (Note 1)' },
            { provider: 'OpenAI', model: 'gpt-4 (both 8k and 32k)', status: '✅ (Note 1)' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅ (Note 1)' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '✅ * (5.4.5099 and above)' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
            { provider: 'Anthropic', model: 'claude-2.0', status: '❌' },
            { provider: 'Anthropic', model: 'claude-2.1 (See Note 2)', status: '❌' },
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
            { provider: 'OpenAI', model: 'gpt-4 (both 8k and 32k)', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '❌ * (5.4.5099 and above)' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
            { provider: 'Anthropic', model: 'claude-2.0', status: '✅' },
            { provider: 'Anthropic', model: 'claude-2.1 (See Note 2)', status: '✅' },
            { provider: 'Anthropic', model: 'claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3 Sonnet', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3 Opus', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '✅ * (5.5.0 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
            { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ],
        'GCP Vertex': [
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 (both 8k and 32k)', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '❌ * (5.4.5099 and above)' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
            { provider: 'Anthropic', model: 'claude-2.0', status: '❌' },
            { provider: 'Anthropic', model: 'claude-2.1 (See Note 2)', status: '❌' },
            { provider: 'Anthropic', model: 'claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3 Sonnet', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3 Opus', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '✅ * (5.5.0 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
            { provider: 'Fireworks', model: 'mixtral 8x7b', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ]
    }
};

export const autocompleteTableDataEnt: TableData = {
    cody: {
        'Sourcegraph': [
            { provider: 'OpenAI', model: 'gpt-3.5-instruct (Note 4)', status: '✅' },
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
            { provider: 'Fireworks', model: 'StarCoder', status: '✅' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
            { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '✅ * (5.4.5099 and above)' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ]
    },
    byok: {
        'OpenAI': [
            { provider: 'OpenAI', model: 'gpt-3.5-instruct (Note 4)', status: '✅ (Note 1)' },
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
            { provider: 'OpenAI', model: 'gpt-3.5-instruct (Note 4)', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
            { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
            { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ],
        'Google': [
            { provider: 'OpenAI', model: 'gpt-3.5-instruct (Note 4)', status: '❌' },
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
            { provider: 'OpenAI', model: 'gpt-3.5-instruct (Note 4)', status: '✅ (Note 1)' },
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅ * (5.5.0 and above)' },
            { provider: 'OpenAI', model: 'gpt-4', status: '🟨 * (5.5.0 and above) (Note 6)' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '🟨 * (5.5.0 and above) (Note 6)' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '🟨 * (5.5.0 and above) (Note 6)' },
            { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
            { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ],
        'AWS Bedrock': [
            { provider: 'OpenAI', model: 'gpt-3.5-instruct (Note 4)', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
            { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
            { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅ * (5.3.9104 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ],
        'GCP Vertex': [
            { provider: 'OpenAI', model: 'gpt-3.5-instruct (Note 4)', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
            { provider: 'OpenAI', model: 'gpt-4o', status: '❌' },
            { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
            { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
            { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅ * (5.5.0 and above)' },
            { provider: 'Google', model: 'Gemini 1.5 Flash', status: '❌' },
            { provider: 'Ollama*', model: 'variety', status: '❌' }
        ]
    }
};
