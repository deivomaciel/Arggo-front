function Code() {
    const code = '1094'
    const codeArray = code.split('')

    return (
        <div className='flex items-center flex-col gap-4 w-80'>
            <div className='w-72 flex justify-between my-4 '>
                {codeArray.map(number => {
                    return (
                        <div key={number} className="w-12 h-12 outline-none flex justify-center items-center rounded-lg border-2 border-zinc-300">
                            <p className="font-bold text-main-200 text-2xl">{number}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Code