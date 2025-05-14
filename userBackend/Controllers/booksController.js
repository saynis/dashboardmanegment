import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Post
export const postNewBooks = async (req, res) => {
  
  try {
    const {
      bookname,
      booktype,
      genre,
      isbn,
      bookimage,
      authorname,
      publisherYear,
      addition,
      Langs,
      authorid
    } = req.body;
    // if(!bookname || !booktype || !bookimage || !isbn || !authorname||!publisherYear||!addition||!Langs||!authorid){
    //  return res.status(400).json({message: "Can't be Empty"})
    // }
    const newBook = await prisma.books.create({
      data:{
      bookname,
      booktype,
      genre,
      isbn,
      bookimage,
      authorname,
      publisherYear,
      addition,
      Langs,
      authorid: parseInt(authorid, 10)
      }
    })
    res.status(201).json("Success Created a new Book")
  } catch (error) {
    res.json(error.message)
  }
};

// Get
export const getAllBooks = async (req, res) => {
  try {
    const Books = await prisma.books.findMany();
    res.status(200).json({
      status: "Success Gated All Books",
            Books
    })
  } catch (error) {
    res.status(404).json({
      massage: "not found"
    })
  }
};
// Put
export const putBooks = async (req, res) => {
  try {
    const {
      bookname,
      booktype,
      genre,
      bookimage,
      isbn,
      authorname,
      publisherYear,
      addition,
      Langs
    } = req.body;
    const {id} = req.params;

    // Ensure ID is a valid number
    const bookId = parseInt(id);
    if (isNaN(bookId)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const UpdateBook = await prisma.books.update({
      where: {
        bookid: bookId
      },
      data: {
        ...(bookname && { bookname }),
        ...(booktype && { booktype }),
        ...(genre && { genre }),
        ...(bookimage && { bookimage }),
        ...(isbn && { isbn }),
        ...(authorname && { authorname }),
        ...(publisherYear && { publisherYear }),
        ...(addition && { addition }),
        ...(Langs && { Langs })
      }
    });
    
    res.status(200).json({
      message: `Success Updated Book: ${bookId}`,
      data: UpdateBook
    });
    
  } catch (error) {
    res.status(400).json({
      message: "Failed to update book",
      error: error.message
    });
  }
};

// Delete
export const deleteBooks = async (req, res) => {
  try {
    const {id}  =req.params
    const deleteBook = await prisma.books.delete({
      where:{
        bookid: +id
      }
    })
    res.status(200).json({
      message:`Successfully deleted on : ${id}`
    })
  } catch (error) {
    res.status(400).json({
      message:`Failed to deleted on : ${id}`
    })
  }
};

// Find
export const findBooks = async (req, res) => {
  
    const {id}  =req.params
    const findBook = await prisma.books.findFirst({
      where:{
        bookid: +id
      },
    })
    if(!findBook){
      return res.status(404).json({message: "Book not found"})
    }
    res.status(200).json({
      message:`Successfully Finded on : ${id}`,
      findBook
    })
  }