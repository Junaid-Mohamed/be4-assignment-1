const { initializeDb } = require(`./db`);
const express = require("express");

const app = express();

app.use(express.json());

const Book = require("./models/book.models");

initializeDb();

app.get('/',(req,res)=>{
  res.send('books backend app.')
})

app.get("/books",async(req,res)=>{
  try{
    const books = await getAllBooks();
    res.status(200).json({Books: books})
  }catch(error){
    res.status(500).json({error:"error fetching books"})
  }
})

app.get("/books/author/:bookAuthor", async (req,res)=>{
  try{
    console.log(req.params.bookAuthor);
    const book = await getBookByAuthor(req.params.bookAuthor);
    if(book.length>0) res.status(200).json({book});
    else res.status(400).json({error:"error finding book details"})
  }catch(error){
    res.status(500),json({error:"Error getting book"})
  }
})

app.get("/books/title/:bookTitle", async (req,res)=>{
  try{
    const book = await getBookByTitle(req.params.bookTitle);
    if(book.length>0) res.status(200).json({book});
    else res.status(400).json({error:"error finding book details"})
  }catch(error){
    res.status(500),json({error:"Error getting book"})
  }
})

app.get("/books/genre/:bookGenre", async (req,res)=>{
  try{
    const book = await getBookByGenre(req.params.bookGenre);
    if(book.length>0) res.status(200).json({book});
    else res.status(400).json({error:"error finding book details"})
  }catch(error){
    res.status(500),json({error:"Error getting book"})
  }
})
app.get("/books/year/:releaseYear", async (req,res)=>{
  try{
    const book = await getBookByReleaseYear(req.params.releaseYear);
    if(book.length>0) res.status(200).json({book});
    else res.status(400).json({error:"error finding book details"})
  }catch(error){
    res.status(500),json({error:"Error getting book"})
  }
})

app.post('/books', async (req,res)=>{
  try{
    const newBook = await createBook(req.body);
    if(newBook) res.status(201).json({message:"Book created successfully", book: newBook});
    else res.status(400).json({error:"new book couldn't be added"})
  }catch(error){
    res.status(500).json({error:"Error adding data of new book"})
  }
})

app.post("/books/:booklId", async (req,res)=>{
  try{
    const updatedBook = await updateBookById(req.params.booklId, req.body);
    if(updatedBook) res.status(200).json({"updated book": req.body });
    else res.status(400).json({error:"Book does not exist"})
  }catch(error){
    res.status(500).json({error:"error updating Book"})
  }
})
app.post("/books/title/:bookTitle", async (req,res)=>{
  try{
    const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body);
    if(updatedBook) res.status(200).json({"updated book": req.body });
    else res.status(400).json({error:"Book does not exist"})
  }catch(error){
    res.status(500).json({error:"error updating Book"})
  }
})

app.delete("/books/:bookId", async (req,res)=>{
  try{
    const deletedBook = await deleteBookById(req.params.bookId);
    if(deletedBook) res.status(200).json({message:"Book deleted successfully",book: deletedBook});
    else res.status(400).json({error:"Book not found"});
  }catch(error){
    res.status(500),json({error:"Error while delete the book"})
  }
})
async function getAllBooks(){
  try{
    const books = await Book.find();
    return books;
  }catch(error){
    throw error;
  }
}

async function getBookByTitle(title){
  try{
    const book = await Book.find({title});
    return book;
  }catch(error){
    throw error;
  }
}

async function getBookByAuthor(author){
  try{
    const book = await Book.find({author});
    return book;
  }catch(error){
    throw error;
  }
}

async function getBookByGenre(genre){
  try{
    const book = await Book.find({genre});
    return book;
  }catch(error){
    throw error;
  }
}

async function getBookByReleaseYear(publishedYear){
  try{
    const book = await Book.find({publishedYear});
    return book;
  }catch(error){
    throw error;
  }
}
async function updateBookById(bookId, dataToUpdate){
  try{
    const updateBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new:true});
    return updateBook; 
  }catch(error){
    throw error;
  }
}

async function updateBookByTitle(title, dataToUpdate){
  try{
    const updatedBook = await Book.findOneAndUpdate({title}, dataToUpdate, {new:true});
    return updatedBook; 
  }catch(error){
    throw error;
  }
}
async function deleteBookById(bookId){
  try{
    const deletedBook = await Book.findByIdAndDelete(bookId);
    return deletedBook;
  }catch(error){
    throw error;
  }
}
async function createBook(newBook){
  try{
    const book = new Book(newBook);
    const savedBook = await book.save();
    return savedBook;
  }catch(error){
    throw error;
  }
}

app.listen(3000, ()=> console.log("Server is running on port 3000"));