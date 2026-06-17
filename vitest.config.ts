import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
    test: {
        environment: 'jsdom',   // simulate browser
        globals: true,
        setupFiles: './vitest.setup.ts',
        css: true,
        exclude: ['**/end-to-end/**', '**/node_modules/**', '**/vitest.config.ts', '**/vitest.setup.ts'],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./")
        }
    }

});