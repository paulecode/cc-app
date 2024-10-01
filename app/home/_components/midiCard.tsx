import { BarChart } from '@/components/charts/BarChart'
import { graphicsProvider } from '@/components/charts/providers'
import { getMidiResult } from '@/actions/getResults/getMidiResult'
import { FileHeader } from './fileHeader'

export async function MidiCard({ filename }: { filename: string }) {
    const file = await getMidiResult(filename)

    if (!file) {
        return
    }
    if (!file.processed) {
        return (
            <div>
                <FileHeader file={file} filetype="midi" />
                This file is still being processed, please refresh the page in a
                bit. This may take up to 5 minutes
            </div>
        )
    }

    const chordData = await graphicsProvider.chordGroups(file)

    return (
        <div className="w-full h-full flex flex-col">
            <FileHeader file={file} filetype="midi" />
            <div className="w-full min-h-0 grow">
                <BarChart
                    data={chordData.map((chord) => {
                        return {
                            label: chord.name,
                            value: chord._count.name,
                        }
                    })}
                />
            </div>
        </div>
    )
}
