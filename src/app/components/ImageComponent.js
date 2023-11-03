import { BsDownload } from 'react-icons/bs'
import { downloadFile } from '../serveces/downloadFiles'
import Image from 'next/image'

export default function ImageComponent({ time, file}) {
    const blob = new Blob([file], { type: file.type })
    const url = URL.createObjectURL(blob)

    return (
        <div className='self-start flex flex-col'>
            <figure className='relative p2 rounded-lg border-2'>
                <button 
                    className='w-full h-full flex items-center justify-center animation duration-300 opacity-0 hover:opacity-75 absolute rounded-lg bg-zinc-500'
                    onClick={() => downloadFile(url, file.name)}
                >
                    <BsDownload size={48} fill='#FFFFFF'/>
                </button>

                <Image
                    className='rounded-lg'
                    src={url}
                    width={300}
                    height={300}
                    alt='Imagem'
                />
            </figure>

            <span className="p-2 rounded-lg text-xs text-right text-zinc-500">{time}</span>
        </div>
    )
} 