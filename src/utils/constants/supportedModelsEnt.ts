export const options = {
	tableType: [
		{label: 'Chat', value: 'chat'},
		{label: 'Autocomplete', value: 'autocomplete'}
	],
	deployment: [
		{label: 'Sourcegraph', value: 'Sourcegraph'},
		{label: 'OpenAI', value: 'OpenAI'},
		{label: 'Anthropic', value: 'Anthropic'},
		{label: 'Google', value: 'Google'},
		{label: 'Azure OpenAI', value: 'Azure OpenAI'},
		{label: 'Amazon Bedrock', value: 'Amazon Bedrock'},
		{label: 'GCP Vertex', value: 'GCP Vertex'}
	]
};

export const chatTableDataEnt: any = {
	Sourcegraph: [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅'},
		{
			provider: 'OpenAI',
			model: 'gpt-4o',
			status: '✅ *(5.4.5099 and above)'
		},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅'},
		{provider: 'Anthropic', model: 'claude-2.0', status: '✅'},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: '✅'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3 Sonnet',
			status: '✅ *(5.3.9104 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet',
			status: '✅ *(5.5.0 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: '✅ *(5.9 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.7 Sonnet',
			status: '✅ *(6.1.1295 and above)'
		},
		{
			provider: 'Google',
			model: 'Gemini 1.5 Pro',
			status: '✅ *(5.4.5099 and above)'
		}
	],
	OpenAI: [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅'},
		{
			provider: 'OpenAI',
			model: 'gpt-4o',
			status: '✅ *(5.4.5099 and above)'
		},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'},
		{provider: 'Anthropic', model: 'claude-2.0', status: '❌'},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: '❌'
		},
		{provider: 'Anthropic', model: 'claude-3 Sonnet', status: '❌'},
		{provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '❌'},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: '❌'
		},
		{provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌'}
	],
	Anthropic: [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅'},
		{provider: 'Anthropic', model: 'claude-2.0', status: '✅'},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: '✅'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3 Sonnet',
			status: '✅ *(5.3.9104 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet',
			status: '✅ *(5.5.0 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: '✅ *(5.5.0 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.7 Sonnet',
			status: '✅ *(6.1.1295 and above)'
		},
		{provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌'}
	],
	Google: [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'},
		{provider: 'Anthropic', model: 'claude-2.0', status: '❌'},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: '❌'
		},
		{provider: 'Anthropic', model: 'claude-3 Sonnet', status: '❌'},
		{provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '❌'},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: '❌'
		},
		{
			provider: 'Google',
			model: 'Gemini 1.5 Pro',
			status: '✅ *(5.4.5099 and above)'
		}
	],
	'Azure OpenAI': [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅ (Note #1)'},
		{provider: 'OpenAI', model: 'gpt-4', status: '✅ (Note #1)'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅ (Note #1)'},
		{
			provider: 'OpenAI',
			model: 'gpt-4o',
			status: '✅ *(5.4.5099 and above)'
		},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'},
		{provider: 'Anthropic', model: 'claude-2.0', status: '❌'},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: '❌'
		},
		{provider: 'Anthropic', model: 'claude-3 Sonnet', status: '❌'},
		{provider: 'Anthropic', model: 'claude-3.5 Sonnet', status: '❌'},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: '❌'
		},
		{provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌'}
	],
	'Amazon Bedrock': [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅'},
		{provider: 'Anthropic', model: 'claude-2.0', status: '✅'},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: '✅'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3 Sonnet',
			status: '✅ *(5.3.9104 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet',
			status: '✅ *(5.5.0 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: '✅ *(5.5.0 and above)'
		},
		{provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌'}
	],
	'GCP Vertex': [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{
			provider: 'OpenAI',
			model: 'gpt-4o',
			status: '❌ * (5.4.5099 and above)'
		},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'},
		{provider: 'Anthropic', model: 'claude-2.0', status: '❌'},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: '❌'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3 Sonnet',
			status: '✅ *(5.3.9104 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet',
			status: '✅ *(5.5.0 and above)'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: '✅ *(5.5.0 and above)'
		},
		{provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌'}
	]
};

export const autocompleteTableDataEnt: any = {
	Sourcegraph: [
		{provider: 'OpenAI', model: 'gpt-3.5-instruct (Note #4)', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Fireworks', model: 'StarCoder', status: '✅'},
		{provider: 'Fireworks', model: 'DeepSeek Coder V2', status: '✅'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅'}
	],
	OpenAI: [
		{
			provider: 'OpenAI',
			model: 'gpt-3.5-instruct (Note #4)',
			status: '✅ (Note #1)'
		},
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Fireworks', model: 'StarCoder', status: '❌'},
		{provider: 'Fireworks', model: 'DeepSeek Coder V2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'}
	],
	Anthropic: [
		{provider: 'OpenAI', model: 'gpt-3.5-instruct (Note #4)', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Fireworks', model: 'StarCoder', status: '❌'},
		{provider: 'Fireworks', model: 'DeepSeek Coder V2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅'}
	],
	Google: [
		{provider: 'OpenAI', model: 'gpt-3.5-instruct (Note #4)', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Fireworks', model: 'StarCoder', status: '❌'},
		{provider: 'Fireworks', model: 'DeepSeek Coder V2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'}
	],
	'Azure OpenAI': [
		{
			provider: 'OpenAI',
			model: 'gpt-3.5-instruct (Note #4)',
			status: '✅ (Note #1)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-3.5 turbo',
			status: '✅ *(5.5.0 and above)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-4',
			status: '🟨 *(5.5.0 and above) (Note #6)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-4 turbo',
			status: '🟨 *(5.5.0 and above) (Note #6)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-4o',
			status: '🟨 *(5.5.0 and above) (Note #6)'
		},
		{provider: 'Fireworks', model: 'StarCoder', status: '❌'},
		{provider: 'Fireworks', model: 'DeepSeek Coder V2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'}
	],
	'Amazon Bedrock': [
		{provider: 'OpenAI', model: 'gpt-3.5-instruct (Note #4)', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Fireworks', model: 'StarCoder', status: '❌'},
		{provider: 'Fireworks', model: 'DeepSeek Coder V2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅'}
	],
	'GCP Vertex': [
		{provider: 'OpenAI', model: 'gpt-3.5-instruct (Note #4)', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Fireworks', model: 'StarCoder', status: '❌'},
		{provider: 'Fireworks', model: 'DeepSeek Coder V2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'}
	]
};
