import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ExpenseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Expense {
  title: String,
  category: String,
  amount: number
}

@IonicPage()
@Component({
  selector: 'page-expense-list',
  templateUrl: 'expense-list.html',
})


export class ExpenseListPage {
  expenses: Array<Expense>;
  categories: any = []; 

  constructor(public navCtrl: NavController, public modalCtrl : ModalController, public http : HttpClient,public navParams: NavParams) {
    this.updateList();
  }

  openModal(expense){
    const params = {
      expense,
      categories: this.categories
    }
    let modal = this.modalCtrl.create(ExpenseModalPage, params);
    modal.present();
  }

  private updateList() {
    this.http.get('http://localhost:8080/expenses').subscribe((res: Array<Expense>) => {
      for(var item of res){
        this.addCategory(item.category); 
      }
      this.expenses = res;
    });
  }

  private addCategory(category){
    if(!this.categories.includes(category)){
      this.categories.push(category);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseListPage');
  }

}

@Component({
  templateUrl: 'expense.modal.html'
})

export class ExpenseModalPage{
  expense : Expense;
  category;
  categories;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController){
    this.categories = this.params.get('categories');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}