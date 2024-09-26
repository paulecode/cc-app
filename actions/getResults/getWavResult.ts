'use server'
import prisma from '@/lib/prisma'
import { MidiResult, WavResult } from '@prisma/client'

export const getWavResult = async (filename: string) => {
    const wavResult = await prisma.wavResult.findUnique({ where: { filename } })

    return wavResult
}
