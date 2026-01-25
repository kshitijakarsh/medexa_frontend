import axios from "axios";

interface UploadToS3Params {
    file: File;
    presignedUrl: string;
}

export async function uploadToS3({
    file,
    presignedUrl,
}: UploadToS3Params): Promise<void> {
    const urlToUse = presignedUrl; // Do NOT split
    console.log("Using S3 URL:", urlToUse);

    await axios.put(urlToUse, file, {
        withCredentials: false,
        headers: {
            // "Content-Type": file.type, 
        },
    });
}
