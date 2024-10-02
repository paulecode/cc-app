import { BarChart } from '@/components/charts/BarChart'
import { graphicsProvider } from '@/components/charts/providers'
import { getMidiResult } from '@/actions/getResults/getMidiResult'
import { FileHeader } from './fileHeader'
import { cn } from '@/lib/utils'
import NotesScatterplot from '@/components/charts/NoteChart'

export async function MidiCard({
    filename,
    activeChart = 'Notes',
}: {
    filename: string
    activeChart?: string
}) {
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

    const { notes, velocity, timestamps } = file

    return (
        <div className="w-full h-full flex flex-col">
            <FileHeader file={file} activeChart={activeChart} filetype="midi" />
            <ChartWrapper activeChart={activeChart} chartName="Chords">
                <BarChart
                    data={chordData.map((chord) => {
                        return {
                            label: chord.name,
                            value: chord._count.name,
                        }
                    })}
                />
            </ChartWrapper>
            <ChartWrapper activeChart={activeChart} chartName="Notes">
                <NotesScatterplot midiData={{ notes, velocity, timestamps }} />
            </ChartWrapper>
        </div>
    )
}

export const ChartWrapper: React.FC<{
    children: React.ReactNode
    activeChart: string
    chartName: string
}> = ({ children, activeChart, chartName }) => {
    const classNames = cn(
        'w-full',
        'min-h-0',
        'grow',
        activeChart == chartName ? 'visible' : 'hidden'
    )
    return <div className={classNames}>{children}</div>
}
