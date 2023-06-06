import {Component, Input, OnInit} from '@angular/core';
import {PostPreviewData} from "src/app/shared/model/post-preview-data";

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {

  @Input()
  postPreview: PostPreviewData;


  constructor() { }

  ngOnInit(): void {
  }

}
