import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dialogflow from 'dialogflow'
import { WebhookClient } from 'dialogflow-fulfillment'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendStatus(200);
});

const pluck = (arr) => {
    const min = 0;
    const max = arr.length - 1;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return arr[randomNumber]
}

app.get("/ping", (req, res) => {
    res.send("ping back");
})

const port = process.env.PORT || 5001;


/*---------------------APIs--------------------------*/

app.post('/webhook', async (req, res) => {

    try {
        const body = req.body;

        const intentName = body.queryResult.intent.displayName
        const params = body.queryResult.parameters

        switch (intentName) {
            case "Default Welcome Intent": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Hello There, Welcome to SAF Collegiate. How can I help you?"
                                ]
                            }
                        }
                    ]
                })
                break;
            }
            case "About": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "SAF Collegiate is a leading educational institution in Pakistan. It is a part of the SAF Group of Companies, which is a leading conglomerate in Pakistan. SAF Collegiate is a leading educational institution in Pakistan. It is a part of the SAF Group of Companies, which is a leading conglomerate in Pakistan."
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            case "Default Fallback Intent": {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Sorry, I didn't get that. Please try again or contact us at 0300-1234567"
                                ]
                            }
                        }
                    ]
                })
                break;
            }

            default: {
                res.send({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "Sorry, I didn't get that. Please try again"
                                ]
                            }
                        }
                    ]
                })
            }
        }

    }
    catch (err) {
        console.log(err);
        res.send({
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            "something is wrong in server, please try again"
                        ]
                    }
                }
            ]
        })
    }

});


/*---------------------Static Files--------------------------*/

const __dirname = path.resolve();
app.get('/', express.static(path.join(__dirname, "/Web/index.html")));
app.use('/', express.static(path.join(__dirname, "/Web")));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})