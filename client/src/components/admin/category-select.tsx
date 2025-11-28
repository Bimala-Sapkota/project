/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query"
import SelectInput from "../common/inputs/select-input"
import { getAllCategory } from "../../api/category.api"
import type { ICategoryData } from "../../types/category.types"
import { Controller, useFormContext } from "react-hook-form"




const CategorySelect = () => {

  const {control,formState:{errors}} = useFormContext()
  const { data, isLoading } = useQuery({
    queryFn: getAllCategory,
    queryKey: ['get_all_category']
  })

  if (isLoading) {
    return <p>Loading....</p>
  }

  const options = data?.data.map((cat: ICategoryData) => ({ label: cat.name, value: cat._id }))

  return (
    <div className="">
      <Controller
        control={control}
        name={'category'}
        render={({ field: { onChange, value } }) => (
          <SelectInput
            onChange={onChange}
            value={value}
            id="category"
            label="Category"
          placeholder="Select Category"
            options={options}
            error={errors?.category?.message as string}
            required
          />
        )}
      />


    </div>
  )
}

export default CategorySelect