const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartItems = By.css('.cart_item');
    }

    async getCartItems() {
        const cartItems = await this.driver.findElements(By.className('inventory_item_name'));
        const itemNames = [];
        for (let item of cartItems) {
            itemNames.push(await item.getText());
        }
        return itemNames;
    }
}

module.exports = CartPage;