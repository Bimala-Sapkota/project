import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../../common/inputs/input'
import TextArea from '../../common/inputs/text-area'
import Button from '../../common/button'
import CategorySelect from '../category-select'
import { yupResolver } from '@hookform/resolvers/yup'
import { productSchema } from '../../../schema/product.schema'
import type { IProductDataFormData } from '../../../types/product.types'
import ImageUpload from '../image-upload'
import { useMutation } from '@tanstack/react-query'
import { create_product } from '../../../api/product.api'
import toast from 'react-hot-toast'

const ProductForm = () => {

    const methods = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            stock: '',
            category: '',
            isFeatured: false,


        },
        resolver: yupResolver(productSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: create_product,
        onSuccess: (response) => {
            toast.success(response.message || 'Product added')
        },
        onError: (error) => {
            toast.error(error.message || 'Product added')
        }
    })

    const handleSubmit = (data: IProductDataFormData) => {
        console.log(data)
        const { category, name, price, stock, coverImage, images, description, isFeatured } = data;
        const formData = new FormData()
        formData.append('name', name)
        formData.append('category', category)
        formData.append('price', price.toString())
        formData.append('stock', stock.toString())
        formData.append('isFeatured', isFeatured.toString())
        if (description) {

            formData.append('description', description)
        }

        formData.append('coverImage', coverImage)

        if (images) {
            images.forEach(file => {
                formData.append('images', file)
            })
        }

        mutate(formData)

    }


    return (
        <div className='py-10 px-14 w-[800px] mx-auto border border-gray-300 rounded-md '>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)} className='flex flex-col gap-4 '>
                    <Input
                        id='name'
                        label='Product Name'
                        name='name'
                        placeholder='iPhone 15'
                        required
                    />

                    <CategorySelect />

                    <div className='grid grid-cols-2 gap-4'>
                        <Input
                            id='price'
                            label='Price'
                            name='price'
                            placeholder='150000'
                            required
                        />

                        <Input
                            id='stock'
                            label='Total available items'
                            name='stock'
                            placeholder='15'
                            required
                        />
                    </div>
                    {/* cover image */}
                    <ImageUpload
                        label='Cover Image'
                        id={'cover_image'}
                        name={'coverImage'}
                        required
                    />

                    {/* images */}
                    <ImageUpload
                        label='Images'
                        id={'images'}
                        name={'images'}
                        required
                        multiple
                        max={5}
                    />
                    <TextArea
                        id='description'
                        name='description'
                        label='Description'
                        placeholder='Start typing here....'

                    />


                    <div className='flex gap-2 items-center mb-1 w-fit cursor-pointer'>
                        <input {...methods.register('isFeatured')} type='checkbox' id={'featured'} className='h-4 w-4 cursor-pointer' />
                        <label className='font-semibold text-sm cursor-pointer' htmlFor='featured'>Save Featured product</label>
                    </div>

                    <div className='w-full'>
                        <Button
                            type='submit'
                            label={isPending ? 'Creating..' : 'Create'}
                            isDisabled={isPending}
                        />

                    </div>

                </form>
            </FormProvider>

        </div>
    )
}

export default ProductForm