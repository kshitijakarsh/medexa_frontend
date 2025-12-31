// // "use client";

// // import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@workspace/ui/components/card";
// // import { Badge } from "@workspace/ui/components/badge";
// // import { Plus } from "lucide-react";

// // interface DashboardCardProps {
// //   title: string;
// //   subtitle: string;
// //   active: number;
// // }

// // export function DashboardCard({ title, subtitle, active }: DashboardCardProps) {
// //   return (
// //     <Card className="w-full transition hover:shadow-lg cursor-pointer">
// //       <CardHeader>
// //         <CardTitle className="text-base font-semibold">{title}</CardTitle>
// //         <CardDescription className="text-sm text-muted-foreground">
// //           {subtitle}
// //         </CardDescription>
// //       </CardHeader>
// //       <CardFooter className="flex items-center justify-between">
// //         <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
// //           {active} Active
// //         </Badge>
// //         <div className="flex items-center gap-1 text-sm text-primary font-medium">
// //           <Plus className="h-4 w-4" /> Add
// //         </div>
// //       </CardFooter>
// //     </Card>
// //   );
// // }


// "use client";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@workspace/ui/components/card";
// import { Badge } from "@workspace/ui/components/badge";
// import { AddMasterPanel } from "./add-master-panel";
// import { MessageCircle, Newspaper } from "lucide-react";

// // interface DashboardCardProps {
// //   title: string;
// //   subtitle: string;
// //   active: number;
// // }

// // export function DashboardCard({ title, subtitle, active }: DashboardCardProps) {
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <>
// //       <Card className="w-full transition hover:shadow-lg cursor-pointer">
// //         <CardHeader>
// //           <CardTitle className="text-base font-semibold">{title}</CardTitle>
// //           <CardDescription className="text-sm text-muted-foreground">
// //             {subtitle}
// //           </CardDescription>
// //         </CardHeader>
// //         <CardFooter className="flex items-center justify-between">
// //           <Badge
// //             variant="outline"
// //             className="bg-green-50 text-green-700 border-green-200"
// //           >
// //             {active} Active
// //           </Badge>
// //           <button
// //             onClick={() => setOpen(true)}
// //             className="flex items-center gap-1 text-sm text-primary font-medium"
// //           >
// //             <Plus className="h-4 w-4" /> Add
// //           </button>
// //         </CardFooter>
// //       </Card>

// //       <AddMasterDialog open={open} onOpenChange={setOpen} title={title} />
// //     </>
// //   );
// // }



// // interface DashboardCardProps {
// //   title: string
// //   subtitle: string
// //   active: number
// // }

// // export function DashboardCard({ title, subtitle, active }: DashboardCardProps) {
// //   return (
// //     <Card className="w-full transition hover:shadow-lg cursor-pointer">
// //       <CardHeader>
// //         <CardTitle className="text-base font-semibold">{title}</CardTitle>
// //         <CardDescription className="text-sm text-muted-foreground">
// //           {subtitle}
// //         </CardDescription>
// //       </CardHeader>
// //       <CardFooter className="flex items-center justify-between">
// //         <Badge
// //           variant="outline"
// //           className="bg-green-50 text-green-700 border-green-200"
// //         >
// //           {active} Active
// //         </Badge>
// //         <AddMasterPanel />
// //       </CardFooter>
// //     </Card>
// //   )
// // }


// interface DashboardCardProps {
//   title: string
//   subtitle: string
//   active: number
// }

// export function DashboardCard({ title, subtitle, active }: DashboardCardProps) {
//   return (
//     <Card className="w-full h-full flex flex-col justify-between transition hover:shadow-lg cursor-pointer p-2">
//       <div>
//         <CardHeader className="px-2">
//           <CardTitle className="text-base font-semibold">{title}</CardTitle>
//           <CardDescription className="text-sm text-muted-foreground">
//             {subtitle}
//           </CardDescription>
//         </CardHeader>
//       </div>

//       <CardFooter className="mt-auto flex items-center justify-between bg-white/50 backdrop-blur-sm px-2">
//         <Badge
//           variant="outline"
//           // className="bg-green-50 text-green-700 border-green-200"
//           className="border-0 text-blue-700"
//         >
//           <Newspaper className="h-5 w-5"/> {active} Active
//         </Badge>
//         <AddMasterPanel />
//       </CardFooter>
//     </Card>
//   )
// }





"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddMasterPanel } from "./add-master-panel";
import { masterConfig } from "./fecth-master";
import { useParams } from "next/navigation";

interface DashboardCardProps {
  id: string;
  title: string;
  subtitle: string;
  active: number;
}

export function DashboardCard({ title, subtitle, active, id }: DashboardCardProps) {
  const router = useRouter();
  const config = masterConfig[id];
  const params = useParams<{ lang?: string }>();
  const lang = params?.lang || "en";
  console.log("DashboardCard config:", id);

  const handleCardClick = () => {
    console.log("Card clicked:", id);
    if (config?.route) {
      console.log("Navigating to:", config.route);
      router.push(`/${lang}${config.route}`);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      className="w-full h-full flex flex-col justify-between transition hover:shadow-lg cursor-pointer p-2"
    >
      <div>
        <CardHeader className="px-2">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {subtitle}
          </CardDescription>
        </CardHeader>
      </div>

      <CardFooter className="mt-auto flex items-center justify-between bg-white/50 backdrop-blur-sm px-2">
        <Badge
          variant="outline"
          className="border-0 text-blue-700 flex items-center gap-1"
        >
          <Newspaper className="h-5 w-5" /> {active} Active
        </Badge>

        {/* Pass dynamic options */}
        <AddMasterPanel options={config?.addOptions || []} />
      </CardFooter>
    </Card>
  );
}
