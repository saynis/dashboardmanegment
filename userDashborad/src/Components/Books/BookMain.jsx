import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";


const BooksMain = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [formValues, setFormValues] = useState({
    bookname: "",
    booktype: "",
    genre: "",
    isbn: "",
    bookimage: "",
    authorname: "",
    publisherYear: "",
    addition: "",
    Langs: "",
    authorid: null,
  });
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(()=>{
      toast.error("hadii aadan ahayn author diwaangashan isma diwaan galin kartid fadlan marka hore is diwaangali si aad u soo hesho id-gaaga")
    },[])

  // Fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  // Kudar function cusub oo role-ka user-ka keena
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // Hubi in token-ka sessionka ku jira
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get("http://localhost:2000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserRole(response.data.user.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }

    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const handleBackButton = (e) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        // Prevent default browser back behavior
        window.history.pushState(null, '', window.location.pathname);
        navigate('/dashboard');
      }
    };

    // Add popstate event listener to handle browser back button
    window.addEventListener('popstate', () => {
      navigate('/dashboard');
    });

    window.addEventListener('keydown', handleBackButton);
    return () => {
      window.removeEventListener('keydown', handleBackButton);
      window.removeEventListener('popstate', () => {
        navigate('/dashboard');
      });
    };
  }, [navigate]);

  

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/books/all");
      setBooks(response.data.Books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleOpen = (book = null) => {
    setSelectedBook(book);
    setFormValues(
      book || {
        bookname: "",
        booktype: "",
        genre: "",
        isbn: "",
        bookimage: "",
        authorname: "",
        publisherYear: "",
        addition: "",
        Langs: "",
        authorid: null

      }
    );
    setOpen(true);
    setIsEditing(book ? true : false);
    setUpdateId(book ? book.bookid : null);
  };



  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleChange = (e) => {
   
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(formValues.bookname === '' || formValues.authorname === '' || formValues.publisherYear === '' || formValues.authorid === ''){
      toast.error("please fill all the fields")
      return
    }
    const {data} = await axios.post("http://localhost:2000/api/books/new", formValues)
    setBooks([...books , data])
    fetchBooks()
    handleClose()


 
  };


  const handleUpdate = async (event) => {
    event.preventDefault();
    const {data} = await axios.put(`http://localhost:2000/api/books/update/${updateId}`, formValues)
    setBooks(books.map(book => book.bookid === updateId ? {...book, ...data} : book))
    setFormValues({
      bookname: "",
      booktype: "",
      genre: "",
      isbn: "",
      bookimage: "",
    })
    fetchBooks()
    handleClose()
  }



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/books/delete/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-4">
      <ToastContainer 
        position="top-center" 
        theme="colored" 
        autoClose={3000}
        style={{ width: "500px", color: "black", fontSize: "15px",
           textTransform: "capitalize"}}
      />
      {/* Tus button-ka Add kaliya haddii uu yahay admin */}
      {userRole === 'admin' && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleOpen()}
        >
          Add Book
        </button>
      )}
      <div className="mt-4 shadow-md sm:rounded-lg pb-4">
        <div className="min-w-full ">
          <table className="w-full text-sm text-left text-gray-500">
            {/* Desktop header */}

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 hidden md:table-header-group">
              <tr>
                <th scope="col" className="px-4 py-3">ID</th>
                <th scope="col" className="px-4 py-3">Book Name</th>
                <th scope="col" className="px-4 py-3">Author</th>
                <th scope="col" className="px-4 py-3">Year</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book) => (
                <tr key={book.bookid} className="bg-white border-b hover:bg-gray-50 flex flex-col md:table-row">
                  <td className="px-4 py-3 flex md:table-cell">
                    <span className="font-bold md:hidden mr-2">ID:</span>
                    {book.bookid}
                  </td>
                  <td className="px-4 py-3 flex md:table-cell">
                    <span className="font-bold md:hidden mr-2">Book Name:</span>
                    {book.bookname}
                  </td>
                  <td className="px-4 py-3 flex md:table-cell">
                    <span className="font-bold md:hidden mr-2">Author:</span>
                    {book.authorname}
                  </td>
                  <td className="px-4 py-3 flex md:table-cell">
                    <span className="font-bold md:hidden mr-2">Year:</span>
                    {book.publisherYear}
                  </td>
                  <td className="px-4 py-3 flex md:table-cell">
                    {userRole === 'admin' && (
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 hidden md:block rounded hover:bg-yellow-600"
                          onClick={() => handleOpen(book)}
                        >
                          Edit
                        </button>

                        {userRole === 'admin' && (
                          <MdOutlineEdit
                          onClick={() => handleOpen(book)}
                          className="text-yellow-500 w-6 h-6 md:hidden cursor-pointer"
                        />
                        )}

                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hidden
                           md:block hover:bg-red-600"
                          onClick={() => handleDelete(book.bookid)}
                        >
                          Delete
                          </button>

                        {userRole === 'admin' && (
                          <MdDelete
                            onClick={() => handleDelete(book.bookid)}
                            className="text-red-500 w-6 h-6 md:hidden cursor-pointer"
                        />
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      </div>
        <button 
        className="bg-blue-500 text-white md:px-8 py-2 mt-4 w-full md:w-auto    rounded hover:bg-blue-600" 
        onClick={() => navigate('/Dashboard')}>Back</button>




      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-lg font-bold mb-4">
              {selectedBook ? "Edit Book" : "Add Book"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded"
                name="bookname"
                placeholder="Book Name"
                value={formValues.bookname}
                onChange={handleChange}
              />
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded"
                name="authorname"
                placeholder="Author Name"
                value={formValues.authorname}
                onChange={handleChange}
              />
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded"
                name="publisherYear"
                placeholder="Publisher Year"
                value={formValues.publisherYear}
                onChange={handleChange}
              />
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded"
                name="authorid"
                placeholder="authorid"
                value={formValues.authorid}
                onChange={handleChange}
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={handleClose}
                >
                  Cancel
                </button>


                { isEditing ? (  <button
                   onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update  
                </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksMain;
