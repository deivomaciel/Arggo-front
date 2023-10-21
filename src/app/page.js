'use client'
import InputCode from './components/InputCodeComponent'
import Instruction from './components/Instruction'
import Code from './components/CodeComponent'
import { useState } from 'react'
import Footer from './components/Footer'

export default function Home() {
    const [change, setChange] = useState(false)
    let desc

    if(change) {
        desc = 'Insira o código no dispositivo ao qual deseja se conectar'
    } else {
        desc = 'Verifique o código de acesso no dipositivo ao qual deseja se conectar'
    }

    return (
      <div className='h-full relative'>
        <main className='p-8 sm:p-16 flex flex-col items-center gap-4'>
          <section className='flex lg:flex-row flex-col justify-between w-full'>
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

              <div className='p-8 mt-4 rounded-lg flex flex-col items-center gap-4 lg:shadow-2xl'>
                <h2 className="mb-4 text-2xl font-bold text-center text-zinc-600">Código de verificação</h2>

                <p className="px-3 text-center text-base -mt-4 text-zinc-600">{desc}</p>

                {change ? <Code /> : <InputCode />}

                <button
                    onClick={() => {setChange(!change)}}
                    className='transition ease-in-out duration-300 hover:bg-main-200 hover:text-white w-full h-14 rounded-lg text-main-200 border-2 border-main-200'
                >
                    {change ? 'Inserir código de acesso' : 'Gerar código de acesso'}
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
