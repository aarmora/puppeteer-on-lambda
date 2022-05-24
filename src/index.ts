import chromium from 'chrome-aws-lambda';

export async function handler(event) {
    console.log('Received', event);

    console.log('event query param', event.queryStringParameters?.pizza);

    const title = await run();

    const response = {
        statusCode: 200,
        body: JSON.stringify({ title: title })
    };

    return response;
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

    await browser.close();

    return title;
}