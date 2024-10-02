'use server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/midlewares/verifySession'
import { redirect } from 'next/navigation'

/**
 * Deletes a result file from the database.
 *
 * @param filename - The name of the file to be deleted.
 * @throws Will throw an error if the session is invalid or the file cannot be found.
 */
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
