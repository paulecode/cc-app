import prisma from '@/lib/prisma'
import { WavResultSchema } from './types'
import { verifySession } from '@/midlewares/verifySession'
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

    const filename = data.data.meta.filename

    try {
        const classificationResult = await prisma.wavResult.create({
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
