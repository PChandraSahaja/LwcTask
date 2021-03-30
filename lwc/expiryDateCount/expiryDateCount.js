import { LightningElement, api, wire} from 'lwc';
import getData from '@salesforce/apex/expiryDateCount.getData';
export default class expiryDateCount extends LightningElement {
    @api recordId;
    @api message;
    @api showExpiry= false;
    @wire(getData,{ recordId: '$recordId' })
    //wiredRecordsMethod({ error, data })
    datehandler(event) {
        this.inputdate = new Date(event.target.value);
        console.log(event.target.value);
    }
        currenthandler(){
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
