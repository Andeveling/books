const { Router } = require("express")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const router = Router()

const json_books = fs.readFileSync("src/books.json", "utf-8", (err) => {
  if (err) console.log(err)
})

let books = JSON.parse(json_books)

router.get("/", (req, res) => {
  res.render("index.ejs", { books: books })
})

//Entries
router.get("/new-entry", (req, res) => {
  res.render("newEntry.ejs")
})

router.get("/delete/:id", (req, res) => {
  books = books.filter((book) => book.id !== req.params.id)
  // saving the array in a file
  const json_books = JSON.stringify(books)

  fs.writeFileSync("src/books.json", json_books, "utf-8", (error) => {
    if (error) console.log(error)
  })
  res.redirect("/")
})

router.post("/new-entry", (req, res) => {
  const { title, author, image, contents } = req.body
  let newBook = { id: uuidv4(), title, author, image, contents }
  if (!title || !author || !image || !contents) {
    res.status(400).send("Las entradas deberian tener todos los campos")
  } else {
    // add a new book to the array
    books.push(newBook)

    // saving the array in a file
    const json_books = JSON.stringify(books)

    fs.writeFileSync("src/books.json", json_books, "utf-8", (error) => {
      if (error) console.log(error)
    })
    res.redirect("/")
  }
})

module.exports = router
