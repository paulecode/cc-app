import * as jose from 'jose'
import { ENV } from '@/lib/env'
import jwt from 'jsonwebtoken'

/**
 * Generates a signed JWT token with a sub:payload pattern
 * @param {number} payload - the subject of the JWT,
 * in this project the userId
 * @returns {string} the signed JWT
 */
export async function generateToken(payload: number) {
    const key = new TextEncoder().encode(ENV.JWT_SECRET)
    const joseToken = await new jose.SignJWT()
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(`${payload}`)
        .setIssuedAt()
        .sign(key)

    return joseToken
}
