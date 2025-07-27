import { useForm, FormProvider } from "react-hook-form";
import Button from "../../common/button";
import Input from "../../common/inputs/input";
import type { ILogin } from "../../../types/auth.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../schema/auth.schema";
import { login } from "../../../api/auth.api";

const LoginForm = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (data: ILogin) => {
    console.log("Form submitted", data);
    const response = await login(data);
    console.log(response);
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
          <Button type={"submit"} label={"Login"} />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
