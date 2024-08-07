import { Router } from 'express'
const router = Router()
const data = 'https://gist.githubusercontent.com/JamSyck/d78d67db1dc7d87e2711baa946a3b5ca/raw/533247d749d4bde8f491041cb072917e61186387/characters.json'

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
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const currentDay = today.getDate()
    listchars.forEach(char => {
        const charMonth = thisMonth[char.birthday.month]
        const charDay = char.birthday.day
        char.isBirthdayToday = (charMonth === currentMonth && charDay === currentDay)
    })
    res.render('home', { listchars })
})

//CHICA
router.get('/character/:id', async (req, res) => {
    const datagirl = await fetch(data)
    const onlygirl = await datagirl.json()
    const infogirl = onlygirl.find(only => only.id === parseInt(req.params.id))
    res.render('character', { infogirl })
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

export default router