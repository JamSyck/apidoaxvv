import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import indexRoutes from './routes/index.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))
app.use(indexRoutes)
app.use(express.static(join(__dirname, 'css')))
app.use(express.static(join(__dirname, 'img')))
app.use(express.static(join(__dirname, 'fonts')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running in the port ${PORT}`)
})