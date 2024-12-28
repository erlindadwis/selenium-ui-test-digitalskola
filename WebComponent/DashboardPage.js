const { By, until } = require('selenium-webdriver')

class DashboardPage {
    constructor(driver){
        this.driver = driver;
    }

    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async addItemToCart(itemName) {
        const xpath = `//button[contains(@id, 'add-to-cart-${itemName.toLowerCase().replace(/\s/g, "-")}')]`;
        await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
        const itemButton = await this.driver.findElement(By.xpath(xpath));
        await itemButton.click();
    }

    async navigateToCart() {
        await this.driver.wait(until.elementLocated(By.className('shopping_cart_link')), 5000);
        const cartIcon = await this.driver.findElement(By.className('shopping_cart_link'));
        await cartIcon.click();
    }

}


module.exports = DashboardPage; 