const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const CheckoutPage = require('../WebComponent/CheckoutPage');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { log } = require('console');
require('dotenv').config();

const browser = process.env.BROWSER || 'firefox';
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

describe('TestCase5', function () {
    this.timeout(50000);
    let driver;

    before(async function () {
        if (browser === 'chrome') {
            driver = await new Builder().forBrowser('chrome').build();
        } else if (browser === 'firefox') {
            driver = await new Builder().forBrowser('firefox').build();
        } else {
            throw new Error('Browser not supported. Please choose either chrome or firefox');
        }
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    async function captureScreenshot(testName, type = 'Error') {
        const screenshotPath = ('./screenshots');
        if (!fs.existsSync(screenshotPath)) {
            fs.mkdirSync(screenshotPath);
        }
        const screenshot = await driver.takeScreenshot();
        const filePath = path.join(screenshotPath, `${testName}-${type}-${Date.now()}.png`);
        fs.writeFileSync(filePath, screenshot, 'base64');
    }

    it('Login successfully and verify dashboard', async function () {
        try {
            const dashboardPage = new DashboardPage(driver);
            const actualTitle = await dashboardPage.getDashboardTitle();
    
            assert.strictEqual(actualTitle, 'Products', `Expected dashboard title to be Products`);
    
            // Ambil screenshot untuk keberhasilan setelah assert
            await captureScreenshot('Login', 'Success');
        } catch (error) {
            // Ambil screenshot untuk error jika tes gagal
            await captureScreenshot('Login', 'Error');
            throw error; // Lempar error untuk memberi tahu bahwa tes gagal
        }
    });
    
    it('Error message appears for invalid credentials', async function () {
        try {
            const loginPage = new LoginPage(driver);
            await loginPage.navigate(baseUrl);
            await loginPage.login('haha', 'ahohoy');
    
            const errorMessage = await loginPage.getErrorMessage();
            assert.strictEqual(
                errorMessage,
                'Epic sadface: Username and password do not match any user in this service',
                'Expected error message does not match'
            );
    
            // Screenshot hanya untuk kondisi kesalahan (error)
            await captureScreenshot('LoginError', 'Success');
        } catch (error) {
            // Screenshot jika ada error
            await captureScreenshot('LoginError', 'Error');
            throw error;
        }
    });
    
    it('Item can be added to the cart successfully', async function () {
        try {
            const dashboardPage = new DashboardPage(driver);
            const cartPage = new CartPage(driver);
    
            await dashboardPage.addItemToCart('Sauce Labs Backpack');
            await dashboardPage.navigateToCart();
    
            const itemsInCart = await cartPage.getCartItems();
            assert.strictEqual(itemsInCart.includes('Sauce Labs Backpack'), true, 'Item was not added to the cart');
    
            // Ambil screenshot jika item berhasil ditambahkan ke keranjang
            await captureScreenshot('AddToCart', 'Success');
        } catch (error) {
            // Ambil screenshot jika terjadi kesalahan saat menambahkan item ke keranjang
            await captureScreenshot('AddToCart', 'Error');
            throw error;
        }
    });
    
    it('Checkout flow should complete successfully', async function () {
        try {
            const cartPage = new CartPage(driver);
            const checkoutPage = new CheckoutPage(driver);
    
            await cartPage.navigateToCart();
            await cartPage.proceedToCheckout();
    
            await checkoutPage.enterCheckoutDetails('Elin', 'Safitri', '17122');
            await checkoutPage.finishCheckout();
    
            const confirmationMessage = await checkoutPage.getConfirmationMessage();
            assert.strictEqual(confirmationMessage, 'Thank you for your order!', 'Checkout was not successful');
    
            // Ambil screenshot jika checkout berhasil
            await captureScreenshot('Checkout', 'Success');
        } catch (error) {
            // Ambil screenshot jika checkout gagal
            await captureScreenshot('Checkout', 'Error');
            throw error;
        }
    });
        

    after(async function () {
        await driver.quit();
    });
});