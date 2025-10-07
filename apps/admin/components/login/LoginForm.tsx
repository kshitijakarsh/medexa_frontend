// // // "use client";

// // // import { useForm } from "react-hook-form";
// // // import { zodResolver } from "@hookform/resolvers/zod";
// // // import { z } from "zod";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// // // import { Eye, EyeOff, User, Lock } from "lucide-react";
// // // import { useState } from "react";
// // // import { loginUser } from "@/lib/api";
// // // import { toast } from "sonner"; // optional if using shadcn toast

// // // const loginSchema = z.object({
// // //     username: z.string().min(1, "Username is required"),
// // //     password: z.string().min(1, "Password is required"),
// // // });

// // // type LoginFormValues = z.infer<typeof loginSchema>;

// // // export function LoginForm() {
// // //     const [showPassword, setShowPassword] = useState(false);
// // //     const [loading, setLoading] = useState(false);

// // //     const form = useForm<LoginFormValues>({
// // //         resolver: zodResolver(loginSchema),
// // //         defaultValues: { username: "", password: "" },
// // //     });

// // //     const onSubmit = async (data: LoginFormValues) => {
// // //         setLoading(true);
// // //         const res = await loginUser(data.username, data.password);
// // //         setLoading(false);

// // //         if (res.success) {
// // //             toast.success(res.message);
// // //         } else {
// // //             toast.error(res.message);
// // //         }
// // //     };

// // //     return (
// // //         <Form {...form}>
// // //             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
// // //                 {/* Username */}
// // //                 <FormField
// // //                     control={form.control}
// // //                     name="username"
// // //                     render={({ field }) => (
// // //                         <FormItem>
// // //                             <Label>User Name</Label>
// // //                             <FormControl>
// // //                                 <div className="relative">
// // //                                     <Input
// // //                                         placeholder="Enter your username"
// // //                                         {...field}
// // //                                         className="pl-10"
// // //                                     />
// // //                                     <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
// // //                                 </div>
// // //                             </FormControl>
// // //                             <FormMessage />
// // //                         </FormItem>
// // //                     )}
// // //                 />

// // //                 {/* Password */}
// // //                 <FormField
// // //                     control={form.control}
// // //                     name="password"
// // //                     render={({ field }) => (
// // //                         <FormItem>
// // //                             <Label>Password</Label>
// // //                             <FormControl>
// // //                                 <div className="relative">
// // //                                     <Input
// // //                                         type={showPassword ? "text" : "password"}
// // //                                         placeholder="Enter your password"
// // //                                         {...field}
// // //                                         className="pl-10 pr-10"
// // //                                     />
// // //                                     <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
// // //                                     {showPassword ? (
// // //                                         <EyeOff
// // //                                             className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-500"
// // //                                             onClick={() => setShowPassword(false)}
// // //                                         />
// // //                                     ) : (
// // //                                         <Eye
// // //                                             className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-500"
// // //                                             onClick={() => setShowPassword(true)}
// // //                                         />
// // //                                     )}
// // //                                 </div>
// // //                             </FormControl>
// // //                             <FormMessage />
// // //                         </FormItem>
// // //                     )}
// // //                 />

// // //                 <Button
// // //                     type="submit"
// // //                     disabled={loading}
// // //                     className="w-full bg-green-600 hover:bg-green-700"
// // //                 >
// // //                     {loading ? "Logging in..." : "LOGIN"}
// // //                 </Button>

// // //                 <div className="text-center text-sm text-gray-500 mt-2">
// // //                     <a href="#" className="text-blue-600 hover:underline">
// // //                         Help?
// // //                     </a>
// // //                 </div>

// // //                 <div className="text-center text-xs text-gray-400 mt-4">
// // //                     © 2025 MedExa Cloud Health Platform
// // //                 </div>
// // //             </form>
// // //         </Form>
// // //     );
// // // }



// // "use client";

// // import { z, zodResolver } from "@workspace/ui/lib/zod";
// // import { Button } from "@workspace/ui/components/button";
// // import { Input } from "@workspace/ui/components/input";
// // import { Label } from "@workspace/ui/components/label";
// // import { Form, FormControl, FormField, FormItem, FormMessage, } from "@workspace/ui/components/form";
// // import { Eye, EyeOff, User, Lock } from "lucide-react";
// // import { useState } from "react";
// // import { loginUser } from "@/lib/api";
// // import { useForm } from "@workspace/ui/hooks/use-form";

// // // ✅ Updated schema with strong password validation
// // const loginSchema = z.object({
// //   username: z.string().min(1, "Username is required"),
// //   password: z
// //     .string()
// //     .min(8, "Password must be at least 8 characters")
// //     .regex(/[A-Z]/, "Must contain at least one uppercase letter")
// //     .regex(/[a-z]/, "Must contain at least one lowercase letter")
// //     .regex(/\d/, "Must contain at least one number")
// //     .regex(/[@$!%*?&]/, "Must contain at least one special character (@, $, !, %, *, ?, &)"),
// // });

// // type LoginFormValues = z.infer<typeof loginSchema>;

// // export function LoginForm() {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const form = useForm<LoginFormValues>({
// //     resolver: zodResolver(loginSchema),
// //     defaultValues: { username: "", password: "" },
// //   });

// //   const onSubmit = async (data: LoginFormValues) => {
// //     setLoading(true);
// //     const res = await loginUser(data.username, data.password);
// //     setLoading(false);

// //     if (res.success) {
// //       // toast.success(res.message);
// //     } else {
// //       // toast.error(res.message);
// //     }
// //   };

// //   return (
// //     <Form {...form}>
// //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
// //         {/* Username */}
// //         <FormField
// //           control={form.control}
// //           name="username"
// //           render={({ field }) => (
// //             <FormItem>
// //               <Label>User Name</Label>
// //               <FormControl>
// //                 <div className="relative">
// //                   <Input
// //                     placeholder="Enter your username"
// //                     {...field}
// //                     className="pl-10"
// //                   />
// //                   <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
// //                 </div>
// //               </FormControl>
// //               <FormMessage />
// //             </FormItem>
// //           )}
// //         />

// //         {/* Password */}
// //         <FormField
// //           control={form.control}
// //           name="password"
// //           render={({ field }) => (
// //             <FormItem>
// //               <Label>Password</Label>
// //               <FormControl>
// //                 <div className="relative">
// //                   <Input
// //                     type={showPassword ? "text" : "password"}
// //                     placeholder="Enter a strong password"
// //                     {...field}
// //                     className="pl-10 pr-10"
// //                   />
// //                   <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
// //                   {showPassword ? (
// //                     <EyeOff
// //                       className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-500"
// //                       onClick={() => setShowPassword(false)}
// //                     />
// //                   ) : (
// //                     <Eye
// //                       className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-500"
// //                       onClick={() => setShowPassword(true)}
// //                     />
// //                   )}
// //                 </div>
// //               </FormControl>
// //               {/* This automatically shows each error message */}
// //               <FormMessage />
// //             </FormItem>
// //           )}
// //         />

// //         <Button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-green-600 hover:bg-green-700"
// //         >
// //           {loading ? "Logging in..." : "LOGIN"}
// //         </Button>

// //         <div className="text-center text-sm text-gray-500 mt-2">
// //           <a href="#" className="text-blue-600 hover:underline">
// //             Help?
// //           </a>
// //         </div>

// //         <div className="text-center text-xs text-gray-400 mt-4">
// //           © 2025 MedExa Cloud Health Platform
// //         </div>
// //       </form>
// //     </Form>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import { z, zodResolver } from "@workspace/ui/lib/zod";
// import { useForm } from "@workspace/ui/hooks/use-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@workspace/ui/components/form";
// import { Input } from "@workspace/ui/components/input";
// import { Button } from "@workspace/ui/components/button";
// import { User, Lock, Eye, EyeOff } from "lucide-react";
// import { loginUserCognito } from "@/lib/api"; // AWS Cognito login function
// import { Label } from "@workspace/ui/components/label";

// // ------------------------
// // Schema for validation
// // ------------------------
// const loginSchema = z.object({
//   username: z.string().min(1, "Username is required"),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//     .regex(/[a-z]/, "Must contain at least one lowercase letter")
//     .regex(/\d/, "Must contain at least one number")
//     .regex(/[@$!%*?&]/, "Must contain at least one special character"),
// });

// export type LoginFormValues = z.infer<typeof loginSchema>;

// // ------------------------
// // Login Form Component
// // ------------------------
// export function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { username: "", password: "" },
//   });

//   const onSubmit = async (values: LoginFormValues) => {
//     setLoading(true);
//     try {
//       const res = await loginUserCognito(values.username, values.password);
//       if (res.success) {
//         // Navigate or show toast
//       } else {
//         // Show error toast
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//         {/* Username Field */}
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <Label>User Name</Label>
//               <FormControl>
//                 <div className="relative">
//                   <Input
//                     placeholder="Enter your username"
//                     {...field}
//                     className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-200"
//                   />
//                   <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Password Field */}
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <Label>Password</Label>
//               <FormControl>
//                 <div className="relative">
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     {...field}
//                     className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-200"
//                   />
//                   <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                   {showPassword ? (
//                     <EyeOff
//                       className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-400"
//                       onClick={() => setShowPassword(false)}
//                     />
//                   ) : (
//                     <Eye
//                       className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-400"
//                       onClick={() => setShowPassword(true)}
//                     />
//                   )}
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 hover:bg-green-700"
//         >
//           {loading ? "Logging in..." : "LOGIN"}
//         </Button>

//         <div className="text-center text-sm text-gray-500 mt-2">
//           <a href="#" className="text-blue-600 hover:underline">
//             Need Help?
//           </a>
//         </div>

//         <div className="text-center text-xs text-gray-400 mt-4">
//           © 2025 MedExa Cloud Health Platform
//         </div>
//       </form>
//     </Form>
//   );
// }


"use client";

import { useState, useTransition } from "react";
import { toast } from "@workspace/ui/lib/sonner";
import { z, zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { User, Lock, Eye, EyeOff, Fingerprint } from "lucide-react";
import { Label } from "@workspace/ui/components/label";
import { loginUserCognito } from "@/lib/api";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[@$!%*?&]/, "Must contain at least one special character"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onChange",
  });

  const handleLogin = async (values: LoginFormValues) => {
    startTransition(async () => {
      try {
        const res = await loginUserCognito(values.username, values.password);

        if (res.success) {
          toast.success("Login successful!", {
            description: "Redirecting to your dashboard...",
          });
          // example: router.push("/dashboard");
        } else {
          toast.error("Invalid credentials", {
            description: res.message || "Please check your username or password.",
          });
        }
      } catch (err: any) {
        console.error("Login error:", err);
        toast.error("Unexpected error", {
          description: "Please try again later or contact support.",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-5 animate-fade-in"
        aria-label="Login form"
      >
        {/* Fingerprint Icon */}
        <div className="flex justify-center mb-2">
          <Fingerprint className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Login
        </h2>

        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="username">User Name</Label>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    autoComplete="username"
                    {...field}
                    className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-200 transition-colors"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">Password</Label>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...field}
                    className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-200 transition-colors"
                  />
                  {showPassword ? (
                    <EyeOff
                      aria-label="Hide password"
                      className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      aria-label="Show password"
                      className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          {isPending ? "Logging in..." : "LOGIN"}
        </Button>

        {/* Help Link */}
        <div className="text-center mt-2">
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            Need Help?
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-4">
          © 2025 MEdExa Cloud Health Platform
        </div>
      </form>
    </Form>
  );
}
