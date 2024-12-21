const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLoginTest() {
    // Membuat koneksi dengan browser driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://www.saucedemo.com");

       //Masukan Username dan Password
       await driver.findElement(By.id('user-name')).sendKeys('standard_user');
       await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

       //Click Button Login
       await driver.findElement(By.xpath("//input[@id='login-button']")).click();

       //Memastikan kita di dashboard dengan mencari Judul "Swag Labs"
       let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
       assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

       //Memastikan kita di dashboard dengan mencari "Burger button"
       let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
       assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");


    } finally {
        await driver.quit();
    }
}


sauceDemoLoginTest();