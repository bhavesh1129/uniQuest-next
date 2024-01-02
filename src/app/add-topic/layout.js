import { Footer, Navbar } from '@/components'
import React from 'react'

const layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default layout