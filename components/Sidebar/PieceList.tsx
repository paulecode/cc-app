'use client'
import { useParams, useSearchParams } from 'next/navigation'
import { PieceListEntry } from './PieceListEntry'

export const PieceList = ({ fileList }: { fileList: string[] | undefined }) => {
    const currentSelection = useSearchParams().get('file')

    if (!fileList) {
        return <div>No pieces uploaded yet</div>
    }

    return (
        <div
            className="flex-grow w-full flex flex-col gap-2 min-h-0 overflow-y-auto"
            style={{
                maskImage:
                    'linear-gradient(to bottom, black calc(100% - 32px), transparent 100%)',
            }}
        >
            {fileList.map((file) => {
                return (
                    <PieceListEntry
                        key={file}
                        label={file}
                        currentlySelected={currentSelection}
                    />
                )
            })}
        </div>
    )
}
