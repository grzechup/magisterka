import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'src/app/shared/service/ipfs.service';
import {PostPreviewData} from "src/app/shared/model/post-preview-data";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  postPreview: PostPreviewData = {
    postId: 1,
    title: "article title",
    previewText: "preview example text"
  };

  constructor(private postsService: IpfsService) { }

  ngOnInit(): void {
  }

}
