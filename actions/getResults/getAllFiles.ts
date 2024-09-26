'use server'

import prisma from '@/lib/prisma'

export const getAllFiles = async (userId: number) => {
    const files = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: { midiResults: true, wavResults: true },
    })

    return files
}
