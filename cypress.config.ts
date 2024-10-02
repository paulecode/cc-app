import { defineConfig } from 'cypress'

export default defineConfig({
    env: {
        POSTGRES_URL:
            'postgresql://test_postgres:password@localhost:5432/mydb?schema=public',
        JWT_SECRET: '123abc',
        FASTAPI_URL: 'http://localhost:8000',
    },

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        experimentalStudio: true,
    },

    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
})
