'use client';

import React, { useState } from 'react';

type EstimatorState = {
    users: number;
    repositories: number;
    repoSize: number;
    largestRepo: number;
    largestIndex: number;
    deploymentType: 'docker-compose' | 'kubernetes';
    codeInsights: boolean;
};

const ResourceEstimator: React.FC = () => {
    const [state, setState] = useState<EstimatorState>({
        users: 300,
        repositories: 3000,
        repoSize: 100,
        largestRepo: 5,
        largestIndex: 1,
        deploymentType: 'kubernetes',
        codeInsights: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : parseInt(value),
        }));
    };

    // Placeholder for calculating resources. You'd replace this with actual logic.
    const calculateResources = () => {
        console.log('Calculating resources with state: ', state);
        // Here you would integrate the WebAssembly module and perform calculations.
    };

    // React to state changes
    React.useEffect(() => {
        calculateResources();
    }, [state]);

    return (
        <div className="resource-estimator">
            <h1>Sourcegraph resource estimator</h1>
            <div>
                <label>
                    Deployment Type:
                    <input
                        type="radio"
                        name="deploymentType"
                        value="docker-compose"
                        checked={state.deploymentType === 'docker-compose'}
                        onChange={handleChange}
                    /> docker-compose
                    <input
                        type="radio"
                        name="deploymentType"
                        value="kubernetes"
                        checked={state.deploymentType === 'kubernetes'}
                        onChange={handleChange}
                    /> kubernetes
                </label>
            </div>
            <div>
                <label>
                    Users:
                    <input
                        type="number"
                        name="users"
                        value={state.users}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Repositories:
                    <input
                        type="number"
                        name="repositories"
                        value={state.repositories}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    GB - the size of all repositories:
                    <input
                        type="number"
                        name="repoSize"
                        value={state.repoSize}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    GB - the size of the largest repository:
                    <input
                        type="number"
                        name="largestRepo"
                        value={state.largestRepo}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    GB - size of the largest LSIF index file:
                    <input
                        type="number"
                        name="largestIndex"
                        value={state.largestIndex}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Code Insights:
                    <input
                        type="checkbox"
                        name="codeInsights"
                        checked={state.codeInsights}
                        onChange={handleChange}
                    /> Enable
                </label>
            </div>
        </div>
    );
};

export default ResourceEstimator;
