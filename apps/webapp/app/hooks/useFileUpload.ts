"use client";

import { useGeneratePresignedUrl } from "@/app/hooks/useStorage";
import { uploadToS3 } from "@/lib/storage/uploadToS3";
import { getPublicS3Url } from "@/lib/storage/getPublicS3Url";

export function useFileUpload() {
    const generatePresignedUrl = useGeneratePresignedUrl();

    const uploadFile = async (file: File, path: string) => {
        const presigned = await generatePresignedUrl.mutateAsync({
            fileName: file.name,
            contentType: file.type,
            path,
        });

        await uploadToS3({
            file,
            presignedUrl: presigned.uploadUrl,
        });

        return getPublicS3Url(presigned.bucket, presigned.key);
    };

    return {
        uploadFile,
        isUploading: generatePresignedUrl.isPending,
    };
}
