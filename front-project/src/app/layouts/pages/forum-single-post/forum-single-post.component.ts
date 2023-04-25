import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Reply } from 'src/app/models/reply';
import { PostsService } from 'src/app/services/http/posts.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-forum-single-post',
  templateUrl: './forum-single-post.component.html',
  styleUrls: ['./forum-single-post.component.css'],
})
export class ForumSinglePostComponent {
  loading!: boolean;
  routerParamsSub!: Subscription;
  postData!: Post;
  postID!: number;

  filteredReplies: Reply[] = [];
  numberOfReplies: number = 0;

  selectedVerified: string = '';

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();
    window.scrollTo(0, 0);

    this.routerParamsSub = this.route.params.subscribe((data: any) => {
      this.postsService.getOneFromPosts(data['id']).subscribe((post: Post) => {
        this.postData = post;
        this.filteredReplies = this.postData.replies;
      });
    });

    const params = this.route.snapshot.params;
    if (params && params['id']) {
      this.postID = params['id'];
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = this.loadingService.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingService.startLoading();
  }

  applyFilters(): void {
    let filteredReplies = this.postData.replies;

    if (this.selectedVerified === 'yes') {
      filteredReplies = filteredReplies.filter((reply: Reply) => {
        return reply.verified === true;
      });
    }

    this.filteredReplies = filteredReplies;
    this.numberOfReplies = this.filteredReplies.length;
  }

  onVerifiedChange(event: any): void {
    this.selectedVerified = event.target.value;
    this.applyFilters();
  }
}
