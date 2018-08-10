import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ExpenseDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Expense {
  _id? : string,
  title: string,
  category: string,
  amount: number
}

@IonicPage()
@Component({
  selector: 'page-expense-dashboard',
  templateUrl: 'expense-dashboard.html',
})
export class ExpenseDashboardPage {

  total: number = 0;
  expenses: Array<Expense>
  categories: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.updateList();
  }

  private updateList() {
    this.http.get('http://localhost:8080/expenses').subscribe((res: Array<Expense>) => {
      for(var item of res){
        var category = item.category;
        if(!this.categories.includes(category)){
          this.categories.push(category);
        }
        this.total += item.amount;
      }
      this.expenses = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseDashboardPage');
  }

}
