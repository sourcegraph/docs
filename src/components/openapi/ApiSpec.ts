import {OAISchema, OAISpec, Operation, SchemaProperty} from './types';

export function newApiSpec(spec: OAISpec): ApiSpec {
	const components = new Map<string, OAISchema>();
	const operations: Operation[] = [];
	for (const path of Object.keys(spec.paths)) {
		const pathItem = spec.paths[path as keyof typeof spec.paths];
		for (const method of Object.keys(pathItem)) {
			const operation = pathItem[method as keyof typeof pathItem];
			if (operation && 'operationId' in operation) {
				const requestExample =
					operation.requestBody?.content?.['application/json']
						?.example;
				const responseExample =
					operation.responses['200']?.content?.['application/json']
						?.example;
				operations.push({
					id: `${method.toUpperCase()} ${path}`,
					method,
					path,
					description: operation.description,
					example:
						requestExample || responseExample
							? {
									request: requestExample,
									response: responseExample
								}
							: undefined,
					schema: {
						requestBody:
							operation.requestBody?.content?.['application/json']
								?.schema,
						response:
							operation.responses['200']?.content?.[
								'application/json'
							]?.schema,
						parameters: operation.parameters ?? []
					}
				});
			}
		}
	}
	for (const component of Object.keys(spec.components?.schemas ?? {})) {
		const schema = spec.components?.schemas?.[component];
		if (!schema) {
			continue;
		}
		components.set(`#/components/schemas/${component}`, schema);
	}
	return new ApiSpec(components, operations);
}

export class ApiSpec {
	constructor(
		public readonly components: Map<string, OAISchema>,
		public readonly operations: Operation[]
	) {}
	public findOperation(operation: string): Operation | undefined {
		for (const op of this.operations) {
			if (op.id === operation) {
				return op;
			}
		}
		return undefined;
	}
	public ref(ref: string): OAISchema {
		const component = this.components.get(ref);
		if (!component) {
			throw new Error(`$ref not found: ${ref}`);
		}
		return component;
	}
	public canonical(schema: OAISchema): OAISchema {
		if (schema.$ref) {
			return this.canonical(this.ref(schema.$ref));
		}
		return schema;
	}
	public properties(schema: OAISchema): SchemaProperty[] {
		if (schema.$ref) {
			return this.properties(this.ref(schema.$ref));
		}
		return Object.entries(schema.properties ?? {}).map(
			([name, schema]) => ({name, schema})
		);
	}
}
