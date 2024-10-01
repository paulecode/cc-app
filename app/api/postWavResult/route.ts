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
        rms: z.array(z.number()),
        spectogram: z.array(z.number()),
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
            },
            { status: 403 }
        )
    }

    const { data } = parsedBody

    const { userId, filename } = data.meta

    const { genre, composer } = data.classification

    const { rms } = data.visualization

    // find piece

    const resultToPatch = await prisma.wavResult.findUnique({
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

    const updatedResult = await prisma.wavResult.update({
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
            rms,
        },
    })

    // update piece
    return NextResponse.json({}, { status: 200 })
}
