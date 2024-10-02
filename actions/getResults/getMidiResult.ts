'use server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/midlewares/verifySession'

/**
 * Retrieves a MIDI result from the database.
 *
 * @param filename - The name of the MIDI file.
 * @returns A promise that resolves to the MIDI result or null if not found.
 * @throws Will throw an error if the session is invalid.
 */
export const getMidiResult = async (filename: string) => {
    const userId = await verifySession()

    if (!userId) {
        throw new Error('Invalid session')
    }

    const midiResult = await prisma.midiResult.findUnique({
        where: { userId_filename: { filename, userId } },
    })

    return midiResult
}
