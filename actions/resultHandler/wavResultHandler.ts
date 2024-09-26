import prisma from '@/lib/prisma'
import { MidiResultSchema, WavResultSchema } from './types'
import { verifySession } from '@/midlewares/verifySession'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

type ClassificationResultType = z.infer<typeof WavResultSchema>
export const wavResultHandler = async (results: ClassificationResultType) => {
    const userId = await verifySession()

    if (!userId) {
        console.error('Error verifying session')
        return
    }

    const data = WavResultSchema.safeParse(results)

    if (!data.success) {
        console.error('Error parsing data', data.error)
        return null
    }

    // Todo clean up
    const { rms } = data.data

    console.log('RMS', rms.slice(0, 10))

    const filename = data.data.meta.filename
    const filetype = data.data.meta.filetype

    const chordsData: Prisma.ChordCreateManyMidiResultInput[] = []

    try {
        const classificationResult = await prisma.wavResult.create({
            data: {
                filename,
                userId,
                classifiedGenre: 'test',
                classifiedComposer: 'test',
                rms,
            },
        })

        console.log('Created RMS', classificationResult.rms.slice(0, 10))
        return classificationResult
    } catch (error) {
        console.error('Error creating classification result', error)
        return
    }
}
