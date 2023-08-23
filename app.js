const express = require('express')
const app = express()
const port = 3000


var typeorm = require("typeorm")
var config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [require("./entity/Post"), require("./entity/Category")],
}

var dataSource = new typeorm.DataSource(config)

// dataSource
//     .initialize()
//     .then(function () {
//        console.log('ket noi thanh cong db')
//     })
//     .catch(function (error) {
//         console.log("Error: ", error)
//     })


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/save', (req, res) => {
  var category1 = {
    name: "TypeScript",
}
var category2 = {
    name: "Programming",
}

var post = {
    title: "Control flow based type analysis",
    text: "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.",
    categories: [category1, category2],
}

var postRepository = dataSource.getRepository("Post")
postRepository
    .save(post)
    .then(function (savedPost) {
        console.log("Post has been saved: ", savedPost)
        console.log("Now lets load all posts: ")

        return postRepository.find()
    })
    .then(function (allPosts) {
        console.log("All posts: ", allPosts)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})