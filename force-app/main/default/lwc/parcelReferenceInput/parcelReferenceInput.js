import { LightningElement, api } from 'lwc';
import getReference from'@salesforce/apex/ParcelReferenceInputService.createProduct';

export default class ParcelReferenceInput extends LightningElement {
    @api value = '';

    showErrorText = false;

    handleValueChange(event) {
        this.value = event.target.value;
        this.checkValue();
        this.dispatchValueChangedEvent();
    }

    handleButtonClick(event) {
        getReference()
            .then(result => {
                this.value = result.Name;
                this.dispatchValueChangedEvent();
            })
            .catch(error => {
                this.error = error;
            });
    }

    dispatchValueChangedEvent() {
        this.dispatchEvent(new CustomEvent('valuechanged', { 
            detail: this.value 
        }));
    }

    checkValue() {
        let regExPattern = /^[0-9a-zA-Z]+$/;
        if(!this.value.match(regExPattern)) {
            this.value = this.value.replace(/\W/g, '');
        }
        if (this.value.length > 50) {
            this.value = this.value.slice(0, 50);
            this.showError();
        }
        else {
            this.hideError();
        }
    }

    showError() {
        this.template.querySelector('[data-id="divInputArea"]').className='slds-form-element__control slds-input-has-icon slds-input-has-icon_left slds-has-error';
        this.showErrorText = true;
    }

    hideError() {
        this.template.querySelector('[data-id="divInputArea"]').className='slds-form-element__control slds-input-has-icon slds-input-has-icon_left';
        this.showErrorText = false;
    }


}