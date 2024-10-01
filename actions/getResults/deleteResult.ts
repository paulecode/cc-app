'use server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/midlewares/verifySession'
import { redirect } from 'next/navigation'

export const deleteResult = async (filename: string) => {
    const userId = await verifySession()

    if (!userId) {
        throw new Error('Invalid session')
    }

    const midiResult = await prisma.midiResult.findUnique({
        where: { userId_filename: { filename, userId } },
    })

    if (!midiResult) {
        await prisma.wavResult.delete({
            where: { userId_filename: { filename, userId } },
        })
        redirect('/home')
    }

    await prisma.midiResult.delete({
        where: { userId_filename: { filename, userId } },
    })

    redirect('/home')
}
