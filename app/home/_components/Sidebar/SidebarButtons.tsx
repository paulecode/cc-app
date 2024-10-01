'use client'

import { Button } from '@/components/ui/button'

export const LogOutButton = ({ logout }: { logout: any }) => {
    return (
        <Button variant="outline" onClick={() => logout()}>
            Log out
        </Button>
    )
}
