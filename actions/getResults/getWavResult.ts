'use server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/midlewares/verifySession'

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
