import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import indexRoutes from './routes/index.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))
app.use(indexRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})