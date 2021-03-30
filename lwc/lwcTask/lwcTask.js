import { LightningElement, wire, api, track } from 'lwc';
import getData from '@salesforce/apex/lwcTask.getData';
//import LOCALE from '@salesforce/i18n/locale';

export default class lwcTask extends LightningElement {

    @api recordId;
    @api error;
    @api jsondata;
    @api message="This record will be expired in";
    @track showtime;
    @api expiry;
    @track Name;

    @wire( getData,{recId: '$recordId'} )  
    wiredAccount( { error, data } ) {
        if ( data ) {
            this.jsonData = data;
            this.error = undefined;
            var obj = JSON.parse(data);
            var timelong = obj.Expiry_Date__c;         
            var date = timelong.slice(0, -18);
            var time = timelong.slice(11, -5);
            var endtime = date.toString() + ' ' + time.toString();
            var total = Date.parse(endtime) - Date.parse(new Date()); 
            total = total + 19800000; 
            let myparam = this; 
            if (total < 0) 
            {
                window.clearInterval(this.timeInstance);
                this.showtime = 'Expired';
                this.expiry = true;
            }
            else 
            {
                this.timeInstance = setInterval(function () 
                {
                    var seconds = Math.floor((total / 1000) % 60);
                    // window.console.log('seconds ' + seconds);

                    var minutes = Math.floor((total / 1000 / 60) % 60);
                    // window.console.log('minutes ' + minutes);

                    var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
                    // window.console.log('hours ' + hours);

                    var days = Math.floor(total / (1000 * 60 * 60 * 24));
                    // window.console.log('days ' + days);
                    // output the result
                    var timeString = days.toLocaleString() + ' Days : ' + hours.toLocaleString() + ' Hours : ' + minutes.toLocaleString() + ' Minutes : ' + seconds.toLocaleString() + ' Seconds';

                    myparam.showtime = timeString;

                    total = total - 1000;

                }, 1000);
            }

        } else if (error) 
        {
            console.log('error ', error);
            this.error = error;
            console.log('this.error: ', this.error);
            this.jsonData = undefined;
            console.log('this.jsonData : ', this.jsonData);
        }

            /** let rows = JSON.parse( JSON.stringify( data ) );
            console.log( 'Rows are ' + JSON.stringify( rows ) );
            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false
              };
                
            for ( let i = 0; i < rows.length; i++ ) {  

                let dataParse = rows[ i ];

                if ( dataParse.Effective_Date__c ) {
                    
                    let dt = new Date( dataParse.Effective_Date__c );
                    dataParse.Effective_Date__c = new Intl.DateTimeFormat( 'en-US' ).format( dt );
                
                }

                if ( dataParse.CreatedDate ) {
                    
                    let dt = new Date( dataParse.CreatedDate );
                    dataParse.CreatedDate = new Intl.DateTimeFormat( 'en-US', options ).format( dt );
                
                }

            }
                
            this.records = rows;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.records = undefined;

        } **/
    }  

}
