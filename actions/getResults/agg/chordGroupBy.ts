'use server'
import prisma from '@/lib/prisma'
import { MidiResult } from '@prisma/client'

export const getChordsGroupBy = async (midiResult: MidiResult) => {
    const chords = await prisma.chord.groupBy({
        by: ['name'],
        where: { midiResultId: midiResult.id },
        _count: { name: true },
    })
    return chords
}
