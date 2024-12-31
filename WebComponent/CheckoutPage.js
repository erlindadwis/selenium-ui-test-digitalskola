const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
    }

    async enterCheckoutDetails(firstName, lastName, postalCode) {
        await this.driver.findElement({ id: 'first-name' }).sendKeys(firstName);
        await this.driver.findElement({ id: 'last-name' }).sendKeys(lastName);
        await this.driver.findElement({ id: 'postal-code' }).sendKeys(postalCode);
        await this.driver.findElement({ id: 'continue' }).click();
    }

    async finishCheckout() {
        await this.driver.findElement({ id: 'finish' }).click();
    }

    async getConfirmationMessage() {
        return await this.driver.findElement({ className: 'complete-header '}).getText();
    }
}

module.exports = CheckoutPage;