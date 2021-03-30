import { LightningElement, track } from 'lwc';
export default class CountOfExpryDate extends LightningElement {
    @track inputdate;
    @track expiryDate;
    datehandler(event) {
        this.inputdate = new Date(event.target.value);
        console.log(event.target.value);
    }
    
    currenthandler() {
        this.hour = this.inputdate.getHours();
        this.currdate = new Date();
        this.calcdate = this.inputdate.getDate()-this.currdate.getDate();
        this.timedifference = Math.abs(this.inputdate.getTime() - this.currdate.getTime());
        this.hourDifference =Math.floor(this.timedifference  / 1000 / 3600);
        if( this.hourDifference < 23)
        {
            this.expiryDate = this.hourDifference + ' hrs left';
        }
        else if(this.calcdate > 0)
        {
            this.expiryDate = this.calcdate + 'days left';
        }
        else if(this.calcdate < 0){
            this.expiryDate = 'expired';
        }
        console.log(this.expiryDate);
    }
}