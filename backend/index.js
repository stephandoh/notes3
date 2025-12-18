const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'HTML is easy3',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript3',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol3',
    important: true
  }
]

//root
app.get('/', (req,res) => {
    res.send('<h1>Welcome to Notes API</h1>')
})

//get all notes
app.get('/api/notes', (req, res) => { //define route
    res.json(notes)
})

//add a note
app.post('/api/notes', (req,res) =>{
    const body = req.body //read what user wants to create

    if(!body.content) { //means if there is no data typed
        return res.status(400).json({ //respond with HTTP 400 (Bad Request)
            error: 'content missing'
        })
    }

    const note = { //create new note object if the content is not missing
        id: Math.max(...notes.map(n => n.id)) + 1,// extract all ids, finds the highest and adds 1
        content: body.content, //asign note the data in the content
        important: body.important || false //if body.important use it or by default set it to not important 
    }

    notes = notes.concat(note)//add the new note to the array
    res.status(201).json(note) //respond with HTTP 201 for success on creating a new object
})

app.put('/api/notes/:id', (req, res) => {//:id means it is part of the url
    const id = Number(req.params.id)
    const note = notes.find(n => n.id ===id)
        if (!note) {
            return res.status(404).json({error: 'note now found'})
        }

        const updatedNote = { ...note, important : !note.important }
        notes = notes.map(n => n.id === id ? updatedNote: n)
        res.json(updatedNote)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`)
})