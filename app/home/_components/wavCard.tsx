import { FileHeader } from './fileHeader'
import { RMSChart } from '@/components/charts/RMSChart'
import { getWavResult } from '@/actions/getResults/getWavResult'

export async function WavCard({ filename }: { filename: string }) {
    const file = await getWavResult(filename)

    if (!file) {
        return
    }

    if (!file.processed) {
        return (
            <div>
                <FileHeader file={file} filetype="wav" />
                This file is still being processed, please refresh the page in a
                bit. This may take up to 5 minutes
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col">
            <FileHeader file={file} filetype="wav" />
            <div className="w-full min-h-0 grow">
                <RMSChart data={file.rms} />
            </div>
        </div>
    )
}
