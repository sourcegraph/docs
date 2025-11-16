import React, {useState} from 'react';

interface ResourceEstimatorState {
	deploymentType: string;
	users: number;
	repositories: number;
	totalRepoSize: number;
	largestRepoSize: number;
	largestIndexSize: number;
	codeInsights: boolean;
}

const ResourceEstimator = () => {
	const [state, setState] = useState<ResourceEstimatorState>({
		deploymentType: 'kubernetes', // default value
		users: 300,
		repositories: 3000,
		totalRepoSize: 100,
		largestRepoSize: 5,
		largestIndexSize: 1,
		codeInsights: true
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value, type, checked} = e.target;
		setState(prevState => ({
			...prevState,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Calculate resources based on state
		// For now, just console logging the state
		console.log(state);
	};

	return (
		<form className="estimator" onSubmit={handleSubmit}>
			{/* Radio buttons for Deployment Type */}
			<div className="mb-4 flex items-center">
				<label className="mr-4 inline-flex items-center">
					<input
						type="radio"
						className="form-radio"
						name="deploymentType"
						value="docker-compose"
						checked={state.deploymentType === 'docker-compose'}
						onChange={handleInputChange}
					/>
					<span className="ml-2">docker-compose</span>
				</label>
				<label className="inline-flex items-center">
					<input
						type="radio"
						className="form-radio"
						name="deploymentType"
						value="kubernetes"
						checked={state.deploymentType === 'kubernetes'}
						onChange={handleInputChange}
					/>
					<span className="ml-2">kubernetes</span>
				</label>
			</div>

			{/* Input for number of users */}
			<div className="mb-4">
				<label className="block">
					Users:
					<input
						type="number"
						className="form-input mt-1 block w-full"
						name="users"
						value={state.users}
						onChange={handleInputChange}
					/>
				</label>
			</div>

			{/* ...rest of the inputs similar to above */}

			{/* Checkbox for Code Insights */}
			<label className="mb-4 block">
				<input
					type="checkbox"
					className="form-checkbox"
					name="codeInsights"
					checked={state.codeInsights}
					onChange={handleInputChange}
				/>
				<span className="ml-2">Enable Code Insights</span>
			</label>

			{/* Submit button */}
			<button
				type="submit"
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				Calculate
			</button>
		</form>
	);
};

export default ResourceEstimator;
