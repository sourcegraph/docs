export interface Operation {
    id: string
    path: string
    description: string
    method: string
    example?: {
        request?: any
        response: any
    }
    schema: {
        parameters: OAIParameter[]
        requestBody?: any
        response?: any
    }
}
export interface OAISpec {
    openapi: string
    info: {
        title: string
        version: string
    },
    tags: {
        name: string
        description?: string
    }[],
    paths: {
        [key: string]: OAIPathItem
    }
    components?: {
        schemas?: {
            [key: string]: OAISchema
        }
    }
    securitySchemes?: {
        [key: string]: OAISecurityScheme
    }
}
export interface OAISecurityScheme {
    type: string
    in: string
    name: string
    description: string
}
export interface OAIPathItem {
    [key: string]: OAIOperation
}
export interface OAISchema {
    type?: string
    $ref?: string
    nullable?: boolean
    format?: string
    minimum?: number
    maximum?: number
    default?: any
    anyOf?: OAISchema[]
    items?: OAISchema
    required?: string[]
    enum?: string[]
    properties?: {
        [key: string]: OAISchema
    }
    description?: string
}
export interface OAIParameter {
    name: string
    in: string
    required: boolean
    schema: OAISchema
}
export interface OAIOperation {
    operationId: string
    description: string
    parameters?: OAIParameter[]
    responses: {
        '200': {
            description: string
            content: {
                'application/json': {
                    schema: OAISchema
                    example?: any
                    examples?: {
                        [key: string]: any
                    }
                }
            }
        }
    }
    requestBody?: {
        required: boolean
        content: {
            'application/json': {
                schema: OAISchema
                example?: any
                examples?: {
                    [key: string]: any
                }
            }
        }
    }
}

export interface SchemaProperty {
	name: string;
	schema: OAISchema;
}
