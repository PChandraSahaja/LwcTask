public with sharing class expiryDateCount{
    @AuraEnabled(cacheable=true)
    public static String getData(Id recordId){
        Schema.SObjectType sObjectType = recordId.getSObjectType();
        String objType = String.valueOf(sObjectType);
        System.debug('objType'+objType);
        try 
        {
            String query = 'SELECT Expiry_Date__c FROM '+ objType +' WHERE Id=' + '\'' + recordId + '\'' + ' Limit 1';
            SObject records = Database.query( query );
            String str = JSON.serialize(records);
            return str;

        } catch(Exception e) 
        {
            System.debug(e);
            return 'Error';
        }
    }
}