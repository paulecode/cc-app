import { ChordSchema } from '@/actions/resultHandler/types'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
    meta: z.object({ filename: z.string(), userId: z.number() }),
    classification: z.object({
        genre: z.string(),
        composer: z.string(),
    }),
    visualization: z.object({
        notes: z.array(z.number()),
        timestamps: z.array(z.number()),
        velocity: z.array(z.number()),
        chords: z.array(ChordSchema),
    }),
})

export async function POST(req: NextRequest) {
    const body = await req.json()

    const parsedBody = bodySchema.safeParse(body)

    if (!parsedBody.success) {
        return NextResponse.json(
            {
                message: 'Something went wrong while validating your request',
                error: parsedBody.error.flatten(),
                addon: parsedBody.error.stack,
            },
            { status: 403 }
        )
    }

    const { data } = parsedBody

    const { userId, filename } = data.meta

    const { genre, composer } = data.classification

    const { notes, timestamps, velocity, chords } = data.visualization

    const resultToPatch = await prisma.midiResult.findUnique({
        where: { userId_filename: { userId, filename } },
    })

    if (!resultToPatch) {
        return NextResponse.json(
            {
                message: "A file with that filename couldn't be found",
            },
            { status: 404 }
        )
    }

    const updatedResult = await prisma.midiResult.update({
        where: {
            userId_filename: {
                filename: resultToPatch.filename,
                userId: resultToPatch.userId,
            },
        },
        data: {
            processed: true,
            classifiedGenre: genre,
            classifiedComposer: composer,
            notes,
            timestamps,
            velocity,
            chords: { createMany: { data: chords } },
        },
    })

    return NextResponse.json({}, { status: 200 })
}
