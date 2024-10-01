import { deleteResult } from '@/actions/getResults/deleteResult'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { MidiResult, WavResult } from '@prisma/client'
import { TrashIcon } from '@radix-ui/react-icons'
import { DeleteResultButton } from './deleteResultButton'

export const FileHeader = ({
    file,
    filetype,
}: {
    file: WavResult | MidiResult
    filetype: 'wav' | 'midi'
}) => {
    const wavChartOptions = ['RMS', 'Spectrogram', 'Mel-Frequency']
    const midiChartOptions = ['Notes', 'Mean Velocity', 'Chords']

    const options = filetype === 'wav' ? wavChartOptions : midiChartOptions

    return (
        <>
            <div className="w-full flex justify-between">
                <div>
                    <p className="text-gray-600">Filename</p>
                    <h3>{file.filename}</h3>
                    <div className="grid grid-cols-[max-content_max-content] content-start gap-x-4 gap-y-1">
                        <span className="text-gray-600">
                            Classified composer:
                        </span>
                        <span className="text-gray-800">
                            {file.classifiedComposer}
                        </span>
                        <span className="text-gray-600">Classified genre:</span>
                        <span className="text-gray-800">
                            {file.classifiedGenre}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <DeleteResultButton filename={file.filename} />
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a view" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => {
                                return (
                                    <SelectItem value={option} key={option}>
                                        {option}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    )
}
