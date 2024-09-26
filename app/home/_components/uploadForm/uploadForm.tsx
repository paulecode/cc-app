'use client'
import { handleFileUpload } from '@/actions/fileUpload/fileUpload'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | undefined>(undefined)

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload</Button>
            </DialogTrigger>
            <DialogContent>
                <form action={handleFileUpload} className="flex flex-col gap-2">
                    <DialogHeader>
                        <DialogTitle>Upload</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Upload an audio file in midi or wav format
                    </DialogDescription>
                    <Input
                        accept="audio/midi,audio/wav"
                        name="file"
                        type="file"
                        onChange={onFileChange}
                        required
                    />
                    <DialogFooter>
                        <DialogClose disabled={!file}>
                            <Button type="submit" disabled={!file}>
                                Upload
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
