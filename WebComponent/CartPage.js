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

    async navigateToCart() {
        const cartButton = await this.driver.findElement({ css: '.shopping_cart_link' });
        await cartButton.click();
    }
    
    async proceedToCheckout() {
        const checkoutButton = await this.driver.findElement({ css: '.checkout_button' });
        await checkoutButton.click();
    }    
}

module.exports = CartPage;