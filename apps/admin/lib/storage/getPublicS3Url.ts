export function getPublicS3Url(
    bucket: string,
    key: string,
    region = "ap-south-1"
) {
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
