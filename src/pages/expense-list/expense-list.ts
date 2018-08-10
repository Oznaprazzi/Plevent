import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ExpenseDashboardPage } from '../expense-dashboard/expense-dashboard';

/**
 * Generated class for the ExpenseListPage page.
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
  selector: 'page-expense-list',
  templateUrl: 'expense-list.html',
})


export class ExpenseListPage {
  expenses: Array<Expense>;

  constructor(public navCtrl: NavController, public modalCtrl : ModalController, public http : HttpClient, public navParams: NavParams, public alertCtrl: AlertController) {
    this.updateList();
  }

  toDashboard(){
    this.navCtrl.push(ExpenseDashboardPage, {});
  }

  openModal(expense){
    const params = {
      expense,
    }
    let modal = this.modalCtrl.create(ExpenseModalPage, params);
    modal.present();
  }

  doAddPrompt(){
    let prompt = this.alertCtrl.create({
      title: 'Create Expense',
      inputs:[
        {
          name: 'title', placeholder: 'Expense Title'
        },
        {
          name: 'category', placeholder: 'Expense Category'
        },
        {
          name: 'amount', placeholder: 'Price'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: (data: {title, category, amount}) => {
            // Do validity checks
            if(!data.title || !data.category || !data.amount) {
              this.notifyError('Title, category, and amount must filled in.');
              return;
            }
            var amount = parseFloat(data.amount);
            if(isNaN(amount)){
              this.notifyError('Amount must be a number.');
              return;
            }
            // Add item to DB
            this.addItem(data);
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });
    prompt.present();
  }

  private notifyError(msg: string){
    const alert = this.alertCtrl.create({
      title: 'Oh no!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  private addItem(item: {title, category, amount}){
    this.http.post('http://localhost:8080/expenses/expense', item).subscribe(res => {
      this.updateList();
    });
  }

  doDeletePrompt(item){
    const confirm = this.alertCtrl.create({
      title: 'Delete this expense?',
      message: 'This item may be important!',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(item);
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }

  private deleteItem(item){
    var id = item._id;
    this.http.delete(`http://localhost:8080/expenses/expense/${id}`).subscribe(res => {
      this.updateList();
    });
  }

  private updateList() {
    this.http.get('http://localhost:8080/expenses').subscribe((res: Array<Expense>) => {
      this.expenses = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseListPage');
  }

}

@Component({
  selector: 'page-expense-modal',
  templateUrl: 'expense.modal.html'
})

export class ExpenseModalPage{
  expense : Expense;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient, public alertCtrl: AlertController){
    this.expense = this.params.get('expense');
  }

  doEditPrompt(){
    let prompt = this.alertCtrl.create({
      title: 'Edit Expense',
      subTitle: 'Only edit the fields you want to change',
      inputs:[
        {
          name: 'title', placeholder: 'Expense Title'
        },
        {
          name: 'category', placeholder: 'Expense Category'
        },
        {
          name: 'amount', placeholder: 'Price'
        }
      ],
      buttons: [
        {
          text: 'Edit',
          handler: (data: {title, category, amount}) => {
            this.editExpense(data);
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });
    prompt.present();
  }

  private notifyError(msg: string){
    const alert = this.alertCtrl.create({
      title: 'Oh no!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }


  private editExpense(data: any){
    var request = this.constructRequest(data);
    var id = this.expense._id;
    this.http.post(`http://localhost:8080/expenses/expense/${id}`, request).subscribe(res => {
      this.overwriteModel(request);
    });
  }

  private overwriteModel(data){
    for(var key of Object.keys(data)){
      this.expense[key] = data[key];
    }
  }

  private constructRequest(data: any){
    var reqDat = {}; // request data
    if(data.title){
      reqDat['title'] = data.title;
    }
    if(data.category){
      reqDat['category'] = data.category;
    }
    if(data.amount){
      var amount = parseFloat(data.amount);
      if(isNaN(amount)){
        this.notifyError('Amount must be a number.');
        return;
      }
      reqDat['amount'] = amount;
    }
    return reqDat;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}