import { useForm, FormProvider } from "react-hook-form";
import Button from "../../common/button";
import Input from "../../common/inputs/input";
import type { ILogin } from "../../../types/auth.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../schema/auth.schema";
import { login } from "../../../api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      console.log("Login success response ", data);

      //store user object and token on local storage

      localStorage.setItem("user", JSON.stringify(data.data.user));

      //toast meassage->
      toast.success(data.message ?? "login Successful");

      navigate("/"); // login is successful then move to home page
    },

    onError: (error) => {
      toast.error(error.message ?? "Login fail ");
      console.log("Login error response", error);
    },
  });

  const onSubmit = async (data: ILogin) => {
    console.log("Form submitted", data);
    // const response = await login(data);
    mutate(data);
    // console.log(response);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          <div>
            {/* Email */}
            <Input
              id={"email"}
              type={"text"}
              name={"email"}
              placeholder={"example@gmail.com"}
              label={"Email"}
              required
            />

            {/* Password */}
            <Input
              id={"password"}
              type={"password"}
              name={"password"}
              placeholder={"xxxxxx"}
              label={"Password"}
              required
            />
          </div>

          <Button
            isDisabled={isPending}
            type={"submit"}
            label={isPending ? "Logging in..." : "Login"} // Change button text during loading
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
