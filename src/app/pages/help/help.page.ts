import { Component, OnInit } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';



@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  readonly questions = [
    {
      question: 'How to use the application?',
      answer:
        `<p>Basically, each day, you could add sources of allowance and reasons of expenses to keep
      track of where your funds are going. Use the "+" button to add a new allowance/expense, and swipe left on an item to delete it.</p>

          <p>You could also replay the tutorial <a href="/tutorial">here</a>.</p>`
    },
    {
      question: 'What are templates (expense)?',
      answer:
        `<p>Templates for expenses makes it easy for you to add multiple items on your expenses. 
        You could create your own template, add multiple items, and use that to add multiple items at once, 
        therefore saving you time on typing it all over again.</p>
        
        <p>One scenario that this might be useful is when adding daily expenses to your list, such as transportation fees. 
        Rather than typing the same exact items for each day, using template makes it faster for you to add those items as you wish.</p>`
    },
    {
      question: 'How is the "Top 10" lists on summary calculated?',
      answer:
        `<p>The top 10 list for allowances and expenses is calculated by getting the sum of all allowances/expenses 
        with the same names. For instance, you have spent your money on the same thing for each day (i.e. "Lunch"). 
        On generating the summary, all those expenses with names matching "Lunch" are summed up with their amounts, 
        and those items are ranked with their total amounts on descending order.</p>`
    },
    {
      question: 'Is my data and privacy safe while using the application?',
      answer: 
      `<p>All the data you save in this application are stored locally in your device, and is NOT uploaded to 
      any online servers. Thus, the application will work totally offline.</p>`
    }

  ];

  feedbackCategory = '';
  txtSubject: string = '';
  txtDescription: string = '';

  hrefMail = '';

  constructor(
    private googleAnalytics: GoogleAnalytics,
  ) { }

  ngOnInit() {
    this.googleAnalytics.trackView('Help')
  }

  parseMail() {
    let subject = 'Budget Planner ' + this.feedbackCategory + ': ' + this.txtSubject.trim();

    let desc = this.txtDescription.trim();

    this.hrefMail = `mailto:nobs@gmail.com?subject=${subject}&body=${desc}`;
    this.hrefMail = this.hrefMail.split(' ').join('%20');
  }



}
