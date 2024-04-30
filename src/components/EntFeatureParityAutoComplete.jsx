'use client';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

const options = {
    initial: [
        { label: 'Cody Gateway', value: 'cody' },
        { label: 'BYOK', value: 'byok' }
    ],
    environment: [
        { label: 'Cloud', value: 'cloud' },
        { label: 'On-Prem', value: 'on-prem' }
    ],
    version: [
        { label: 'Version >= 5.3.9104', value: '5.3.9104' },
        { label: 'Version >= 5.3.0', value: '5.3.0' }
    ],
    llmProvider: [
        { label: 'Azure OpenAI', value: 'azure' },
        { label: 'AWS Bedrock', value: 'aws' }
    ]
};

const tableData = {
    cody: {
        '5.3.9104': {
            cloud: [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅' },
                { provider: 'Fireworks', model: 'StarCoder', status: '✅' },
                { provider: 'Ollama', model: 'variety', status: '❌' },

            ],
            'on-prem': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅' },
                { provider: 'Fireworks', model: 'StarCoder', status: '✅' },
                { provider: 'Ollama', model: 'variety', status: '❌' },
            ]
        },
        '5.3.0': {
            cloud: [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Fireworks', model: 'StarCoder', status: '✅' },
                { provider: 'Ollama', model: 'variety', status: '❌' },
            ],
            'on-prem': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Fireworks', model: 'StarCoder', status: '✅' },
                { provider: 'Ollama', model: 'variety', status: '❌' },
            ]
        }
    },

    byok: {
        azure: {
            '5.3.9104': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' },
            ],
            '5.3.0': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' },
            ]
        },
        aws: {
            '5.3.9104': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅' },
                { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' },
            ],
            '5.3.0': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' },
            ]
        }
    }
};

const EntFeatureParityAutoComplete = () => {
    const [selected, setSelected] = useState({
        initialOption: '',
        environment: '',
        version: '',
        llmProvider: ''
    });
    const [showTable, setShowTable] = useState(false);

    const handleChange = (key, value) => {
        setSelected(prev => ({ ...prev, [key]: value }));
        setShowTable(key === 'version');
    };

    return (
        <div>
            <h5>Select Sourcegraph Deployment Method</h5>
            <br />
            <Select
                onValueChange={value => handleChange('initialOption', value)}
                value={selected.initialOption}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Deployment Method" />
                </SelectTrigger>
                <SelectContent>
                    {options.initial.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <br />


            {selected.initialOption === 'cody' && (
                <>
                    <h5>Select Deployment Environment</h5>
                    <br />
                    <Select
                        onValueChange={value => handleChange('environment', value)}
                        value={selected.environment}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Environment" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.environment.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                </>
            )}

            {selected.initialOption === 'byok' && (
                <>
                    <h5>Select Your Third-Party LLM Provider</h5>
                    <br />
                    <Select
                        onValueChange={value => handleChange('llmProvider', value)}
                        value={selected.llmProvider}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="LLM Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.llmProvider.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                </>
            )}

            {selected.initialOption && ((selected.environment && selected.initialOption === 'cody') || (selected.llmProvider && selected.initialOption === 'byok')) && (
                <>
                    <h5>Select Your Sourcegraph Version </h5>
                    <br />
                    <Select
                        onValueChange={value => handleChange('version', value)}
                        value={selected.version}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Deployment Version" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.version.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                </>
            )}

            {showTable && (
                <table>
                    <thead>
                        <tr>
                            <th>Provider</th>
                            <th>Model</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(selected.initialOption === 'cody' ? tableData.cody[selected.version][selected.environment] : tableData.byok[selected.llmProvider][selected.version]).map((row, index) => (
                            <tr key={index}>
                                <td>{row.provider}</td>
                                <td>{row.model}</td>
                                <td>{row.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EntFeatureParityAutoComplete;
