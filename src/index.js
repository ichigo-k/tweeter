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


const cronTweet = new CronJob("0 8 * * *", async () => {
    try {
        tweet( await prompt())
        console.log("sent ...")
    } catch (error) {
        try {
            tweet( await prompt())
            console.log("sent ...")
        } catch (error) {
            console.log(error)
        }
        console.log(error)
    }
  });
  
  cronTweet.start();





  