// // app/doctor-dashboard/components/ui/AvatarImage.tsx
// "use client";

// import Image from "next/image";

// interface AvatarImageProps {
//   src: string;
//   alt?: string;
//   size?: number; // width = height
//   className?: string;
//   borderColor?: string; // tailwind or css var
// }

// export function AvatarImage({
//   src,
//   alt = "Avatar",
//   size = 46,
//   className = "",
//   borderColor = "var(--sidebar-accent)",
// }: AvatarImageProps) {
//   return (
//     <Image
//       src={src}
//       alt={alt}
//       width={size}
//       height={size}
//       className={`rounded-full border-2`}
//       style={{
//         borderColor: borderColor,
//       }}
//     />
//   );
// }


// app/doctor-dashboard/components/ui/UserAvatar.tsx
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar";

interface UserAvatarProps {
    src: string;
    alt?: string;
    size?: number; // width/height
    borderColor?: string;
    fallback?: string;
}

export function UserAvatar({
    src,
    alt = "Avatar",
    size = 46,
    borderColor = "var(--sidebar-accent)",
    fallback = "NA",
}: UserAvatarProps) {
    return (
        <Avatar
            className="rounded-full border"
            style={{
                width: size,
                height: size,
                borderColor,
            }}
        >
            <AvatarImage
                src={src}
                alt={alt}
                className="object-cover w-full h-full"
            />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}

