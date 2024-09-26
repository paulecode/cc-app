const requiredKeys = ['POSTGRES_URL', 'JWT_SECRET', 'FASTAPI_URL'] as const
// const requiredKeys = ["POSTGRES_URL", "FASTAPI_URL", "JWT_SECRET"] as const;

interface envInterface {
    POSTGRES_URL: string
    FASTAPI_URL: string
    JWT_SECRET: string
}

/**
 * Retrieves and ensures the presence of specific environment variables.
 *
 * @returns {envInterface} The required environment variables with proper types.
 * @throws {Error} If any required environment variable is missing.
 */
function env(): envInterface {
    requiredKeys.forEach((key) => {
        if (process.env[key] === undefined) {
            throw new Error(`Environment variable ${key} is undefined`)
        }
    })

    return {
        POSTGRES_URL: process.env.POSTGRES_URL!,
        FASTAPI_URL: process.env.FASTAPI_URL!,
        JWT_SECRET: process.env.JWT_SECRET!,
    }
}

export const ENV = env()
