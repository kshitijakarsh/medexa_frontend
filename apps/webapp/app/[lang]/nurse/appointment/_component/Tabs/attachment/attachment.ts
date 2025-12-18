export interface createdByProps{
  name: string;
}

export interface Attachment {
  id: string;
  title: string;
  description?: string;
  s3_url: string;
  created_at: string;
  createdBy?: createdByProps
}