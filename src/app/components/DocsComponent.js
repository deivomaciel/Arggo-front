import { BiSolidFilePdf, BiSolidFileTxt, BiSolidFileDoc } from 'react-icons/bi'
import { BsDownload } from 'react-icons/bs'
import { downloadFile } from '../serveces/downloadFiles'

export default function DocsComponent({ time, file }) {
    const finalName = file.name.length > 20 ? `${file.name.substr(0, 22)}...` : file.name
    const fileExtension = file.name.split('.').slice(-1)[0]
    const size = file.size
    const blob = new Blob([file], { type: file.type })
    const url = URL.createObjectURL(blob)

    const extensionsGroups = {
        pdf: ['pdf'],
        txt: ['txt'],
        documents: ['doc', 'docx', 'ODT', 'OTT'],
        spreadsheet: ['xls', 'xlsx', 'ODP', 'OTP']
    }

    const parseFileSize = fileSize => {
        let unitOfMeasurement
        let size

        if(`${Math.floor(fileSize / 2**10)}`.length >= 4) {
            size = Math.floor(fileSize / 2**20)
            unitOfMeasurement = 'MB'
    
        } else {
            size = Math.floor(fileSize / 2**10)
            unitOfMeasurement = 'kB'
        }

        return {
            unit: unitOfMeasurement,
            size: size
        }
    }

    const getExtensionGroup = extension => {
        for(const group in extensionsGroups) {
            if(extensionsGroups[group].includes(extension)) return group
        }
    }

    const types = {
        pdf: () => <BiSolidFilePdf size={48} fill='#FF2400'/>,
        documents: () => <BiSolidFileDoc size={48} fill='#90CAF9'/>,
        txt: () => <BiSolidFileTxt size={48} fill='#a1a1aa'/>
    }

    return (
        <button className='w-72 group' onClick={() => downloadFile(url, file.name)}>
            <div className=" rounded-lg flex flex-col p-2 bg-white">
                <div className="relative flex gap-2 py-2 rounded bg-footer">
                    <div className='w-full h-full -mt-2 flex items-center justify-center animation duration-300 opacity-0 group-hover:opacity-40 absolute rounded bg-zinc-500'>
                        <BsDownload size={32} fill='#FFF'/>
                    </div>

                    {types[getExtensionGroup(fileExtension)]()}
                    
                    <div className='flex flex-col gap'>
                        <p className='text-neutral-600'>{finalName}</p>
                        <span className='flex text-xs text-neutral-500'>
                            <p>{`${parseFileSize(size).size} ${parseFileSize(size).unit} - ${fileExtension.toLocaleUpperCase()}`}</p>
                        </span>
                    </div>
                </div>
                <span className="text-xs mt-2 mr-2 text-right text-zinc-500">{time}</span>
            </div>
        </button>
    )
}