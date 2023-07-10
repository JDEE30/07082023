import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mdb-angular-ui-kit-free';
  searchTerm: string;
  jobs: any[];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  search() {
    const apiUrl = 'https://remotive.io/api/remote-jobs?limit=10&search=' + this.searchTerm;

    this.http.get(apiUrl).subscribe((response: any) => {
      this.jobs = response.jobs.map((job: any) => {
        const plainDescription = this.stripHtmlTags(job.description);
        const descriptionWithBreaks = this.addBreaks(plainDescription);
        return { ...job, descriptionWithBreaks };
      });
    });
  }


  clearResults() {
    this.searchTerm = '';
    this.jobs = [];

  }
  
  private stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  private addBreaks(text: string): string {
    const sentences = text.split('. ');
    const sentencesWithBreaks = [];

    for (let i = 0; i < sentences.length; i++) {
      sentencesWithBreaks.push(sentences[i]);
      if ((i + 1) % 3 === 0 && i !== sentences.length - 1) {
        sentencesWithBreaks.push('<br><br>');
      }
    }

    return sentencesWithBreaks.join('. ');
  }
}


