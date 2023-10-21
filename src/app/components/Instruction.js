function Instruction({number, title, description}) {
    return (
        <div className="p-8 lg:py-0 lg:pr-8 flex flex-col lg:items-start shadow-md lg:shadow-none rounded-lg">
            <div className='flex items-center gap-3'>
                <div className='w-8 h-8 flex flex-none items-center justify-center rounded-full border-2 border-main-200 t-16'>
                    <p className='text-main-200 text-xl'>{number}</p>
                </div>
                <h2 className='text-2xl xl:text-2xl font-bold text-zinc-600'>{title}</h2>
            </div>

            <p className=' lg:text-left lg:pr-16 xl:pr-0 text-left xl:w-72 mt-2 text-zinc-600'>{description}</p>
        </div>
    )
}

export default Instruction