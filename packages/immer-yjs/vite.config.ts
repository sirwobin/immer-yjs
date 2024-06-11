import path from 'node:path'
import { defineConfig } from 'vite'
// import dts from 'vite-dts'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.mts'),
            name: 'immer-yjs',
            formats: ['es', 'umd'],
            fileName: (format, entryName) => {
                if (format === 'es') {
                    return `${entryName}.mjs`;
                } else { }
                return `${entryName}.${format}.js`
            }
        },
        rollupOptions: {
            external: ['yjs', 'immer'],
            output: {
                globals: {
                    yjs: 'yjs',
                    immer: 'immer',
                },
                // Since we publish our ./src folder, there's no point
                // in bloating sourcemaps with another copy of it.
                sourcemapExcludeSources: true,
            },
        },
        sourcemap: true,
        // Reduce bloat from legacy polyfills.
        target: 'esnext',
        // Leave minification up to applications.
        minify: false,
    },
    // plugins: [dts()],
})
