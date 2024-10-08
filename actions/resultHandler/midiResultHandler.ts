import prisma from '@/lib/prisma'
import { MidiResultSchema } from './types'
import { verifySession } from '@/midlewares/verifySession'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

type ClassificationResultType = z.infer<typeof MidiResultSchema>
/**
 * Handles the creation of a MIDI classification result in the database.
 *
 * @param results - The classification result data to be stored.
 * @returns A promise that resolves to the created classification result or null if an error occurs.
 */
export const midiResultHandler = async (results: ClassificationResultType) => {
    const userId = await verifySession()

    if (!userId) {
        console.error('Error verifying session')
        return
    }

    const data = MidiResultSchema.safeParse(results)

    if (!data.success) {
        console.error('Error parsing data', data.error)
        return null
    }

    const filename = data.data.meta.filename

    try {
        const classificationResult = await prisma.midiResult.create({
            data: {
                filename,
                userId,
                processed: false,
            },
        })

        return classificationResult
    } catch (error) {
        console.error('Error creating classification result', error)
        return
    }
}
