'use server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/midlewares/verifySession'

/**
 * Retrieves a WAV result from the database.
 *
 * @param filename - The name of the WAV file.
 * @returns A promise that resolves to the WAV result or null if not found.
 * @throws Will throw an error if the session is invalid.
 */
export const getWavResult = async (filename: string) => {
    const userId = await verifySession()

    if (!userId) {
        throw new Error('Invalid session')
    }

    const wavResult = await prisma.wavResult.findUnique({
        where: { userId_filename: { filename, userId } },
    })

    return wavResult
}
