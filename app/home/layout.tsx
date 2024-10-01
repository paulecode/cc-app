import React from 'react'
import Sidebar from './_components/Sidebar/Sidebar'

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
