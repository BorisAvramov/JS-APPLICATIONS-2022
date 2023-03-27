// const { chromium } = require('playwright-chromium');
// (async () => {
//   const browser = await chromium.launch({headless: false, slowMo: 2000});
//   const page = await browser.newPage();
//   await page.goto('https://google.com/');
//   await page.screenshot({ path: `example.png` });
//   await browser.close();
// })();


const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const { SlowBuffer } = require('buffer');
let browser, page; // Declare reusable variables
describe('E2E tests', async function() {
     this.timeout(60000);                       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!    TIMEOUT

  before(async () => { browser = await chromium.launch({headless: false, slowMo: 2000}); });
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); }); 

    it ('initial load', async () => {

        await page.goto('http://localhost:5500');

        //  await page.screenshot({path: 'page.png'});

         await page.waitForSelector('.accordion');

        const content =  await page.textContent('#main');
        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('Unix');
        expect(content).to.contains('ALGOL');


    });

    it ('More Button Work', async () => {
        await page.goto('http://localhost:5500');
        await page.waitForSelector('.accordion');
        await page.click('text=More');
        await page.waitForResponse(/articles\/details/g);
        // await page.waitForSelector ('.accordion p');
        const visible = await page.isVisible('.accordion p');
        expect(visible).to.be.true;

        const content = await page.textContent('.accordion p');
        expect(content).to.be.equal('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.');

    });
    it ('Less Button Work', async () => {
        await page.goto('http://localhost:5500');
        await page.waitForSelector('.accordion');
        await page.click('text=More');
        await page.waitForResponse(/articles\/details/g);
        
        await page.waitForSelector ('.accordion p', {state : 'visible'})


        await page.click('text=Less');

        const visible =  await page.isVisible('.accordion p');

        expect(visible).to.be.false;



    });

    it.only ('form input', async () => {

        await page.goto('http://localhost:5500');
        await page.fill('[name="email"]', 'Peter')

        // await page.waitForTimeout(60000);
    });


});
