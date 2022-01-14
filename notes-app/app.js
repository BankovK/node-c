// const utils = require('./utils.js')
// const sum = utils.add(4, -2)
// console.log(sum)

//-------------------------------------------------

// const validator = require('validator')
// const notes = require('./notes.js')

// console.log(notes.getNotes())

// console.log(validator.isEmail('lala@123.com'))
// console.log(validator.isURL('https://lala.com'))

//-------------------------------------------------

// const chalk = require('chalk')

// console.log(chalk.green.inverse.bold('Success!'))

//-------------------------------------------------


const chalk = require('chalk')
const { argv } = require('process')
const yargs = require('yargs')
const notesUtils = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note text',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler() {
        notesUtils.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtils.readNote(argv.title)
    }
})

yargs.parse()
