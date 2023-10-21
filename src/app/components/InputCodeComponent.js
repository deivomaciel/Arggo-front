import { useEffect, useRef, useState } from 'react'

function InputCode() {
    const [code, setCode] = useState('')
  
    const input1 = useRef(null)
    const input2 = useRef(null)
    const input3 = useRef(null)
    const input4 = useRef(null)
  
    const inputList = [input1, input2, input3, input4]
  
    const updateInputValue = input => {
        (input.value).length > 1 && (input.value = input.value[0])
        !(code.length >= 4) && setCode(code + input.value)
  
        if(Number(input.id) != 3 && input.value != '') {
            inputList[Number(input.id) + 1].current.disabled = false
            inputList[Number(input.id) + 1].current.focus()
            inputList[Number(input.id)].current.disabled = true
        } 
    }
  
    const deleteCaractere = input => {
        if(input.key == 'Backspace' && input.target.id != 0) {
            setCode(code.slice(0, -1))
            
            if(input.target.value == '') {
                inputList[Number(input.target.id) - 1].current.disabled = false
                inputList[Number(input.target.id) - 1].current.focus()
                inputList[Number(input.target.id)].current.disabled = true
                inputList[Number(input.target.id) - 1].current.value = ''
            }
        }
    }
  
    const showCode = () => console.log(code)
  
    useEffect(() => {
        input1.current.disabled = false
        input1.current.focus()
    }, [])

    return (
        <div className='flex items-center flex-col gap-4 w-80'>
            <div className='w-72 flex justify-between my-4'>
                <input 
                    className='w-12 h-12 outline-none text-center focus:border-main-200 rounded-lg border-2 border-zinc-300' 
                    placeholder='' 
                    ref={input1} 
                    id='0' 
                    onChange={e => updateInputValue(e.target)} 
                    onKeyDown={e => deleteCaractere(e)} 
                    type='number' 
                    disabled
                    aria-label='Number 1'
                />
                <input 
                    className='w-12 h-12 outline-none text-center focus:border-main-200 rounded-lg border-2 border-zinc-300' 
                    placeholder=''
                    ref={input2} 
                    id='1' 
                    onChange={e => updateInputValue(e.target)} 
                    onKeyDown={e => deleteCaractere(e)} 
                    type='number' 
                    disabled
                    aria-label='Number 2'
                />
                <input 
                    className='w-12 h-12 outline-none text-center focus:border-main-200 rounded-lg border-2 border-zinc-300' 
                    placeholder=''
                    ref={input3} 
                    id='2' 
                    onChange={e => updateInputValue(e.target)} 
                    onKeyDown={e => deleteCaractere(e)} 
                    type='number' 
                    disabled
                    aria-label='Number 3'
                />
                <input 
                    className='w-12 h-12 outline-none text-center focus:border-main-200 rounded-lg border-2 border-zinc-300' 
                    placeholder=''
                    ref={input4} 
                    id='3' 
                    onChange={e => updateInputValue(e.target)} 
                    onKeyDown={e => deleteCaractere(e)} 
                    type='number' 
                    disabled
                    aria-label='Number 4'
                />
            </div>
        </div>
    )
}

export default InputCode