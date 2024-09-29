import { FileHeader } from './fileHeader'
import { RMSChart } from '@/components/charts/RMSChart'
import { getWavResult } from '@/actions/getResults/getWavResult'

export async function WavCard({ filename }: { filename: string }) {
    const file = await getWavResult(filename)

    if (!file) {
        return
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
