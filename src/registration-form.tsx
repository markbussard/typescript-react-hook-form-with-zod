import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "./components";

const schema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name required" })
      .max(50, { message: "First name should be less than 50 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name required" })
      .max(50, { message: "Last name should be less than 50 characters" }),
    email: z
      .string()
      .min(1, { message: "Email required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(256, { message: "Password must be less than 256 characters" }),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback((values: FormValues) => {
    console.log(values);
  }, []);

  return (
    <div className="bg-color-white shadow-2xl rounded-xl w-10/12 max-w-xl">
      <h3 className="text-2xl text-center font-bold py-4">Registration</h3>
      <form
        className="flex flex-col px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 md:flex md:justify-center md:gap-8">
          <div className="mb-4 md:mr-2 md:mb-0 md:w-1/2">
            <TextInput
              id="firstName"
              label="First Name"
              type="text"
              placeholder="First Name"
              registration={register("firstName")}
              error={errors.firstName}
            />
          </div>
          <div className="md:ml-2 md:w-1/2">
            <TextInput
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              registration={register("lastName")}
              error={errors.lastName}
            />
          </div>
        </div>
        <div className="mb-4">
          <TextInput
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            registration={register("email")}
            error={errors.email}
          />
        </div>
        <div className="mb-4 md:flex md:justify-between md:gap-8">
          <div className="mb-4 md:mr-2 md:mb-0 md:w-1/2">
            <TextInput
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              registration={register("password")}
              error={errors.password}
            />
          </div>
          <div className="md:ml-2 md:w-1/2">
            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              registration={register("confirmPassword")}
              error={errors.confirmPassword}
            />
          </div>
        </div>
        <div className="mb-4">
          <input
            className="accent-slate-500"
            type="checkbox"
            id="terms"
            {...register("terms")}
          />
          <label
            htmlFor="terms"
            className={`ml-2 mb-2 text-sm font-bold ${
              errors.terms ? "text-red-500" : "text-gray-700"
            }`}
          >
            Accept Terms & Conditions
          </label>
          {errors.terms && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.terms?.message}
            </p>
          )}
        </div>
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-slate-500 rounded-full hover:bg-slate-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register Account
          </button>
        </div>
        <hr className="mb-6 border-t" />
        <div className="text-center">
          <a className="inline-block text-sm text-slate-500 align-baseline hover:text-slate-800">
            Forgot your password?
          </a>
        </div>
        <div className="text-center">
          <a className="inline-block text-sm text-slate-500 align-baseline hover:text-slate-800">
            Already have an account? Login here
          </a>
        </div>
      </form>
    </div>
  );
};
