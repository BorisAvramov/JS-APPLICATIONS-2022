const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

describe('Tests', async function(){

    this.timeout(5000);

    let page, browser;

    before(async () => {

        browser = await chromium.launch();
    });
    after(async() => {
        await browser.close();
    });

    beforeEach(async () => {
        page  = await browser.newPage();
    });
    afterEach(async () => {

        await page.close();
    });
    it ('load and displays all books ', async () => {
        // await new Promise (res => setTimeout(res, 2000));
        // expect(1).to.equal(1);

        await page.goto('http://localhost:5500');
        // await page.screenshot({path: 'page.png'});

        await page.click('text = Load All Books');

        await page.waitForSelector('text =Harry Poter');

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));

        expect(rows[1]).to.contains('Harry Potter');
        expect(rows[2]).to.contains('C# Fundamentals');
     

    });
    it('CREATE BOOK', async () => {
        await page.goto('http://localhost:5500');

        await page.fill('form#createForm >> input[name = "title"]', 'Totle Movie')
        await page.fill('form#createForm >> input[name = "title"]', 'Totle Movie')

        const [request] = await Promise.all ([

            page.waitForRequest(request => request.method() == 'POST' ),
            page.click ('form#createForm >> text=Submit')


        ])
        const data = JSON.parse(request.postData);
    });

   

});
