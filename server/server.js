const express = require('express')
const app = express()

const PORT = 7878

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

///////////////////

let objectURL = {
    mdn: [['ссылка на mdn 1', 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce'],['ссылка на mdn 2', 'https://developer.mozilla.org/ru/docs/Learn/JavaScript/Objects/Object_prototypes'],['ссылка на mdn 3', 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/new']],
    learn: [['ссылка на learn javascript 1', 'https://learn.javascript.ru/event-loop'],['ссылка на learn javascript 2', 'https://learn.javascript.ru/prototype-inheritance'],['ссылка на learn javascript 3', 'https://learn.javascript.ru/arrow-functions-basics']],
    node: [['ссылка на stack dev to 1', 'https://nodejsdev.ru/'],['ссылка на stack dev to 2', 'https://nodejsdev.ru/api/buffer/'],['ссылка на stack dev to 3', 'https://nodejsdev.ru/api/readline/']],
    noLink: [['для этого ссылка не была создана', 'error! no link!']]
}

const keyWords = ['mdn', 'learn', 'node']

///////////////////

app.get('/', (req, res) => {
    // console.log('request!')
    res.send(`app is running on port ${PORT}!!!`)
})

app.post('/', (req,res)=>{
    let sentWord = req.body.text    
    if(keyWords.includes(sentWord)){
        // console.log('the word that was sent here:', sentWord)
        // console.log('the length of this word:', sentWord.length)
        
        for(let i of Object.entries(objectURL)){
            // console.log(i)
            // console.log(i[0])
            // console.log(i[1])
            if(i[0] == sentWord){
                // console.log(i[1])
                res.send({
                    'links': i[1]
                })
                break
            }
        }
    } else {
        res.send({
            'links': objectURL.noLink
        })
    }

})

app.post('/links', (req,res)=>{
    // console.log(req.body)
    // res.send({"result":req.body})

    // console.log(req.body.text)
    var request = require('request');

    var URL = req.body.text;
    request(URL, function (err, resp, body) {
        if (err) throw err;
        // console.log(body);
        // console.log(res.statusCode);
        // return {"result": JSON.stringify(body)}
        res.send({"result": body})

    });
// console.log(rest)
// res.send({"result": rest})
})


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})