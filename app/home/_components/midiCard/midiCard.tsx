import { BarChart } from '@/components/charts/BarChart'
import { graphicsProvider } from '@/components/charts/providers'
import { FileHeader } from '../fileHeader'
import { getMidiResult } from '@/actions/getResults/getMidiResult'

export async function MidiCard({ filename }: { filename: string }) {
    const file = await getMidiResult(filename)

    if (!file) {
        return
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
