import { Router } from 'express'
const router = Router()
const data = 'https://gist.githubusercontent.com/JamSyck/d78d67db1dc7d87e2711baa946a3b5ca/raw/ae1ad72d8b3ef21d651365bda649089e7c7185ad/characters.json'

const thisMonth = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
}

//INICIO
router.get('/', async (req, res) => {
    const datachars = await fetch(data)
    const listchars = await datachars.json()
    const getRandomChars = (arr, num) => {
        const shuffled = arr.sort(() => 0.5 - Math.random())
        return shuffled.slice(0, num)
    }
    const randomChars = getRandomChars(listchars, 6)
    res.render('home', { listchars: randomChars })
})

//LISTA
router.get('/characters', async (req, res) => {
    const datachars = await fetch(data)
    const listchars = await datachars.json()
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const currentDay = today.getDate()
    listchars.forEach(char => {
        const charMonth = thisMonth[char.birthday.month]
        const charDay = char.birthday.day
        char.isBirthdayToday = (charMonth === currentMonth && charDay === currentDay)
    })
    res.render('characters', { listchars })
})

//CHICA
router.get('/character/:id', async (req, res) => {
    try {
        const datagirl = await fetch(data)
        const onlygirl = await datagirl.json()
        const infogirl = onlygirl.find(only => only.id === parseInt(req.params.id))
        if (infogirl) {
            res.render('girl', { infogirl })
        } else {
            res.status(404).render('error404', { id: req.params.id })
        }
    } catch (err) {
        res.status(500).json({ err: "Failed to fetch character" })
    }
})

//DOCUMENTACION
router.get('/documentation', async (req, res) => {
    const datagirls = await fetch(data)
    const listgirls = await datagirls.json()
    res.render('documentation', { listgirls })
})

//SOBRE
router.get('/about', (req, res) => {
    res.render('about')
})

//API
router.get('/api/characters', async (req, res) => {
    try {
        const response = await fetch(data)
        const characters = await response.json()
        res.json(characters)
    } catch (error) {
        console.error('Error fetching characters:', error)
        res.status(500).json({ error: 'Failed to fetch characters' })
    }
})

router.get('/api/character/:id', async (req, res) => {
    try {
        const list = await fetch(data)
        const info = await list.json()
        const girl = info.find(char => char.id === parseInt(req.params.id))
        if (girl) {
            res.json(girl)
        } else {
            res.status(404).json({ error: 'Character not found' })
        }
    } catch (error) {
        console.error('Error fetching character:', error)
        res.status(500).json({ error: 'Failed to fetch character' })
    }
})

//ERROR 404
router.use((req, res, next) => {
    res.status(404).render('error404')
})

export default router
