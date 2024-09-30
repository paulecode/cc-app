'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ENV } from '@/lib/env'
import { midiResultHandler } from '../resultHandler/midiResultHandler'
import { wavResultHandler } from '../resultHandler/wavResultHandler'
import { verifySession } from '@/midlewares/verifySession'

export const handleFileUpload = async (formData: FormData) => {
    'use server'

    const token = cookies().get('session')?.value || ''

    const userId = await verifySession()

    const filename = (formData.get('file') as File).name
    const filetype = (formData.get('file') as File).type
    formData.append('userId', userId.toString())

    const baseUrl = ENV.FASTAPI_URL
    const urlSuffix =
        filetype === 'audio/midi'
            ? '/predictMidi'
            : filetype === 'audio/x-wav'
              ? '/predictWav'
              : ''

    const result = await fetch(baseUrl + urlSuffix, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: token,
        },
        next: {
            tags: ['midi'],
        },
    })

    const response = await result.json()
    console.log(response)

    const classificationResult = {
        meta: {
            filename,
            filetype,
        },
        ...response,
    }

    if (filetype === 'audio/midi') {
        await midiResultHandler(classificationResult)
    } else if (filetype === 'audio/x-wav') {
        await wavResultHandler(classificationResult)
    }

    // redirect(`${filetype}?=${filename}`);

    redirect(`/home?file=${filename}`)
}
