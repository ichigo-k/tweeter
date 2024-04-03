import { GoogleGenerativeAI } from "@google/generative-ai"
const client = new GoogleGenerativeAI(process.env.AI_API_KEY)


const prompt = async ()=>{
    try {
      
      const model = client.getGenerativeModel({model:"gemini-pro"})
      const prompt = "Hello write a good morning message for me. it is going to be posted on twitter. the quote should be about programming and should adddress devs please you can also add some emojis where needed. also in english and needed tags to make it viral. Also it should not be too long it should meet twitter required lenght that is less that 280 characters."

      const result = await model.generateContent(prompt)
      const response = result.response
      const text = response.text()

      return text

    } catch (error) {
      console.log(error)
    }
}

export default prompt