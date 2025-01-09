import { ENV } from '@/lib/env'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Home() {
    ENV

    redirect('/auth')

    return (
        <main></main>
    )
}
