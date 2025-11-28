/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react'
import { LuAsterisk } from 'react-icons/lu'
import { IoCloseOutline } from "react-icons/io5";
import { useController, useFormContext } from 'react-hook-form';
interface IProps {
    label: string,
    required?: boolean,
    id: string,
    multiple?: boolean,
    max?: number
    name: string
}

// image upload component
const ImageUpload: React.FC<IProps> = ({ id, required = false, label, multiple = false, max = 5, name }) => {
    const input_ref = useRef<HTMLInputElement>(null)
    const [images, setImages] = useState<any[]>([])
    const { control } = useFormContext()

    const { field: { onChange }, formState: { errors } } = useController({ name, control })

    const handle_change = (files: FileList | null) => {   
        console.log(files)
        if (!files) return
        const new_files = Array.from(files)
        console.log(new_files)
        const updated_files = multiple ? [...new_files, ...images].slice(0, max) : [files[0]]
        setImages(updated_files)
        onChange(multiple ? updated_files : updated_files[0])

    }

    const handle_remove = (image_index:number) => {
        
        const new_images = images.filter((_:File, index:number) => index !== image_index)
        setImages(new_images)
        onChange(multiple ? new_images : new_images[0])

    }

    return (
        <div className='h-full my-2 '>
            {/* label */}
            <div className="flex">
                <label
                    className="text-lg font-bold text-gray-800"
                    htmlFor={id}
                >{label}</label>
                {required && <LuAsterisk size={12} className="text-red-500 mt-1" />}
            </div>

            {/* input */}
            <div onClick={() => { input_ref?.current?.click() }}
                className={`mt-2 border-2 border-dashed border-indigo-500 rounded-lg p-6 
                 content-center text-center cursor-pointer min-h-30`}>
                <p className='text-sm text-gray-600 '>
                    {multiple ? `Upload up to ${max} images` : 'Click to Upload image'}
                </p>
                {errors[name] ? <p className=" text-[12px] text-red-500 h-[8px] mt-6">{errors[name]?.message as string}</p> : ''}
                <input
                    ref={input_ref}
                    multiple={multiple}
                    onChange={(e) => handle_change(e.target.files)}
                    type='file'
                    className='hidden'
                />
            </div>
            {/* preview */}
            {images.length > 0 && <div className=' w-full max-h-15 py-5 mb-14 flex gap-3'>
                {
                    images?.map((image: File, index: number) => (
                        <div key={index} className='group relative h-27 w-[120px] border border-gray-400 rounded-md '>
                            <img
                                src={URL.createObjectURL(image)}
                                alt='preview_image'
                                className='h-full w-full object-fill rounded-md'
                            />
                            <div onClick={() =>{handle_remove(index)}} className='hidden group-hover:block transition-all duration-300 w-fit absolute top-1 right-1 cursor-pointer'>
                                <IoCloseOutline size={24} className='text-red-500 font-bold' />
                            </div>
                        </div>

                    ))
                }

            </div>}
        </div>
    )
}

export default ImageUpload