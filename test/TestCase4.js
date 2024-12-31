const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const assert = require('assert');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

describe('ValidateItemAddedToCart', function () {
    this.timeout(50000);
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser(browser || 'chrome').build();
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    it('Item "Sauce Labs Backpack" should be added to the cart successfully', async function () {
        const dashboardPage = new DashboardPage(driver);
        const cartPage = new CartPage(driver);

        try {
            await dashboardPage.addItemToCart('Sauce Labs Backpack');

            await dashboardPage.navigateToCart();

            const itemsInCart = await cartPage.getCartItems();

            assert.strictEqual(itemsInCart.includes('Sauce Labs Backpack'), true, 'Item was not added to the cart');
        } catch (error) {
            throw error;
        }
    });

    after(async function () {
        await driver.quit();
    });
});
