const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sjkucjd.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://TechTronix:mgm4nj5TEfg0mSkg@cluster0.sjkucjd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const servicesCollection = client.db('TechTronix').collection('services');
    const allReviews = client.db('TechTronix').collection('reviews');
    try {
        // display all services 
        app.get('/services', async (req, res) => {
            const services = await servicesCollection.find().toArray();
            res.send(services);
        })

        // display specific service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query);
            res.send(service);
        })

        // DISPLAY ALL REVIEWS 
        app.get('/reviews', async (req, res) => {
            const reviews = await allReviews.find().toArray();
            res.send(reviews);
        })

        app.post('/reviews', async (req, res) => {
            const newReviewData = req.body;
            console.log(newReviewData);
            const query = {
                name: newReviewData.name,
                profession: newReviewData.profession,
                rating: newReviewData.rating,
                review: newReviewData.review,
            }
            const result = await allReviews.insertOne(query);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        })
        await client.connect();
    } finally {
    }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send(`
    <h1>সব ঠিক ঠাক</h1>
    `)
})

app.listen(port, () => {
    console.log('Alhamdulillah, All Good at ==>', port);
})
