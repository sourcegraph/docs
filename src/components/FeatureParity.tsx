'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import {
	autocompleteTableDataConf,
	chatTableDataConf
} from '@/utils/constants/supportedModelsConfiguration';
import {
	autocompleteTableDataEnt,
	chatTableDataEnt,
	options
} from '@/utils/constants/supportedModelsEnt';
import {useEffect, useState} from 'react';

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
	[key: string]: ProviderData[];
}

interface FeatureParityProps {
	type: string;
}

const FeatureParity = ({type}: FeatureParityProps) => {
	const [selected, setSelected] = useState({
		tableType: '',
		deployment: ''
	});
	const [filteredDeployments, setFilteredDeployments] = useState<Option[]>(
		options.deployment
	);
	const [showTable, setShowTable] = useState(false);
	const [chatTableData, setChatTableData] =
		useState<TableData>(chatTableDataEnt);
	const [autocompleteTableData, setAutocompleteTableData] =
		useState<TableData>(autocompleteTableDataEnt);

	const handleChange = (key: keyof typeof selected, value: string) => {
		setSelected(prev => ({...prev, [key]: value}));
		setShowTable(true);
	};

	useEffect(() => {
		if (type.toLowerCase() === 'ent') {
			setChatTableData(chatTableDataEnt);
			setAutocompleteTableData(autocompleteTableDataEnt);
		} else if (type.toLowerCase() === 'configuration') {
			setChatTableData(chatTableDataConf);
			setAutocompleteTableData(autocompleteTableDataConf);
		}

		setFilteredDeployments(options.deployment);
	}, [type]);

	const renderTable = (data: ProviderData[]) => {
		if (data.length === 0) return null;

		return (
			<div className="overflow-x-auto dark:shadow-black">
				<table className="min-w-full divide-y divide-gray-200 border border-gray-200 bg-white dark:divide-[#14171F] dark:border-black dark:bg-black">
					<thead className="bg-gray-50 dark:bg-black">
						<tr>
							<th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-black dark:text-gray-200">
								Provider
							</th>
							<th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-black dark:text-gray-200">
								Model
							</th>
							<th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-black dark:text-gray-200">
								Status
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white dark:divide-[#14171F] dark:bg-[#14171F]">
						{data.map((row, index) => (
							<tr
								key={index}
								className="hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-gray-900 dark:border-black dark:text-gray-300">
									{row.provider}
								</td>
								<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-gray-900 dark:border-black dark:text-gray-300">
									{row.model}
								</td>
								<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-gray-900 dark:border-black dark:text-gray-300">
									{row.status}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	};

	const getTableData = (): any => {
		const tableData: TableData =
			selected.tableType === 'chat'
				? chatTableData
				: autocompleteTableData;
		if (selected.deployment) {
			return tableData[selected.deployment] || [];
		}
		return [];
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
				<Select
					onValueChange={(value: string) =>
						handleChange('tableType', value)
					}
					value={selected.tableType}
				>
					<SelectTrigger className="w-full border border-gray-300 bg-white text-gray-900 shadow-sm sm:w-56 dark:border-gray-700 dark:bg-black dark:text-gray-300 dark:shadow-black">
						<SelectValue placeholder="Feature" />
					</SelectTrigger>
					<SelectContent className="bg-white text-gray-900 shadow-sm dark:bg-black dark:text-gray-300 dark:shadow-black">
						{options.tableType.map(option => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					onValueChange={(value: string) =>
						handleChange('deployment', value)
					}
					value={selected.deployment}
					disabled={!selected.tableType}
				>
					<SelectTrigger className="w-full border border-gray-300 bg-white text-gray-900 shadow-sm sm:w-56 dark:border-gray-700 dark:bg-black dark:text-gray-300 dark:shadow-black">
						<SelectValue placeholder="Provider" />
					</SelectTrigger>
					<SelectContent className="bg-white text-gray-900 shadow-sm dark:bg-black dark:text-gray-300 dark:shadow-black">
						{filteredDeployments.map(option => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{showTable && (
				<div className="mt-6">{renderTable(getTableData())}</div>
			)}
		</div>
	);
};

export default FeatureParity;
