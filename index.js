const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const checkParamMiddleware = (req, res, next) => {
  if (!req.query.age) return res.redirect('/')

  return next()
}

app.get('/', (req, res) => {
  return res.render('home')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.get('/major', checkParamMiddleware, (req, res) => {
  const message = `Você é maior de idade e possui ${req.query.age} anos.`
  return res.render('age', { message })
})

app.get('/minor', checkParamMiddleware, (req, res) => {
  const message = `Você é menor de idade e possui ${req.query.age} anos.`
  return res.render('age', { message })
})

app.listen(3000)
