// const LoginPage = () => {
//   return <div>LoginPage</div>
// }

// export default LoginPage


// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Image from "next/image";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Eye, EyeOff, User, Lock } from "lucide-react";
// import { useState } from "react";

// const loginSchema = z.object({
//   username: z.string().min(1, "Username is required"),
//   password: z.string().min(1, "Password is required"),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   const onSubmit = (data: LoginFormValues) => {
//     console.log("Login data:", data);
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-900 to-blue-700">
//       {/* Left Section (Image + Branding) */}
//       <div className="flex-1 flex flex-col items-center justify-center text-white p-8 relative">
//         {/* Replace this Image with your own */}
//         <div className="relative w-full max-w-md">
//           <Image
//             src="/login-illustration.png" // replace with your image path
//             alt="MedExa Illustration"
//             width={400}
//             height={400}
//             className="mx-auto object-contain"
//           />
//         </div>
//         <div className="text-center mt-6">
//           <div className="text-3xl font-bold">MedExa</div>
//           <p className="text-sm mt-2 opacity-90">
//             Trusted Digital Healthcare Ecosystem
//           </p>
//         </div>
//       </div>

//       {/* Right Section (Login Card) */}
//       <div className="flex-1 flex items-center justify-center p-6">
//         <Card className="w-full max-w-md shadow-2xl rounded-2xl">
//           <CardHeader>
//             <div className="flex justify-center mb-4">
//               <Image
//                 src="/medexa-logo.png"
//                 alt="MedExa Logo"
//                 width={140}
//                 height={40}
//               />
//             </div>
//             <CardTitle className="text-center text-xl font-semibold">
//               Login
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                 {/* Username Field */}
//                 <FormField
//                   control={form.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem>
//                       <Label>User Name</Label>
//                       <FormControl>
//                         <div className="relative">
//                           <Input
//                             placeholder="Enter your username"
//                             {...field}
//                             className="pl-10"
//                           />
//                           <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Password Field */}
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <Label>Password</Label>
//                       <FormControl>
//                         <div className="relative">
//                           <Input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter your password"
//                             {...field}
//                             className="pl-10 pr-10"
//                           />
//                           <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
//                           {showPassword ? (
//                             <EyeOff
//                               className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-500"
//                               onClick={() => setShowPassword(false)}
//                             />
//                           ) : (
//                             <Eye
//                               className="absolute right-3 top-2.5 h-5 w-5 cursor-pointer text-gray-500"
//                               onClick={() => setShowPassword(true)}
//                             />
//                           )}
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
//                   LOGIN
//                 </Button>

//                 <div className="text-center text-sm text-gray-500 mt-2">
//                   <a href="#" className="text-blue-600 hover:underline">
//                     Help?
//                   </a>
//                 </div>

//                 <div className="text-center text-xs text-gray-400 mt-4">
//                   © 2025 MedExa Cloud Health Platform
//                 </div>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import { LoginLayout } from "@/components/login/LoginLayout";

export default function LoginPage() {
  return <LoginLayout />;
}
