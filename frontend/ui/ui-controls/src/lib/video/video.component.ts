import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {PlayOntrol} from "./play-сontrol";


@Component({
  selector: 'ui-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit {
  @ViewChild('myvideo1', {static: true})
  myvideo1!: ElementRef<any>;

  @ViewChild('myvideo2', {static: true})
  myvideo2!: ElementRef<any>;

  @ViewChild('srcz1', {static: true})
  srcz1!: ElementRef<any>;

  @ViewChild('srcz2', {static: true})
  srcz2!: ElementRef<any>;

  show1 = true;

  playController!: PlayOntrol;

  prefix!: string;

  dateTime!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {


  }

  ngAfterViewInit(): void {
    this.myvideo1.nativeElement.addEventListener('ended', (z: any) => {
      this.show1 = false;
      this.playController.nextFrame().then(res => {
        this.myvideo1.nativeElement.src = this.prefix + res;
      });
      this.myvideo2.nativeElement.play();
    });

    this.myvideo2.nativeElement.addEventListener('ended', (z: any) => {
      this.show1 = true;
      this.playController.nextFrame().then(res => {
        this.myvideo2.nativeElement.src = this.prefix + res;
      });
      this.myvideo1.nativeElement.play();
    });
  }

  find() {
    this.playController.init(new Date(this.dateTime).getTime()).then(fileName => {
      const videoName = fileName;
      console.log('VIDEO_NAME', videoName);
      this.myvideo1.nativeElement.src = this.prefix + videoName;


      this.playController.nextFrame().then(res => {
        this.myvideo2.nativeElement.src = this.prefix + res;
      });
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const camera = params.camera;
      this.playController = new PlayOntrol(this.http, camera);
      this.prefix = '/videos/' + camera + '/';
    });
  }

  start() {
    this.myvideo1.nativeElement.play();
  }
}
