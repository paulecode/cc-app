import { useState, useEffect, RefObject } from 'react'
import debounce from 'lodash/debounce'

export function useResize(ref: RefObject<HTMLDivElement>) {
    const [size, setSize] = useState<
        { width: number; height: number } | undefined
    >()

    useEffect(() => {
        const getSize = debounce(() => {
            if (!ref.current) return
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            })
        }, 100)

        window.addEventListener('resize', getSize)
        getSize()
        return () => window.removeEventListener('resize', getSize)
    }, [ref])

    return size
}
