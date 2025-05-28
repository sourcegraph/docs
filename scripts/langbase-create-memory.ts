import 'dotenv/config';
import { Langbase } from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
    const memory = await langbase.memories.create({
        name: 'memory-sg-docs-live',
        description: 'An AI memory storing all Sourcegraph docs.',
        chunk_size: 30000,
    });

    console.log('Memory created:', memory);
}

main();
