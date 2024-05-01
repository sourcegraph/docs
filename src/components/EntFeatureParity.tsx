'use client';

// useClient.tsx

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

type Option = {
    label: string;
    value: string;
};

type ProviderData = {
    provider: string;
    model: string;
    status: string;
};

interface TableData {
    [key: string]: {
        [version: string]: {
            [environment: string]: ProviderData[];
        };
    };
}

const options = {
    tableType: [
        { label: 'Chat', value: 'chat' },
        { label: 'Autocomplete', value: 'autocomplete' }
    ],
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

const chatTableData: TableData = {
    cody: {
        '5.3.9104': {
            cloud: [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-2.0', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-2.1', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Sonnet', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Opus', status: '✅' },
                { provider: 'Fireworks', model: 'Mixtral 8x7b', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ],
            'on-prem': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-2.0', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-2.1', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Sonnet', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Opus', status: '✅' },
                { provider: 'Fireworks', model: 'Mixtral 8x7b', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ]
        },
        '5.3.0': {
            cloud: [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-2.0', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-2.1', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Sonnet', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Opus', status: '❌' },
                { provider: 'Fireworks', model: 'Mixtral 8x7b', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ],
            'on-prem': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-2.0', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-2.1', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Sonnet', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Opus', status: '❌' },
                { provider: 'Fireworks', model: 'Mixtral 8x7b', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
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
                { provider: 'Anthropic', model: 'Claude-2.0', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-2.1', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Sonnet', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Opus', status: '❌' },
                { provider: 'Fireworks', model: 'Mixtral 8x7b', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ],
            '5.3.0': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-2.0', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-2.1', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Sonnet', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Opus', status: '❌' },
                { provider: 'Fireworks', model: 'Mixtral 8x7b', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ],
            aws: {
                '5.3.9104': [
                    { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                    { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                    { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                    { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                    { provider: 'Anthropic', model: 'Claude-2.0', status: '✅' },
                    { provider: 'Anthropic', model: 'Claude-2.1', status: '✅' },
                    { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅' },
                    { provider: 'Anthropic', model: 'Claude-3 Sonnet', status: '✅' },
                    { provider: 'Anthropic', model: 'Claude-3 Opus', status: '❌' },
                    { provider: 'Fireworks', model: 'Mixtral 8x7b', status: '❌' },
                    { provider: 'Ollama', model: 'variety', status: '❌' }
                ],
                '5.3.0': [
                    { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                    { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                    { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                    { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                    { provider: 'Anthropic', model: 'Claude-2.0', status: '✅' },
                    { provider: 'Anthropic', model: 'Claude-2.1', status: '✅' },
                    { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                    { provider: 'Anthropic', model: 'Claude-3 Sonnet', status: '❌' },
                    { provider: 'Anthropic', model: 'Claude-3 Opus', status: '❌' },
                    { provider: 'Fireworks', model: 'Mixtral 8x7b', status: '❌' },
                    { provider: 'Ollama', model: 'variety', status: '❌' }
                ]
            }
        }
    }
};

const autocompleteTableData: TableData = {
    cody: {
        '5.3.9104': {
            cloud: [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅' },
                { provider: 'Fireworks', model: 'StarCoder', status: '✅' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ],
            'on-prem': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '✅' },
                { provider: 'Fireworks', model: 'StarCoder', status: '✅' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
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
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ],
            'on-prem': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Fireworks', model: 'StarCoder', status: '✅' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
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
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ],
            '5.3.0': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4', status: '✅' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
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
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ],
            '5.3.0': [
                { provider: 'OpenAI', model: 'gpt-3.5 turbo', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4', status: '❌' },
                { provider: 'OpenAI', model: 'gpt-4 turbo', status: '❌' },
                { provider: 'Anthropic', model: 'Claude-Instant-1.2', status: '✅' },
                { provider: 'Anthropic', model: 'Claude-3 Haiku', status: '❌' },
                { provider: 'Fireworks', model: 'StarCoder', status: '❌' },
                { provider: 'Ollama', model: 'variety', status: '❌' }
            ]
        }
    }
};

const EntFeatureParity = () => {
    const [selected, setSelected] = useState({
        tableType: '',
        initialOption: '',
        environment: '',
        version: '',
        llmProvider: ''
    });
    const [showTable, setShowTable] = useState(false);

    const handleChange = (key: keyof typeof selected, value: string) => {
        setSelected(prev => ({ ...prev, [key]: value }));
        setShowTable(key === 'version');
    };

    const renderTable = (data: ProviderData[]) => (
        <table>
            <thead>
                <tr>
                    <th>Provider</th>
                    <th>Model</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.provider}</td>
                        <td>{row.model}</td>
                        <td>{row.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // const getTableData = () => {
    //     const tableData = selected.tableType === 'chat' ? chatTableData : autocompleteTableData;
    //     return selected.initialOption === 'cody'
    // ? tableData.cody[selected.version][selected.environment]
    //         : tableData.byok[selected.llmProvider][selected.version];
    // };

    const getTableData = () => {
        const tableData = selected.tableType === 'chat' ? chatTableData : autocompleteTableData;
        if (selected.initialOption && selected.version && ((selected.environment && selected.initialOption === 'cody') || (selected.llmProvider && selected.initialOption === 'byok'))) {
            const envOrProvider = selected.initialOption === 'cody' ? selected.environment : selected.llmProvider;
            const versionData = tableData[selected.initialOption][selected.version];
            if (versionData && envOrProvider) {
                return versionData[envOrProvider] || [];
            }
        }
        return [];
    };

    return (
        <div>
            <h5>Select Cody Feature</h5>
            <br />
            <Select
                onValueChange={value => handleChange('tableType', value)}
                value={selected.tableType}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Feature Type" />
                </SelectTrigger>
                <SelectContent>
                    {options.tableType.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <br />

            {selected.tableType && (
                <>
                    <h5>Select Deployment Method</h5>
                    <br />

                    <Select
                        onValueChange={value => handleChange('initialOption', value)}
                        value={selected.initialOption}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Deployment Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.initial.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    {selected.initialOption && (
                        <>
                            <h5>Select Deployment Environment</h5>
                            <br />

                            <Select
                                onValueChange={value => handleChange('environment', value)}
                                value={selected.environment}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Environment Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.environment.map(option => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <br />

                            <h5>Select Your Sourcegraph Version</h5>
                            <br />

                            <Select
                                onValueChange={value => handleChange('version', value)}
                                value={selected.version}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Version Number" />
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

                    {showTable && renderTable(getTableData())}
                </>
            )}
        </div>
    );
};

export default EntFeatureParity;
