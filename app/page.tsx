import { ENV } from '@/lib/env'
import { redirect } from 'next/navigation'

export default function Home() {
    ENV

    redirect('/auth')
}
