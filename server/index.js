const express = require('express') //variable called express, requiring express middleware
const app = express()
var cors = require('cors')

app.use(cors());
app.get('/', (req, res)=> {
    res.send("hello world");
})
app.get('/bruh', (req, res)=> {
    res.send("hasdfd");
})

app.listen(3001, () => {
    console.log("running on port 3001");
});