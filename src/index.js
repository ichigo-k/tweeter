import "dotenv/config"
import express from "express"
import  exports from "./twitterClient.js"
import { CronJob } from "cron"
import prompt from "./aiClient.js"

const app = express()

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running")
})

const tweet = async(message)=>{
    try {
        await exports.twitterClient.v2.tweet(message)
    } catch (error) {
        console.log(error)
    }

}


const cronTweet = new CronJob(process.env.INTERVAL || "0 8 * * *", async () => {
    while (true) {
        try {
            await tweet(await prompt());
            console.log("Tweet sent successfully.");
            break
        } catch (error) {
            console.error("Error occurred while tweeting:", error);
        }
    }
});

// Start the cron job
cronTweet.start();

  
  cronTweet.start();





  