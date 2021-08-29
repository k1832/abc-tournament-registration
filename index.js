const fs = require("fs");
const {exit} = require("process");
require("dotenv").config();
const puppeteer = require("puppeteer");

if (!fs.existsSync(".env")) {
    console.log(".env ファイルを用意してください。");
    exit();
}

// get user info from env file
const ATCODER_ID = process.env.ATCODER_ID;
const ATCODER_PASSWORD = process.env.ATCODER_PASSWORD;

if (ATCODER_ID == "YourIDHere" || ATCODER_PASSWORD == "YourPasswordHere") {
    console.log(".env の内容を自分のIDとパスワードに変更してください。");
    exit();
}

let BROWSER;

const VIEWPORT = {
    width: 1280,
    height: 1024,
};

const selector = {
    atcoder_tournament: {
        idInputForm: ".MuiInputBase-input.MuiOutlinedInput-input",
        registerButton: "button.MuiButtonBase-root",
        temporaryAffiliationCode: "code"
    },
    atcoder: {
        affiliationForm: "input#ui\\.Affiliation",
        usernameForm: "input#username",
        passwordForm: "input#password",
        loginButton: "button#submit",
        updateButton: "button#submit"
    },
};

(async () => {
    // open registration form
    const options = {
        headless: false,
        slowMo: 20,
    };
    BROWSER = await puppeteer.launch(options);
    const abcTournamentPage = await BROWSER.newPage();
    await abcTournamentPage.setViewport({
        width: VIEWPORT.width,
        height: VIEWPORT.height,
    });
    const abcTournamentUrl = "https://abc.kenkoooo.com/#/register";
    await abcTournamentPage.goto(abcTournamentUrl, {waitUntil: "domcontentloaded"});

    // registration
    await typeTextWithSelector(abcTournamentPage, selector.atcoder_tournament.idInputForm, ATCODER_ID);
    await clickWithSelector(abcTournamentPage, selector.atcoder_tournament.registerButton, false);

    // get temporary affiliation
    const tempAffiliation = await getTextWithSelector(abcTournamentPage, selector.atcoder_tournament.temporaryAffiliationCode);

    // open atcoder setting page
    const atcoderPage = await BROWSER.newPage();
    await atcoderPage.setViewport({
        width: VIEWPORT.width,
        height: VIEWPORT.height,
    });
    const atcoderUrl = "https://atcoder.jp/settings";
    await atcoderPage.goto(atcoderUrl, {waitUntil: "domcontentloaded"});

    // login to atcoder
    await typeTextWithSelector(atcoderPage, selector.atcoder.usernameForm, ATCODER_ID);
    await typeTextWithSelector(atcoderPage, selector.atcoder.passwordForm, ATCODER_PASSWORD);
    await clickWithSelector(atcoderPage, selector.atcoder.loginButton);

    // get current (original) affiliation
    const originalAffiliation = await getInputFormTextWithSelector(atcoderPage, selector.atcoder.affiliationForm);

    // change affiliation to temporary one
    await clearInputFormTextWithSelector(atcoderPage, selector.atcoder.affiliationForm);
    await typeTextWithSelector(atcoderPage, selector.atcoder.affiliationForm, tempAffiliation);
    await clickWithSelector(atcoderPage, selector.atcoder.updateButton);

    // confirm temporary affiliation in abc tournament
    await abcTournamentPage.bringToFront();
    await clickWithSelector(abcTournamentPage, selector.atcoder_tournament.registerButton, false);
    // TODO: add wait for confirmation

    await abcTournamentPage.waitFor(3000);

    // restore original affiliation
    await atcoderPage.bringToFront();
    await clearInputFormTextWithSelector(atcoderPage, selector.atcoder.affiliationForm);
    await typeTextWithSelector(atcoderPage, selector.atcoder.affiliationForm, originalAffiliation);
    await clickWithSelector(atcoderPage, selector.atcoder.updateButton);

    // wait for 3 sec for no reason
    await atcoderPage.waitFor(3000);


    BROWSER.close();
})();

async function getTextWithSelector(page, selector) {
    const element = await page.waitForSelector(selector, {visible: true});
    let text = "";
    if (element) {
        text = await (await element.getProperty("textContent")).jsonValue();
        text = text.replace(/[\s　]/g, "");
    }
    return text;
}

async function getInputFormTextWithSelector(page, selector) {
    const elm = await page.waitForSelector(selector);
    return await elm.evaluate((input) => input.value);
}

async function clearInputFormTextWithSelector(page, selector) {
    const elm = await page.waitForSelector(selector);
    await elm.evaluate((input) => input.value = "");
}

async function typeTextWithSelector(page, selector, text) {
    const elm = await page.waitForSelector(selector);
    await elm.type(text);
}

async function clickWithSelector(page, selector, withWait = true) {
    const elm = await page.waitForSelector(selector);
    if (withWait) {
        await Promise.all([
            page.waitForNavigation(),
            elm.click(),
        ]);
    } else {
        await elm.click();
    }
}
