'use server'
import prisma from '@/lib/prisma'
import { MidiResult } from '@prisma/client'

/**
 * Retrieves grouped chord data based on a MIDI classification result.
 *
 * @param classificationResult - The result object containing MIDI classification data.
 * @returns A promise that resolves to the grouped chord data.
 */
export const getChordsGroupBy = async (midiResult: MidiResult) => {
    const chords = await prisma.chord.groupBy({
        by: ['name'],
        where: { midiResultId: midiResult.id },
        _count: { name: true },
    })
    return chords
}
