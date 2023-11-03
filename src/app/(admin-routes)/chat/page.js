'use client'
import { useEffect, useRef, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { GrAttachment } from 'react-icons/gr'
import Empty from '../../assets/empty.png'
import Image from 'next/image'
import TextMessage from '../../components/TextMessage'
import getFileType from '../../components/fileGroups'
import ImageComponent from '../../components/ImageComponent'
import DocsComponent from '../../components/DocsComponent'
import Cookies from 'js-cookie'
import { ioClient } from '@/app/serveces/server'
import Header from '@/app/components/Header'
import './styles.css'

export default function Chat() {
    const [text, setText] = useState(null)
    const textInputRef = useRef(null)
    const parentRef = useRef(null)
    const childRef = useRef(null)
    const [destinyUid, setDestinyUid] = useState()
    
    const [messageArray, setMessageArray] = useState([]) // BOX

    const fileRenders = {
        image({time, file}) { 
            return <ImageComponent time={time} file={file} />
        },

        documents({time, file}) {
            return <DocsComponent time={time} file={file} />
        },

        text({time, content}) {
            return <TextMessage time={time} content={content} />
        }
    }

    const getCurrentTime = () => {
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const currentTime = `${hours}:${minutes}`
        return currentTime
    }

    const sendFile = inputFile => {
        const file = inputFile
        const fileExtension = file.name.split('.').slice(-1)[0]
        const fileGroup = getFileType(fileExtension)

        setMessageArray([...messageArray, {
            key: messageArray.length,
            group: fileGroup,
            time: getCurrentTime(),
            file: file,
        }])
    }

    const sendInputText = textToShow => {
        if(textToShow) {
            setMessageArray([...messageArray, {
                group: 'text',
                key: messageArray.length,
                time: getCurrentTime(),
                name: 'TextMessage',
                content: textToShow
            }])

            setText(null)
            textInputRef.current.value = ''
            textInputRef.current.focus()
        }
    }

    ioClient.on('recive-message', msg => sendInputText(msg))

    const sendMessage = e => {
        e.preventDefault()
        sendInputText(text)
        ioClient.emit('send-message', { destiny: destinyUid, message: text })
    }

    useEffect(() => {
        setTimeout(() => {
            childRef.current.scrollIntoView({ behavior: 'smooth' })
        }, 0)
    }, [messageArray])

    useEffect(() => {
        setDestinyUid(Cookies.get('destiny'))
        textInputRef.current.focus()
    }, [])

    return (
        <div className="h-screen chat-container flex flex-col">
            <Header />

            <div className="h-screen max-h-screen  w-full flex flex-col justify-between relative overflow-hidden">
                <div 
                    ref={parentRef} 
                    id='message-container' 
                    className='h-full max-h-screen overflow-y-auto p-6 gap-4 flex flex-col bg-footer'
                >
                    {messageArray.map(message => {
                        return <div className='self-start' key={message.key}>
                                    {fileRenders[message.group](message)}
                                </div>
                    })}
                    
                    {
                        messageArray.length == 0 && (
                            <div className='h-full flex flex-col items-center justify-center'>
                                <Image width={232} src={Empty} alt='Empty'/>
                                <p className='text-base lg:text-2xl text-neutral-400 tracking-widest'>Você ainda não enviou arquivos.</p>
                            </div>
                        ) 
                    }
                    <div ref={childRef}></div>
                </div>

                <div className="w-full p-6 flex bg-footer">
                    <form id='message-form' onSubmit={e => sendMessage(e)} className='w-full flex p-2 rounded-lg bg-white'>
                        <input
                            type='text'
                            spellCheck='true'
                            wrap='soft'
                            autoComplete='on' 
                            placeholder='Mensagem' 
                            className="w-full resize-none px-4 rounded-lg outline-none "
                            onChange={e => setText(e.target.value)}
                            ref={textInputRef}
                        />

                        <label className='w-12 h-12 rounded-md flex flex-none cursor-pointer items-center justify-center mr-4 transition ease-in-out duration-300 hover:bg-zinc-300 bg-zinc-200'>
                            <input type='file' accept='*' className='hidden' name='Upload' onChange={e => sendFile(e.target.files[0])}/>
                            <span>
                                <GrAttachment />
                            </span>
                        </label>

                        <button 
                            className='w-12 h-12 rounded-md flex flex-none items-center justify-center bg-main-200'
                            type="submit"
                        >
                            <BsFillSendFill fill='white' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}