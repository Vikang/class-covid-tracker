const express = require('express') //variable called express, requiring express middleware
const app = express()

app.get('/', (req, res)=> {
    res.send("hello world");
})

app.listen(3001, () => {
    console.log("running on port 3001");
});