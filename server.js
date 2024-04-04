const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://kumarvinay86618:Qwzx12,.@cluster0.t4qkgz9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connection;
db.on('error',console.error.bind(console,"error connection: "));
db.once('open',()=>{console.log("connection is successful")});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT ||3000,function(){
  console.log("\n'server started'");
});
