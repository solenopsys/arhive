
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@Component({
  standalone: true,
  imports: [PdfJsViewerModule , RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fr-datasheets';
}