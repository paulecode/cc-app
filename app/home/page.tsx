import { z } from 'zod'
import { MidiCard } from './_components/midiCard/midiCard'
import { getAllFiles } from '@/actions/getResults/getAllFiles'
import { verifySession } from '@/midlewares/verifySession'
import { redirect } from 'next/navigation'
import { WavCard } from './_components/wavCard'

export default async function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const searchParamsSchema = z.object({
        file: z.union([
            z.string(),
            z.array(z.string()).transform((x) => x[0]),
            z.undefined(),
        ]),
    })

    const filename = searchParamsSchema.parse(searchParams).file

    const userUploads = await getUserUploads()

    //test this
    if (!userUploads) {
        return (
            <div className="w-full grid place-content-center">
                No pieces uploaded
            </div>
        )
    }

    if (!filename) {
        return (
            <div className="w-full grid place-content-center">
                No file selected
            </div>
        )
    }

    return (
        <div className="p-4 w-full h-full">
            <MidiCard filename={filename} />
            <WavCard filename={filename} />
        </div>
    )
}

const getUserUploads = async () => {
    const userId = await verifySession()

    if (!userId) {
        redirect('/login')
    }

    const pieces = await getAllFiles(userId)

    return pieces
}
