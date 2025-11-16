export const chatTableDataConf: any = {
	Sourcegraph: [
		{
			provider: 'OpenAI',
			model: 'gpt-3.5 turbo',
			status: 'openai/gpt-3.5-turbo'
		},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{
			provider: 'OpenAI',
			model: 'gpt-4 turbo',
			status: 'openai/gpt-4-turbo'
		},
		{provider: 'OpenAI', model: 'gpt-4o', status: 'openai/gpt-4o'},
		{
			provider: 'Anthropic',
			model: 'Claude-Instant-1.2',
			status: 'anthropic/claude-instant-1.2'
		},
		{
			provider: 'Anthropic',
			model: 'Claude-2.0',
			status: 'anthropic/claude-2.0'
		},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: 'anthropic/claude-2.1'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3 Sonnet',
			status: 'anthropic/claude-3-sonnet-20240229'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet',
			status: 'anthropic/claude-3-5-sonnet-20240620'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: 'anthropic/claude-3-5-sonnet-20241022'
		},
		{
			provider: 'Google',
			model: 'Gemini 1.5 Pro',
			status: 'google/gemini-1.5-pro-latest'
		}
	],
	OpenAI: [
		{
			provider: 'OpenAI',
			model: 'gpt-3.5 turbo',
			status: 'openai/gpt-3.5-turbo'
		},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{
			provider: 'OpenAI',
			model: 'gpt-4 turbo',
			status: 'openai/gpt-4-turbo'
		},
		{provider: 'OpenAI', model: 'gpt-4o', status: 'openai/gpt-4o'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-2.0', status: '❌'},
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
		{
			provider: 'Anthropic',
			model: 'Claude-Instant-1.2',
			status: 'anthropic/claude-instant-1.2'
		},
		{
			provider: 'Anthropic',
			model: 'Claude-2.0',
			status: 'anthropic/claude-2.0'
		},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: 'anthropic/claude-2.1'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3 Sonnet',
			status: 'anthropic/claude-3-sonnet-20240229'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet',
			status: 'anthropic/claude-3-5-sonnet-20240620'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: 'anthropic/claude-3-5-sonnet-20241022'
		},
		{provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌'}
	],
	Google: [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-2.0', status: '❌'},
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
			status: 'google/gemini-1.5-pro-latest'
		}
	],
	'Azure OpenAI': [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{
			provider: 'OpenAI',
			model: 'gpt-4',
			status: '<deployment name of the model> (See Note #1)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-4 turbo',
			status: '<deployment name of the model> (See Note #1)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-4o',
			status: '<deployment name of the model> (See Note #1) *(5.4.5099 and above)'
		},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-2.0', status: '❌'},
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
		{
			provider: 'Anthropic',
			model: 'Claude-Instant-1.2',
			status: 'anthropic.claude-instant-v1'
		},
		{
			provider: 'Anthropic',
			model: 'Claude-2.0',
			status: 'anthropic.claude-v2'
		},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: 'anthropic.claude-v2:1'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3 Sonnet',
			status: 'anthropic.claude-3-sonnet-20240229-v1:0'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet',
			status: 'anthropic.claude-3-5-sonnet-20240620-v1:0'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: 'anthropic.claude-3-5-sonnet-20241022-v2:0'
		},
		{provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌'}
	],
	'GCP Vertex': [
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌'},
		{provider: 'Anthropic', model: 'Claude-2.0', status: '❌'},
		{
			provider: 'Anthropic',
			model: 'claude-2.1 (See Note #2)',
			status: '❌'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3 Sonnet',
			status: 'claude-3-sonnet@20240229'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet',
			status: 'claude-3-5-sonnet@20240620'
		},
		{
			provider: 'Anthropic',
			model: 'claude-3.5 Sonnet (Latest)',
			status: 'claude-3-5-sonnet@20241022'
		},
		{provider: 'Google', model: 'Gemini 1.5 Pro', status: '❌'}
	]
};

export const autocompleteTableDataConf: any = {
	Sourcegraph: [
		{provider: 'OpenAI', model: 'gpt-3.5-instruct (Note #4)', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌'},
		{provider: 'OpenAI', model: 'gpt-4o', status: '❌'},
		{
			provider: 'Fireworks',
			model: 'StarCoder',
			status: 'fireworks/starcoder'
		},
		{
			provider: 'Fireworks',
			model: 'DeepSeek Coder V2',
			status: 'fireworks/deepseek-coder-v2-lite-base'
		},
		{
			provider: 'Anthropic',
			model: 'Claude-Instant-1.2',
			status: 'anthropic/claude-instant-1.2'
		}
	],
	OpenAI: [
		{
			provider: 'OpenAI',
			model: 'gpt-3.5-instruct (Note #4)',
			status: 'gpt-3.5-turbo-instruct'
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
		{
			provider: 'Anthropic',
			model: 'Claude-Instant-1.2',
			status: 'claude-instant-1.2'
		}
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
			status: '<deployment name of the model> (Note #1)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-3.5 turbo',
			status: '<deployment name of the model>'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-4',
			status: '<deployment name of the model> (Note #6)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-4 turbo',
			status: '<deployment name of the model> (Note #6)'
		},
		{
			provider: 'OpenAI',
			model: 'gpt-4o',
			status: '<deployment name of the model> (Note #6)'
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
		{
			provider: 'Anthropic',
			model: 'Claude-Instant-1.2',
			status: 'anthropic.claude-instant-v1'
		}
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
