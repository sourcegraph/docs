'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { autocompleteTableDataConf, chatTableDataConf } from '@/utils/constants/supportedModelsConfiguration';
import { autocompleteTableDataEnt, chatTableDataEnt, options } from '@/utils/constants/supportedModelsEnt';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    cody: {
        [key: string]: ProviderData[];
    };
    byok: {
        [key: string]: ProviderData[];
    };
}

interface FeatureParityProps {
    type: string
}

const FeatureParity = ({type}: FeatureParityProps) => {
    const [selected, setSelected] = useState({
        tableType: '',
        initial: '',
        version: '',
        deployment: ''
    });
    const [filteredDeployments, setFilteredDeployments] = useState<Option[]>(options.deployment);
    const [showTable, setShowTable] = useState(false);
    const [chatTableData, setChatTableData] = useState<TableData>(chatTableDataEnt)
    const [autocompleteTableData, setAutocompleteTableData] = useState<TableData>(autocompleteTableDataEnt)

    const params = useParams();

    const handleChange = (key: keyof typeof selected, value: string) => {
        setSelected(prev => ({ ...prev, [key]: value }));

        if (key === 'initial') {
            setSelected(prev => ({ ...prev, deployment: '', version: '' }));
        } else if (key === 'deployment') {
            setSelected(prev => ({ ...prev, version: '' }));
        }

        setShowTable(true);
    };

    useEffect(() => {
        console.log('typetype', type)
        if (type.toLowerCase() == 'ent') {
            setChatTableData(chatTableDataEnt)
            setAutocompleteTableData(autocompleteTableDataEnt)
        } else if (type.toLowerCase() == 'configuration') {
            setChatTableData(chatTableDataConf)
            setAutocompleteTableData(autocompleteTableDataConf)
        }

        if (selected.initial === 'cody')
            setFilteredDeployments([{ label: 'Sourcegraph', value: 'Sourcegraph' }]);
        else if (selected.initial === 'byok')
            setFilteredDeployments(options.deployment.filter(deployment => deployment.value !== 'Sourcegraph'));
        else
            setFilteredDeployments(options.deployment);
    }, [selected]);

    const renderTable = (data: ProviderData[]) => {
        if (data.length === 0) return null;

        return (
            <div className="overflow-x-auto dark:shadow-black">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-[#14171F] bg-white dark:bg-black border border-gray-200 dark:border-black">
                    <thead className="bg-gray-50 dark:bg-black">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-black">Provider</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-black">Model</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-black">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#14171F] divide-y divide-gray-200 dark:divide-[#14171F]">
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-300 border-b border-gray-200 dark:border-black">{row.provider}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-300 border-b border-gray-200 dark:border-black">{row.model}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-300 border-b border-gray-200 dark:border-black">{row.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const getTableData = (): ProviderData[] => {
        const tableData: TableData = selected.tableType === 'chat' ? chatTableData : autocompleteTableData;

        if (selected.initial && selected.deployment) {
            let data: ProviderData[] = (tableData[selected.initial as 'cody' | 'byok'][selected.deployment] || []) as ProviderData[];

            if (selected.version && selected.version !== 'all') {
                const versionMap: { [key: string]: string } = {
                    '5.4.5099 and above': '5.4.5099 and above',
                    '5.3.9104 and above': '5.3.9104 and above',
                    '5.5.0 and above': '5.5.0 and above',
                    'Note 2': 'Note 2',
                    'Note 1': 'Note 1'
                };
                const version: string = versionMap[selected.version];

                if (version) {
                    data = data.filter(row => row.status.includes(version));
                }
            }

            return data;
        }
        return [];
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Select
                    onValueChange={(value: string) => handleChange('tableType', value)}
                    value={selected.tableType}
                >
                    <SelectTrigger className="w-full sm:w-56 bg-white dark:bg-black text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-700 shadow-sm dark:shadow-black">
                        <SelectValue placeholder="Feature Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-black text-gray-900 dark:text-gray-300 shadow-sm dark:shadow-black">
                        {options.tableType.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value: string) => handleChange('initial', value)}
                    value={selected.initial}
                    disabled={!selected.tableType}
                >
                    <SelectTrigger className="w-full sm:w-56 bg-white dark:bg-black text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-700 shadow-sm dark:shadow-black">
                        <SelectValue placeholder="Initial" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-black text-gray-900 dark:text-gray-300 shadow-sm dark:shadow-black">
                        {options.initial.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value: string) => handleChange('deployment', value)}
                    value={selected.deployment}
                    disabled={!selected.initial}
                >
                    <SelectTrigger className="w-full sm:w-56 bg-white dark:bg-black text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-700 shadow-sm dark:shadow-black">
                        <SelectValue placeholder="Deployment" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-black text-gray-900 dark:text-gray-300 shadow-sm dark:shadow-black">
                        {filteredDeployments.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(value: string) => handleChange('version', value)}
                    value={selected.version}
                    disabled={!selected.deployment}
                >
                    <SelectTrigger className="w-full sm:w-56 bg-white dark:bg-black text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-700 shadow-sm dark:shadow-black">
                        <SelectValue placeholder="Version" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-black text-gray-900 dark:text-gray-300 shadow-sm dark:shadow-black">
                        {options.version.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {showTable && (
                <div className="mt-6">
                    {renderTable(getTableData())}
                </div>
            )}
        </div>
    );
};

export default FeatureParity;
