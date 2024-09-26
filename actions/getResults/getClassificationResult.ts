'use server'
import prisma from '@/lib/prisma'

export const getMidiResult = async (filename: string) => {
    const midiResult = await prisma.midiResult.findUnique({
        where: { filename },
    })

    return midiResult
}
