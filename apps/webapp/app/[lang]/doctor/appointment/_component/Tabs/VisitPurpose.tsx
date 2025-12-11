

// // "use client";

// // import { SectionWrapper } from "./common/SectionWrapper";
// // import { SectionTitle } from "./common/SectionTitle";

// // export function VisitPurpose() {
// //     return (
// //         <SectionWrapper
// //             header={
// //                 <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-3">
// //                         <SectionTitle title="Visit Purpose" />
// //                     </div>
// //                 </div>

// //             }
// //         >

// //             <p className="text-gray-600 italic">
// //                 Content for Visit Purpose...

// //             </p>

// //         </SectionWrapper>

// //     )
// // }





// "use client";

// import { SectionWrapper } from "./common/SectionWrapper";
// import { SectionTitle } from "./common/SectionTitle";
// import { VisitPurposeForm } from "./visit-purpose/VisitPurposeForm";
// import { VisitPurposeHistory } from "./visit-purpose/VisitPurposeHistory";

// export function VisitPurpose() {
//     return (
//         <>
//             <SectionWrapper
//                 header={
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <SectionTitle title="Visit Purpose" />

//                             <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
//                                 ✓ Auto-saved
//                             </span>
//                         </div>
//                     </div>
//                 }
//             >
//                 <VisitPurposeForm />
//             </SectionWrapper>
//             <VisitPurposeHistory />
//         </>
//     );
// }


// Tabs/VisitPurpose.tsx

"use client";

import { SectionWrapper } from "./common/SectionWrapper";
import { SectionTitle } from "./common/SectionTitle";
import { VisitPurposeForm } from "./visit-purpose/VisitPurposeForm";
import { VisitPurposeHistory } from "./visit-purpose/VisitPurposeHistory";

import { VisitPurposeData } from "./visit-purpose/VisitPurpose";

interface VisitPurposeProps {
    data: VisitPurposeData;
    setData: (data: VisitPurposeData | ((prev: VisitPurposeData) => VisitPurposeData)) => void;
    setDirty: (dirty: boolean) => void;
}

export function VisitPurpose({ data, setData, setDirty }: VisitPurposeProps) {
    return (
        <>
            <SectionWrapper
                header={
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <SectionTitle title="Visit Purpose" />
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                ✓ Auto-saved
                            </span>
                        </div>
                    </div>
                }
            >
                <VisitPurposeForm
                    data={data}
                    setData={setData}
                    setDirty={setDirty}
                />
            </SectionWrapper>

            <VisitPurposeHistory />
        </>
    );
}
