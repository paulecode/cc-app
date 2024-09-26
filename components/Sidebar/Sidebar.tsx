import { UploadForm } from '@/app/home/_components/uploadForm/uploadForm'
import { PieceList } from './PieceList'
import { redirect } from 'next/navigation'
import { verifySession } from '@/midlewares/verifySession'
import { getAllFiles } from '@/actions/getResults/getAllFiles'
import { Button } from '../ui/button'

export default async function Sidebar() {
    const userId = await verifySession()

    if (!userId) {
        redirect('/login')
    }

    const wavAndMidiFiles = await getAllFiles(userId)

    const wavResults = wavAndMidiFiles?.wavResults || []

    const midiResults = wavAndMidiFiles?.midiResults || []

    const files = [...midiResults, ...wavResults].map((file) => file.filename)

    return (
        <div className="border-r border-gray-200 gap-2 shadow-xl p-4 flex flex-col justify-between w-96">
            <h2>Pieces</h2>
            <PieceList fileList={files} />
            <UploadForm />
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Log out</Button>
                <Button variant="destructive">Delete Account</Button>
            </div>
        </div>
    )
}
