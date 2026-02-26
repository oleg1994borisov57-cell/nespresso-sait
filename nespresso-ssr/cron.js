const cron = require("node-cron");
const axios = require("axios");

const startCronJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const createSitemapResponse = await axios.get(
        "http://localhost:3000/api/sitemap"
      );
      const createRoutesFileResponse = await axios.get(
        "http://localhost:3000/api/genpaths"
      );
      console.log(createSitemapResponse.data.message);
      console.log(createRoutesFileResponse.data.message);
    } catch (error) {
      console.error("Error generating sitemap:", error);
    }
  });
};

setTimeout(startCronJob, 10000);
