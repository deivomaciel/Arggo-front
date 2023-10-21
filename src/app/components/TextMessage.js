import { useRef, useState } from 'react'
import { BiCopy, BiCheck } from 'react-icons/bi'

export default function TextMessage({content, time }) {
    const [copyIconFlag, setIopyIconFlag] = useState(true)
    const copyButtonRef = useRef(null)

    const changeCoppyIcon = () => {
        setIopyIconFlag(false)
        copyButtonRef.current.disabled = true

        setInterval(() => {
            setIopyIconFlag(true)
            copyButtonRef.current.disabled = false
        }, 5000)
    }

    const copyMessageContent = () => {
        navigator.clipboard.writeText(content)
        changeCoppyIcon()
    }

    return (
        <div className="self-start rounded-lg flex flex-col px-4 py-2 bg-white">
            <div className='flex pb-4'>
                <p className="max-w-2xs text-sm lg:max-w-xl break-words text-justify">{content}</p>

                <button ref={copyButtonRef} onClick={() => copyMessageContent()} className='ml-2 self-start rounded-md p-2 transition ease-in-out duration-200 hover:bg-zinc-200'>
                    {copyIconFlag ? <BiCopy fill='#52525b' /> : <BiCheck fill='#52525b' />}
                </button>
            </div>
            <span className="-mt-3 text-xs text-right text-zinc-500">{time}</span>
        </div>
    )
}