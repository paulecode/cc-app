'use server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/midlewares/verifySession'

export const deleteAccount = async () => {
    const userId = await verifySession()

    if (!userId) {
        console.error('Invalid session')
        return
    }

    try {
        const accountDeleted = await prisma.user.delete({
            where: { id: userId },
        })
    } catch (error) {
        console.error('Account deleteion failed: ', error)
    }
}
