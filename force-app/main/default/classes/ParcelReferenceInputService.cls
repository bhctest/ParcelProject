public with sharing class ParcelReferenceInputService {

    @AuraEnabled
    public static Product2 createProduct() {
        Product2 product = new Product2();
        product.Name = generateUniqueName();
        insert product;

        return product;
    }

    //Creates alphanumeric unique string(length=32)
    public static String generateUniqueName() {
        Blob aesKey = Crypto.GenerateAESKey(128);
        return  EncodingUtil.ConvertTohex(aesKey);
    }
}