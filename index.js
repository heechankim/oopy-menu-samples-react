import {Client} from "@notionhq/client"
import express from "express"

const app = express()

const token = process.env.chan_token
const databaseId = "d4dc2f06f58a4e1e8a28a8ecf7ef7541"

const notion = new Client({auth: token})

function simpleQuery() {
    try {
        const response = notion.databases.query({
            database_id: databaseId,
            "sorts": [
                {
                    "property": "ORDER",
                    "direction": "ascending"
                }
            ]
        })
        return response;
    }
    catch(e) {
        console.error(e.message)
        return undefined
    }
}

app.get('/', function (req, res) {

    let datas = []
    simpleQuery().then(function (response) {
        response.results.forEach((item) => {
            console.log(item.properties.TABLENAME.title[0].text.content)
            //datas.push(item.properties.tableName.title[0].plain_text)
        })
        res.status(200).send(datas);
    })
})

var server = app.listen(3000, function() {
    let port = server.address().port
    console.log('Server is working : Port - ', port)
})