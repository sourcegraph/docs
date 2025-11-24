'use client';

import {useEffect, useRef} from 'react';

declare const Go: any;
const version = 'f62b75b';
export const inDevEnvironment =
	!!process && process.env.NODE_ENV === 'development';

const fileLocal = `https://corsproxy.io/?${encodeURIComponent(
	`https://storage.googleapis.com/sourcegraph-resource-estimator/main_${version}.wasm`
)}`;

const fileProd = `https://storage.googleapis.com/sourcegraph-resource-estimator/main_${version}.wasm`;

const API_URL = inDevEnvironment ? fileLocal : fileProd;
export async function loadResourceEstimator() {
	const resp = await fetch(API_URL);
	if (!resp.ok) {
		const pre = document.createElement('pre');
		pre.innerText = await resp.text();
		document.body.appendChild(pre);
		return;
	}
	const src = await resp.arrayBuffer();
	const go = new Go();
	const result = await WebAssembly.instantiate(src, go.importObject);
	go.run(result.instance);
}

const useScripts = (containerRef: any) => {
	useEffect(() => {
		if (containerRef === null) return;
		containerRef.current.id = 'root';
		const script = document.createElement('script');
		script.src =
			'https://storage.googleapis.com/sourcegraph-resource-estimator/go_1_18_wasm_exec.js';
		script.async = true;
		document.body.appendChild(script);
		loadResourceEstimator();

		return () => {};
	}, [containerRef]);
};

export default function ResourceEstimator() {
	const containerRef = useRef(null);
	useScripts(containerRef);

	return (
		<div>
			<form id="root" ref={containerRef}></form>
		</div>
	);
}
