import Sidebar from '@/components/Sidebar/Sidebar'
import React from 'react'

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-screen w-full overflow-clip flex">
            <Sidebar />
            {children}
        </div>
    )
}
