

"use client";

import { SectionWrapper } from "./common/SectionWrapper";
import { SectionTitle } from "./common/SectionTitle";

export function VisitPurpose() {
    return (
        <SectionWrapper
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <SectionTitle title="Visit Purpose" />
                    </div>
                </div>

            }
        >

            <p className="text-gray-600 italic">
                Content for Visit Purpose...

            </p>

        </SectionWrapper>

    )
}
