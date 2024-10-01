'use client'
import { handleFileUpload } from '@/actions/fileUpload/fileUpload'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | undefined>(undefined)
    const [trim, setTrim] = useState<boolean>(false)

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            console.log(e.target.files[0].type)
        }
    }

    console.log(trim)

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
                    {file?.type === 'audio/x-wav' && (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="trimCheckbox"
                                    onCheckedChange={() => setTrim(!trim)}
                                />
                                <Label htmlFor="trimCheckbox">Trim file</Label>
                            </div>
                            <div className="flex items-start flex-col gap-2">
                                <Label htmlFor="startTrim">Start</Label>
                                <Input
                                    type="number"
                                    id="startTrim"
                                    disabled={!trim}
                                    className="w-32"
                                />
                            </div>
                            <div className="flex items-start flex-col gap-2">
                                <Label htmlFor="endTrim">End</Label>
                                <Input
                                    id="endTrim"
                                    type="number"
                                    disabled={!trim}
                                    className="w-32"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <DialogClose asChild disabled={!file}>
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
