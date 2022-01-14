const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
    addNote(title, body) {
        const notes = loadNotes()
        const dublicateNote = notes.some(note => note.title === title)
        if (!dublicateNote) {
            notes.push({
                title: title,
                body: body
            })
            saveNotes(notes)
            console.log(chalk.bgGreen('Note added!'))
        } else {
            console.log(chalk.bgRed('Note title taken!'))
        }
    },
    removeNote(title) {
        const notes = loadNotes()
        const filteredNotes = notes.filter(note => note.title !== title)
        if (filteredNotes.length === notes.length) {
            console.log(chalk.bgRed('Note not found!'))
        } else {
            console.log(chalk.bgGreen('Note removed!'))
            saveNotes(filteredNotes)
        }
    },
    listNotes() {
        const notes = loadNotes()
        console.log(chalk.inverse.bold('Notes:'))
        notes.forEach(note => console.log(note.title))
    },
    readNote(title) {
        const notes = loadNotes()
        const note = notes.find(note => note.title === title)
        if (!note) {
            console.log(chalk.bgRed('Note not found!'))
        } else {
            console.log(chalk.inverse.bold(note.title))
            console.log(note.body)
        }
    }
}