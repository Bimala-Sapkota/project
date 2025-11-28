import { yupResolver } from "@hookform/resolvers/yup"
import type { ILogin } from "../../../types/auth.types"
import Button from "../../common/button"
import Input from "../../common/inputs/input"
import { useForm, FormProvider } from 'react-hook-form'
import { loginSchema } from "../../../schema/auth.schema"
import { login } from "../../../api/auth.api"
import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router"
import toast from "react-hot-toast"
import { useContext } from "react"
import { AuthContext } from "../../../context/auth.context"
import { Role } from "../../../types/enums"

const LoginForm = () => {

    const { setUser, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname

    const methods = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(loginSchema),
        mode: 'all'
    })

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            // store user object and token on local storage
            setUser(data.data.user)
            setToken(data.data.access_token)
            localStorage.setItem('user', JSON.stringify(data.data.user))
            localStorage.setItem('access_token', data.data.access_token)
            // toast message -> 
            toast.success(data.message ?? 'Login sucessfull')
            // redirected to home page
            if (data.data.user.role === Role.ADMIN) {
                navigate(from ?? '/admin', { replace: true })
            } else {
                navigate(from ?? '/', { replace: true })
            }


        },
        onError: (error) => {
            // toast message -> 
            toast.error(error.message ?? 'Login failed')

        }
    })


    const onSubmit = (data: ILogin) => {
        mutate(data)
    }



    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-10 ">
                    <div className="flex flex-col gap-4">
                        {/* email */}
                        <Input
                            id={"email"}
                            label={"Email"}
                            name={'email'}
                            placeholder={'example@gmail.com'}
                            type={'text'}
                            required

                        />

                        {/* password */}
                        <Input
                            id={"password"}
                            label={"Password"}
                            name={'password'}
                            placeholder={'xxxxxxxxxx'}
                            type={'password'}
                            required

                        />
                    </div>

                    <Button
                        isDisabled={isPending}
                        label={isPending ? 'Logging In..' : "Login"}
                        type="submit"
                    />

                </form>

            </FormProvider>

        </div>
    )
}

export default LoginForm



