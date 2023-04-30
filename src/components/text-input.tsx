import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type TextInputProps = {
  label: string;
  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = (props: TextInputProps) => {
  const { id, label, registration, error, ...rest } = props;
  return (
    <>
      <label
        className="block mb-2 text-sm font-bold text-gray-700"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
          error && "border-red-500"
        } rounded appearance-none focus:outline-none focus:shadow-outline`}
        id={id}
        {...registration}
        {...rest}
      />
      {error && (
        <p className="text-xs italic text-red-500 mt-2">{error.message}</p>
      )}
    </>
  );
};
