import chromium from 'chrome-aws-lambda';

exports.handler = async function () {
    await run();

    return;
}

export async function run() {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    console.log('Before going to jswebscrapingguy');
    await page.goto('https://javascriptwebscrapingguy.com/');
    let title = await page.$eval('title', element => element.textContent);

    console.log('First title', title);

    await page.click('.entry-title');

    title = await page.$eval('title', element => element.textContent);

    console.log('Second title', title);

    await browser.close();
}