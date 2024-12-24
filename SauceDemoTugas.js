const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

async function SauceDemoTugas() {
    // Membuat koneksi dengan browser driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log("Navigating to SauceDemo...");
        await driver.get("https://www.saucedemo.com");

       //Masukan Username dan Password
       console.log("Entering username and password...");
       await driver.findElement(By.id('user-name')).sendKeys('standard_user');
       await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

       //Click Button Login
       console.log("Clicking login button...");
       await driver.findElement(By.xpath("//input[@id='login-button']")).click();

       //Memastikan kita di dashboard dengan mencari Judul "Swag Labs"
       let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
       assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

       //Memastikan kita di dashboard dengan mencari "Burger button"
       let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
       assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        //Menambahkan barang ke dalam keranjang
        console.log("Item successfully added to cart");
        await driver.findElement(By.id('add-to-cart-sauce-labs-onesie')).click();

        //Memastikan berang berhasil ditambahkan ke dalam keranjang
        console.log("Item in the cart match those added");
        let cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
        assert.strictEqual(cartBadge, '1', 'Item was not added to the cart successfully');
        

    } finally {
        await driver.quit();
    }
}


SauceDemoTugas();