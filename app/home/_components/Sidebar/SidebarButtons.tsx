'use client'

import { Button } from '@/components/ui/button'

const LogOutButton = ({ logout }: { logout: any }) => {
    return (
        <Button variant="outline" onClick={() => logout()}>
            Log out
        </Button>
    )
}

const DeleteButton = ({ deleteAccount }: { deleteAccount: any }) => {
    return (
        <Button variant="destructive" onClick={() => deleteAccount()}>
            Delete Account
        </Button>
    )
}

export { LogOutButton, DeleteButton }
