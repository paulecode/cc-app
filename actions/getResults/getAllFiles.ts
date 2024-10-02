'use server'

import prisma from '@/lib/prisma'

/**
 * Fetches all MIDI and WAV files associated with a user.
 *
 * @param userId - The ID of the user whose files are to be retrieved.
 * @returns A promise that resolves to an object containing arrays of MIDI and WAV results.
 */
export const getAllFiles = async (userId: number) => {
    const files = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: { midiResults: true, wavResults: true },
    })

    return files
}
