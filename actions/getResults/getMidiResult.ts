'use server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/midlewares/verifySession'

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
