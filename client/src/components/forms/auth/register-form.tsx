import { yupResolver } from "@hookform/resolvers/yup";
import type { IRegister } from "../../../types/auth.type";
import Button from "../../common/button";
import Input from "../../common/inputs/input";
import { useForm, FormProvider } from "react-hook-form";
import { registerSchema } from "../../../schema/auth.schema";

const RegisterForm = () => {
  const methods = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
    },
    resolver: yupResolver(registerSchema),
    mode: "all",
  });

  // Submit handler
  const onSubmit = async (data: IRegister) => {
    console.log("Form submitted", data);
    // Send data to server
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                className="text-lg font-bold text-gray-800"
                htmlFor="first_name"
              ></label>
              <Input
                label="First Name"
                id="first_name"
                name="first_name"
                placeholder="John"
                required
              />
              <label
                className="text-lg font-bold text-gray-800"
                htmlFor="last_name"
              ></label>
              <Input
                label="Last Name"
                id="last_name"
                name="last_name"
                placeholder="Doe"
                required
              />
            </div>

            <label
              className="text-lg font-bold text-gray-800"
              htmlFor="email"
            ></label>
            <Input
              label="Email"
              id="email"
              name="email"
              placeholder="johndoe@gmail.com"
              required
            />

            <label
              className="text-lg font-bold text-gray-800"
              htmlFor="password"
            ></label>
            <Input
              label="Password"
              id="password"
              name="password"
              type="password" // Ensure type is set for password visibility
              placeholder="XXXXXXXXXX"
              required
            />

            <label
              className="text-lg font-bold text-gray-800"
              htmlFor="confirm_password"
            ></label>
            <Input
              label="Confirm Password"
              id="confirm_password"
              name="confirm_password"
              type="password" // Ensure type is set for password visibility
              placeholder="Retype password"
              required
            />

            <label
              className="text-lg font-bold text-gray-800"
              htmlFor="phone"
            ></label>
            <Input
              label="Phone Number"
              id="phone"
              name="phone"
              placeholder="98xxxxxx70"
            />
          </div>
          <Button type="submit" label="Submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
