const { MongoClient } = require('mongodb');
const { OpenAIAPI } = require('openai');


const mongoUrl = ' ';

const dbName = 'ProductListing';

const collectionName = 'products';


const openaiApiKey = '';


const mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });


// Create OpenAI API client
const openai = new OpenAIAPI({ key: openaiApiKey });




// Function to insert a document into MongoDB
async function insertDocument(product) {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(product);
  } finally {
    await mongoClient.close();
  }
}


//retrives products based on date
getproduct = async()=> {
    try {
      await mongoClient.connect();
      const db = mongoClient.db(dbName);
      const collection = db.collection(collectionName);
      await collection.find({date})
    } finally {
      await mongoClient.close();
    }
  }



//Calling ChatGPT
async function chatWithGPT(prompt) {
  try {
    const response = await openai.complete({
      model: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 150, 
    });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error interacting with ChatGPT:', error.message);
    throw error;
  }
}


async function main() {


    
    { getproducts.map((items)=>{
        const userQuery = {items,title};})
    }

 //chatgpt 
  const gptResponse = await chatWithGPT(userQuery);

  // Save the conversation in MongoDB
  const conversation = {
    userQuery: userQuery,
    gptResponse: gptResponse,
    timestamp: new Date(),
  };

  await insertDocument(conversation);

  console.log(conversation);
}


main();
