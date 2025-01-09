import { decodeToken } from '@/actions/auth/helpers/decodeToken'
import { cookies } from 'next/headers'

/**
 * Verifies the current user session.
 *
 * @returns A promise that resolves to the user ID if the session is valid, otherwise null.
 */
export async function verifySession() {
    const session = cookies().get('session')?.value

    if (!session) {
        return false
    }

    try {
        const decodedToken = await decodeToken(session)
        return decodedToken
    } catch (error) {
        return false
    }
}
