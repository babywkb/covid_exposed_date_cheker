const fs = require("fs");
const puppeteer = require("puppeteer");

//only for iOS

// scraping hash information form "接触日シート別冊"
puppeteer.launch().then(async (browser) => {
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://datastudio.google.com/u/0/reporting/069598a2-3f01-4b51-b023-cdb478992182/page/blffB",
    { waitUntil: "networkidle2" }
  );

  const hashInfos = await page.evaluate(() => {
    const rows = document.querySelectorAll("div.row");
    const infos = Array.from(rows, (node) => {
      const possibleDate = node.children[3].title;
      const hash = node.children[4].title;
      // hashInfo Type
      return { possibleDate: possibleDate, hash: hash };
    });
    return infos;
  });

  await browser.close();

  // arrage local JSON file
  const myExposureJson = JSON.parse(
    fs.readFileSync(`./data/${process.argv[2]}`, "utf8")
  );
  const myExposureChecks = myExposureJson.ExposureChecks.map((check) => check);

  const hashCompareDates = myExposureChecks.map((check) => {
    const timestamp = check.Timestamp;
    const hashes = check.Files.filter((file) => file.MatchCount > 0).map(
      (file) => file.Hash
    );

    // hashCompareDate Type
    return { timestamp: timestamp, hashes: hashes };
  });

  const result = hashCompareDates.map((compareDate) => {
    const exposures = compareDate.hashes.map((myHash) => {
      const matchInfo = hashInfos.find((info) => myHash === info.hash);
      if (matchInfo) {
        return { 接触候補日: matchInfo.possibleDate, HASH値: myHash };
      }
      return { 接触候補日: " 一致データなし", HASH値: myHash };
    });
    return {
      HASH突合日: compareDate.timestamp,
      接触: exposures,
    };
  });

  console.log(JSON.stringify(result, null, '\t'));
});
