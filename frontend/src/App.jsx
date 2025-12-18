import { useState,useEffect } from 'react'
import noteService from './Services/notes'
import Note from './Components/Note'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showImportant, setShowImportant] = useState(false)

  // Fetch notes from backend when component mounts
  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

    // Handle adding a new note
  const addNote = (event) => {
    event.preventDefault()
    if (!newNote) return

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

    // Handle toggling importance
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    if (!note) return

    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        alert('Note was already deleted from server')
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // Decide which notes to show
  const notesToShow = showImportant
    ? notes.filter(note => note.important)
    : notes

  return (
    <div>
      <h1>Notes</h1>

      <button onClick={() => setShowImportant(!showImportant)}>
        {showImportant ? 'Show all' : 'Show important'}
      </button>

      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
