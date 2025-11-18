import {defineConfig} from 'tsup'

export default defineConfig({
    entry: {
        index: './src/index.ts',
        "express/index":"./src/integrations/express.ts",
    },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    minify: false,
    shims: true,
    platform: 'node',
    target: 'es2020',
    external: [],
    banner: {
        js: '// Toryx - Type-safe error handling for TypeScript',
    },
    tsconfig: './tsconfig.json',
})