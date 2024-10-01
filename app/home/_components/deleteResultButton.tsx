'use client'
import { deleteResult } from '@/actions/getResults/deleteResult'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'

export const DeleteResultButton = ({ filename }: { filename: string }) => {
    return (
        <Button
            variant="destructive"
            size="icon"
            onClick={() => deleteResult(filename)}
        >
            <TrashIcon />
        </Button>
    )
}
