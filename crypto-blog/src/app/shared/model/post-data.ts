import {PostPreviewData} from "src/app/shared/model/post-preview-data";

export interface PostData extends PostPreviewData{

  fullText: string;
  authorAddress: string;
  dateAdded: Date;


}
