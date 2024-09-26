import { getChordsGroupBy } from '@/actions/getResults/agg/chordGroupBy'
import { MidiResult } from '@prisma/client'

export const chordGroups = async (classificationResult: MidiResult) => {
    const chords = await getChordsGroupBy(classificationResult)

    return chords
}
