'use client'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

export const PieceListEntry = ({
    label,
    currentlySelected,
}: {
    label: string
    currentlySelected: string | null
}) => {
    const variant = label === currentlySelected ? 'default' : 'ghost'

    const router = useRouter()

    const handleClick = () => {
        router.push(`/home?file=${label}`)
    }
    return (
        <Button
            variant={variant}
            onClick={handleClick}
            value={label}
            className="flex justify-between w-full"
        >
            <p className="truncate">{label}</p>
            <ChevronRightIcon className="shrink-0" />
        </Button>
    )
}
