import { useEffect, useState } from "react"
import { ioClient } from "../serveces/server"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

function Code() {
    const initialTime = localStorage.getItem('code') ? localStorage.getItem('timeToExpire') : 30
    const interval = 30
    const [redyToNextCode, setRedyToNextCode] = useState(true)
    const [timeToExpire, setTimeToExpire] = useState(initialTime)
    const [code, setCode] = useState('0000')
    const codeArray = code.split('')
    const router = useRouter()

    ioClient.on('code-expired', msg => {
        setRedyToNextCode(!msg.codeExpired)
        localStorage.clear()
        console.log('Código expirado!')
    })

    ioClient.on('time-to-expire', time => {
        setTimeToExpire(time)
        localStorage.setItem('timeToExpire', time)
    })

    ioClient.on('redirect', msg => {
        localStorage.removeItem('code')
        localStorage.removeItem('timeToExpire')
        Cookies.set('destiny', msg.destiny)
        router.replace('/chat')
    })

    useEffect(() => {
        if(localStorage.getItem('code')) {
            setCode(localStorage.getItem('code'))
        
        } else {
            ioClient.emit('get-code')
            ioClient.on('get-code', code => {
                setCode(code)
                localStorage.setItem('code', code)
            })
        }
    }, [])

    return (
        <div className='flex items-center flex-col gap-4 w-80'>
            <div className='w-72 flex justify-between my-4 '>
                {codeArray.map((number, index) => {
                    return (
                        <div key={index} className="w-12 h-12 outline-none flex justify-center items-center rounded-lg border-2 border-zinc-300">
                            <p className="font-bold text-main-200 text-2xl">{number}</p>
                        </div>
                    )
                })}
            </div>

            {redyToNextCode ?
                <div className="flex gap-2 -mt-3 mb-3 px-3 text-center text-base -mt-4 text-zinc-600">
                    <p>Este código expira em:</p>
                    <p className="text-black">{timeToExpire}s</p>
                </div> :
                <p className="text-red-600 -mt-3 mb-3">Este código expirou</p>
            }
        </div>
    )
}

export default Code