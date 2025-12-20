export function normalizeStatus(status: string) {
    return status
        .trim()
        .toLowerCase()
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function statusKey(label: string) {
    return label.replace(/\s+/g, "");
}

export const statusStyles: Record<
    string,
    {
        bg: string; text: string; border?: string, bgLight?: string;
    }
> = {
    Pending: {
        bg: "bg-[#FFF4D9]",
        bgLight: "bg-[#FFF4D9]/30",
        text: "text-[#F4A100]",
    },
    InProgress: {
        bg: "bg-[#E6F3FF]",
        text: "text-[#2C8DF0]",
        bgLight: "bg-[#E6F3FF]/20",
        border: "border border-[#CFE9FF]",
    },
    InConsultation: {
        bg: "bg-[#0B84FF]",
        bgLight: "bg-[#0B84FF]/30",
        text: "text-white",
    },
    LabTest: {
        bg: "bg-[#FFF0F6]",
        text: "text-[#D6336C]",
    },
    Radiology: {
        bg: "bg-[#F3F0FF]",
        text: "text-[#7048E8]",
    },
    Completed: {
        bg: "bg-[#E7F8ED]",
        text: "text-[#0F9D58]",
    },
    Cancelled: {
        bg: "bg-[#F03E3E]",
        text: "text-white",
    },
};

export const fallbackStyle = {
    bg: "bg-gray-200",
    text: "text-gray-700",
    border: "",
    bgLight: ""
};
