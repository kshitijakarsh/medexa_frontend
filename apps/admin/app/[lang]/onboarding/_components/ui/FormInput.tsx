// // // components/onboard-hospital/ui/FormInput.tsx
// // import { FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";
// // import { Input } from "@workspace/ui/components/input";

// // interface FormInputProps {
// //   control: any;
// //   name: string;
// //   label: string;
// //   placeholder?: string;
// //   type?: string;
// // }

// // export const FormInput = ({ control, name, label, placeholder, type = "text" }: FormInputProps) => (
// //   <FormField
// //     control={control}
// //     name={name}
// //     render={({ field }) => (
// //       <FormItem>
// //         <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
// //         <FormControl>
// //           <Input {...field} type={type} placeholder={placeholder} />
// //         </FormControl>
// //         <FormMessage />
// //       </FormItem>
// //     )}
// //   />
// // );

// // components/onboard-hospital/ui/FormInput.tsx
// import { useState } from "react";
// import { FormField, FormItem, FormControl, FormMessage } from "@workspace/ui/components/form";
// import { Input } from "@workspace/ui/components/input";
// import { Eye, EyeOff } from "lucide-react"; // for show/hide icons

// interface FormInputProps {
//   control: any;
//   name: string;
//   label: string;
//   placeholder?: string;
//   type?: "text" | "email" | "number" | "tel" | "password";
// }

// export const FormInput = ({ control, name, label, placeholder, type = "text" }: FormInputProps) => {
//   const isNumberType = type === "number" || type === "tel";
//   const isPasswordType = type === "password";
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
//           <FormControl>
//             <div className="relative">
//               <Input
//                 {...field}
//                 type={
//                   isPasswordType ? (showPassword ? "text" : "password") : isNumberType ? "tel" : type
//                 }
//                 placeholder={placeholder}
//                 inputMode={isNumberType ? "numeric" : undefined}
//                 onKeyDown={e => {
//                   if (isNumberType && !/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
//                     e.preventDefault();
//                   }
//                 }}
//                 onChange={e => {
//                   if (isNumberType) {
//                     const numericValue = e.target.value.replace(/\D/g, "");
//                     field.onChange(numericValue);
//                   } else {
//                     field.onChange(e);
//                   }
//                 }}
//               />
//               {isPasswordType && (
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(prev => !prev)}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               )}
//             </div>
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

// components/onboard-hospital/ui/FormInput.tsx
import { useState } from "react"
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { Eye, EyeOff } from "lucide-react"

interface FormInputProps {
  control: any
  name: string
  label: string
  placeholder?: string
  type?: "text" | "email" | "number" | "tel" | "password"
  maxLength?: number
}

export const FormInput = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  maxLength,
}: FormInputProps) => {
  const isNumberType = type === "number" || type === "tel"
  const isPasswordType = type === "password"
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            {label}
          </label>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={
                  isPasswordType
                    ? showPassword
                      ? "text"
                      : "password"
                    : isNumberType
                      ? "tel"
                      : type
                }
                placeholder={placeholder}
                inputMode={isNumberType ? "numeric" : undefined}
                maxLength={maxLength}
                className={`w-full rounded-lg border px-3 py-2 text-sm transition-all focus:outline-none
                  ${fieldState?.error ? "border-red-500 focus:ring-red-300" : "border-slate-300 focus:ring-blue-300"}
                  hover:border-slate-400`}
                onKeyDown={(e) => {
                  if (
                    isNumberType &&
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Tab"
                  ) {
                    e.preventDefault()
                  }
                }}
                onChange={(e) => {
                  if (isNumberType) {
                    const numericValue = e.target.value.replace(/\D/g, "")
                    field.onChange(numericValue)
                  } else {
                    field.onChange(e.target.value)
                  }
                }}
              />
              {isPasswordType && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          </FormControl>
          {fieldState?.error && (
            <FormMessage>
              <span className="text-red-500 text-xs mt-1">
                {fieldState.error.message}
              </span>
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  )
}
