import type {Metadata} from 'next'
import './globals.css'
import {AuthProvider} from "@/context/authProvider";
import {UIProvider} from "@/context/uiProvider";

export const metadata: Metadata = {
    title: 'Next Context App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <UIProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </UIProvider>
        </body>
        </html>
    )
}
