import { getFollewers, getFollowing} from "./lib/scraper";
const {MongoClient} = require('mongodb');
    
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const mongoURL = "mongodb+srv://hakanyalcin:111749Abc@cluster0.p7ext.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



async function addUser(client){
    const db = client.db("instagramdb");
    const followersData = await getFollewers();
    for (const user of followersData) {
        const followersElement = await db.collection("followers").insertOne(user);
    }
    console.log("followers writing on db: OK");

    ///////////////////////////////////// 
    await sleep(Math.random()*20000);

    const followingData = await getFollowing();
    for (const user of followingData) {
        const followingElement = await db.collection("following").insertOne(user);
    }
    console.log("following writing on db: OK");


    return;
}

async function compareCollection(client){
    const db = client.db("testdb");

    var followersArr =  await db.collection('followers').find({}, {username: 1 }).toArray();;
    var followingArr =  await db.collection('following').find({}, {username: 1 }).toArray();

    var diff = followingArr.filter(function(o1){
        return !followersArr.some(function(o2){
            return o1.username === o2.username; 
        });      
    });
    for (const elem of diff) {
           const basterd = await db.collection("followingButNotFollowers").insertOne(elem);
    }
    console.log("I followed them but they are not following me: OK");
}

  
  const dbConnection = async function() {
    const client = await MongoClient.connect(mongoURL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }); 

    compareCollection(client);
    //addUser(client);
    console.log("tasks are finished...");
  }
  
  dbConnection();
