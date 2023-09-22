import React, {ReactNode} from 'react';
import Footer from '../Footer'
import Navbar from '../Navbar'

interface IProps {
    children:ReactNode
}
const MainLayout: React.FC<IProps> = ({children}) => {
    return (
    <>
        <Navbar/>
        <main>
            {children}
        </main>
        <Footer/>
    </>
    )
}

export default MainLayout;