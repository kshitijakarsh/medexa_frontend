import axios from "axios";

interface UploadToS3Params {
  file: File;
  presignedUrl: string;
}

export async function uploadToS3({
  file,
  presignedUrl,
}: UploadToS3Params): Promise<void> {
  await axios.put(presignedUrl.split("?")[0] ?? '', file, {
    withCredentials: false,
    headers: {
      "Content-Type": file.type,
    },
  });
}
