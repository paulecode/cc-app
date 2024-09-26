import { z } from 'zod'

export const ChordSchema = z
    .object({
        time: z.number(),
        chord: z.array(z.string()),
        chord_name: z.string(),
        root: z.string(),
    })
    .transform(({ chord_name, chord, ...rest }) => ({
        name: chord_name,
        notes: chord,
        ...rest,
    }))

const MidiResultSchema = z.object({
    meta: z.object({
        filename: z.string(),
        filetype: z.string(),
    }),
    chords: z.array(ChordSchema),
})

const WavResultSchema = z.object({
    meta: z.object({
        filename: z.string(),
        filetype: z.string(),
    }),
    rms: z.array(z.number()),
})

export { WavResultSchema, MidiResultSchema }
