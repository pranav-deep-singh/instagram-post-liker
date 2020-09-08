let puppeteer = require("puppeteer");
let fs = require("fs");
let noOfPost = process.argv[2];
(async function(){

    let data = await fs.promises.readFile("credentials.json","utf-8");
    let credentials = JSON.parse(data);
        Username = credentials.Username;
        pwd = credentials.pwd;


    let browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized","--disable-infobars","--disable-notifications"]
    });
    let numberofpages = await browser.pages();
    let tab = numberofpages[0];

    await tab.goto("http://www.instgram.com",
    {
        waitUntil:"networkidle0"
    });
    console.log("page opened");

    await tab.waitForSelector("input[name='username']")
    // await tab.click("input[name='username']")
    await tab.type("input[name='username']",Username,{delay:100})

    await tab.waitForSelector("input[name='password']")
    await tab.type("input[name='password']",pwd,{delay:100})

    await tab.waitForSelector(".sqdOP.L3NKy.y3zKF")
    await Promise.all([tab.waitForNavigation({
        waitUntil:"networkidle2"
    }),tab.click(".sqdOP.L3NKy.y3zKF")])

    await tab.waitForSelector(".XTCLo.x3qfX")
    await tab.type(".XTCLo.x3qfX","pepper_pepcoding")

    await tab.waitForSelector(".fuqBx a")

    await Promise.all([tab.waitForNavigation({
        waitUntil:"networkidle2"
    }),tab.click(".fuqBx a")])

    await tab.waitForSelector(".u7YqG",{visible:true})
    await Promise.all([tab.waitForNavigation({
        waitUntil:"networkidle2"
    }),tab.click(".u7YqG")])

    let i = 0;

    do{
        await tab.waitForSelector(".fr66n ._8-yf5",{visible:true})
        await tab.click(".fr66n ._8-yf5")
        await tab.waitForSelector("._65Bje.coreSpriteRightPaginationArrow",{visible:true})

        await Promise.all([tab.waitForNavigation({
            waitUntil:"networkidle2",
            timeout:30000
        }),tab.click("._65Bje.coreSpriteRightPaginationArrow")])

    }while( i < noOfPost ){

    }

})()