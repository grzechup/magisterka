import {ArticlePreviewData} from "src/app/shared/model/article-preview-data";

export interface PostData extends ArticlePreviewData{

  fullText: string;
  authorAddress: string;
  dateAdded: Date;


}
