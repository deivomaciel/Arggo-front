'use client'
import InputCode from './components/InputCodeComponent'
import Instruction from './components/Instruction'
import Code from './components/CodeComponent'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import { connect } from './serveces/server'
import Header from './components/Header'

export default function Home() {
    const [insertCodeStyle, setInsertCodeStyle] = useState('bg-main-200 text-white')
    const [getCodeStyle, setGetCodeStyle] = useState('bg-white text-main-200')
    const [change, setChange] = useState(false)
    let desc

    change ? desc = 'Insira o código no dispositivo ao qual deseja se conectar' : desc = 'Verifique o código de acesso no dipositivo ao qual deseja se conectar'

    const changeButtonStyle = value => {
        const insertStyle = value ? 'bg-main-200 text-white' : 'bg-white text-main-200'
        const getStyle = value ? 'bg-white text-main-200' : 'bg-main-200 text-white'
        setGetCodeStyle(insertStyle)
        setInsertCodeStyle(getStyle)
        setChange(value)
    }

    useEffect(() => {
        console.log('Tá funfano')
    }, [])

    return (
      <div className='h-screen flex flex-col justify-between h-full relative'>
        <Header />

        <main className='p-8 sm:p-16 flex flex-col items-center gap-4'>
          <section className='flex lg:flex-row flex-col items-center justify-between w-full'>
              <div>
                  <h1 className='text-center lg:text-left text-xl lg:pr-8 leading-normal md:text-4xl lg:text-left xl:text-5xl xl:leading-relaxed text-zinc-600 font-bold'>Compartilhe arquivos, links e textos entre dispositivos com <span className='text-main-200' >facilidade</span> e <span className='text-main-200' >segurança</span>.</h1>

                  <div className='mt-10 xl:mt-16 gap-8 flex-col xl:flex-row items-center flex hidden lg:flex'>
                      <Instruction 
                          number={1}
                          title={'Abra a Aplicação'}
                          description={'Acesse o Artemis em seu celular e computador. Certifique-se de estar conectado à internet em ambos os dispositivos'}
                      />

                      <Instruction 
                          number={2}
                          title={'Gere um Código de Acesso'}
                          description={'Escolha um dispositivo para gerar um código de acesso exclusivo. Insira o código no outro dispositivo para estabelecer uma conexão segura.'}
                      />
                  </div>
              </div>

              <div className='max-w-md mt-4 p-6 rounded-lg flex flex-col items-center gap-4 lg:shadow-2xl'>
                <h2 className="mb-4 text-2xl font-bold text-center text-zinc-600">Código de verificação</h2>

                <p className="px-3 text-center text-base text-zinc-600">{desc}</p>

                {change ? <Code /> : <InputCode />}

                <button
                    onClick={() => {changeButtonStyle(false)}}
                    className={`${insertCodeStyle} w-full h-14 transition ease-in-out duration-300  rounded-lg border-2 border-main-200`}
                >
                    Inserir código de acesso
                </button>

                <button
                    onClick={() => {changeButtonStyle(true)}}
                    className={`${getCodeStyle} w-full h-14 transition ease-in-out duration-300  rounded-lg border-2 border-main-200`}
                >
                    Gerar código de acesso
                </button>
              </div>
          </section>

          <section>
                <div className='mb-8 xl:mt-16 flex flex-col w-80 gap-8 xl:flex-row items-center lg:hidden'>
                    <Instruction 
                        number={1}
                        title={'Abra a Aplicação'}
                        description={'Acesse o Artemis em seu celular e computador. Certifique-se de estar conectado à internet em ambos os dispositivos'}
                    />

                    <Instruction 
                        number={2}
                        title={'Gere um Código de Acesso'}
                        description={'Escolha um dispositivo para gerar um código de acesso exclusivo. Insira o código no outro dispositivo para estabelecer uma conexão segura.'}
                    />
                </div>
          </section>
        </main>

        <Footer /> 
    </div>
  )
}
