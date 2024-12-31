const { By, until } = require('selenium-webdriver')

class DashboardPage {
    constructor(driver){
        this.driver = driver;
    }

    async getDashboardTitle() {
        const titleLocator = By.css('span.title');
        await this.driver.wait(until.elementLocated(titleLocator), 15000);
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(titleLocator)), 5000);
        const titleElement = await this.driver.findElement(By.xpath("//span[text()='Products']"));
        const titleText = (await titleElement.getText()).trim();
        return titleText;
    }

    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();    
    }

    async addItemToCart(itemName) {
        const formattedItemName = itemName.toLowerCase().replace(/\s/g, "-");
        const xpath = `//button[contains(@id, 'add-to-cart-${formattedItemName}')]`;

        await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);

        const itemButton = await this.driver.findElement(By.xpath(xpath));
        if (await itemButton.isDisplayed()) {
            await itemButton.click();
        } else {
        }
    }

    async navigateToCart() {
        await this.driver.wait(until.elementLocated(By.className('shopping_cart_link')), 10000);
        const cartIcon = await this.driver.findElement(By.className('shopping_cart_link'));
        await cartIcon.click();
    }

}


module.exports = DashboardPage; 