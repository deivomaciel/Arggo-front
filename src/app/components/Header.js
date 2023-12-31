'use client'
import Image from 'next/image'
import Logo from '../assets/logodesk.png'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
 
function Header() {
    const [logoutButtonState, setLogoutButtonState] = useState(false)
    const router = useRouter()

    useEffect(() => {
        Cookies.get('destiny') && setLogoutButtonState(true)
    }, [])

    return (
        <header className="inset-x-0 py-2 px-8 lg:px-16 flex items-center justify-between bg-main-200">
            <figure>
                <Image 
                    src={Logo}
                    alt='Logo - Transferit'
                    height={40}
                />
            </figure>

            {
                logoutButtonState && 
                <button 
                    className='transition ease-in-out duration-300 hover:bg-main-300 p-2 px-3 font-bold text-white text-xs rounded-lg border  border-white'
                >
                    Desconectar
                </button>
            }
        </header>
    )
}

export default Header