import prisma from '@/lib/prisma'
import { MidiResultSchema } from './types'
import { verifySession } from '@/midlewares/verifySession'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

type ClassificationResultType = z.infer<typeof MidiResultSchema>
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

    // Todo clean up
    const { chords } = data.data

    const filename = data.data.meta.filename
    const filetype = data.data.meta.filetype

    console.log(chords)

    const chordsData: Prisma.ChordCreateManyMidiResultInput[] = []

    try {
        const classificationResult = await prisma.midiResult.create({
            data: {
                filename,
                userId,
                classifiedGenre: 'test',
                classifiedComposer: 'test',
                chords: { createMany: { data: chords } },
            },
        })

        console.log(classificationResult)
        return classificationResult
    } catch (error) {
        console.error('Error creating classification result', error)
        return
    }
}
