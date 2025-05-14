import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const Authors = ({authors: authorsList, refreshAuthors}) => {
  const [authors, setAuthors] = useState(authorsList);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [formValues, setFormValues] = useState({
    authorname: "",
    birthdate: "",
    deathdate: "",
    nationality: "",
    sex: "",
  });

  const navigate = useNavigate();


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


  
  const handleOpen = (author = null) => {

    setOpen(true);
  
    setFormValues(
      author || {
        authorname: "",
        birthdate: "",
        deathdate: "",
        nationality: "",
        sex: "",
      }
    );
    setSelectedAuthor(author);
    setIsEditing(author ? true : false);
    setUpdateId(author ? author.authorid : null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAuthor(null);
    setUpdateId(null);
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    const {data} = await axios.delete(`http://localhost:2000/api/authors/delete/${id}`)
    setAuthors(authors.filter(author => author.authorid !== id))
    refreshAuthors()
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const {data} = await axios.put(`http://localhost:2000/api/authors/update/${updateId}`, formValues)
    setAuthors(authors.map(author => author.authorid === updateId ? {...author, ...data} : author))
    refreshAuthors()
    setFormValues({
      authorname: "",
      birthdate: "",
      deathdate: "",
      nationality: "",
      sex: "",  
    })
    handleClose()
    
  }





const handleChange = (e) => {
  const { name, value, type } = e.target;
  
  // Convert to number if the field is birthdate or deathdate
  const processedValue = (name === 'birthdate' || name === 'deathdate') 
    ? value === '' ? '' : parseInt(value)
    : value;

  setFormValues({ 
    ...formValues, 
    [name]: processedValue 
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if(formValues.birthdate === '' || formValues.authorname === '' || formValues.nationality === '' || formValues.sex === ''){
    toast.error('Please fill all the fields')
    return
  }
  const {data} = await axios.post(`http://localhost:2000/api/authors/new`, formValues)
  setAuthors([...authors, data])
  refreshAuthors()

  setFormValues({

    authorname: "",
    birthdate: "",
    deathdate: "",
    nationality: "",
    sex: "",
  })  
  handleClose()
}






  return (
    <div>


      <div className="flex justify-start p-8">
      <ToastContainer 
        position="top-center" 
        theme="colored" 
        autoClose={3000}
        style={{ width: "500px", color: "black", fontSize: "15px",
           textTransform: "capitalize"}}
      />
      {userRole === 'admin' && (
        <button



        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => handleOpen()}
        >
          Add Author
        </button>
      )}
      </div>




    <div className="overflow-hidden flex flex-col  justify-center px-8">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="hidden md:table-header-group bg-blue-500 text-white uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Birth Date</th>
            <th className="py-3 px-6 text-left">Death Date</th>
            <th className="py-3 px-6 text-left">Nationality</th>
            <th className="py-3 px-6 text-left">Sex</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {authors?.map((author) => (
            <tr 
              key={author.authorid}
              className="border-b  border-gray-200 hover:bg-gray-100 block md:table-row"
            >
              <td className="py-3 px-6 block md:table-cell">
                <span className="font-bold md:hidden inline-block w-24">Name: </span>
                {author.authorname}
              </td>
              <td className="py-3 px-6 block md:table-cell">
                <span className="font-bold md:hidden inline-block w-24">Birth Date: </span>
                {author.birthdate}
              </td>
              <td className="py-3 px-6 block md:table-cell">
                <span className="font-bold md:hidden inline-block w-24">Death Date: </span>
                {author.deathdate || 'N/A'}
              </td>
              <td className="py-3 px-6 block md:table-cell">
                <span className="font-bold md:hidden inline-block w-24">Nationality: </span>
                {author.nationality}
              </td>
              <td className="py-3 px-6 block md:table-cell">
                <span className="font-bold md:hidden inline-block w-24">Sex: </span>
                {author.sex}
              </td>
              <td className="py-3 px-6 block md:table-cell">
                <div className="flex items-center space-x-2">
                {userRole === 'admin' && (
                <button
                  className="bg-yellow-500 text-white px-2 py-1 hidden md:block rounded hover:bg-yellow-600 mr-2"
                  onClick={() => handleOpen(author)}

                >
                  Edit
                </button>
                
                )}

               {userRole === 'admin' && (
               <MdOutlineEdit
                  onClick={() => handleOpen(author)}
                  className="text-yellow-500 w-6 h-6 md:hidden cursor-pointer"
                />
                )}

                {userRole === 'admin' && (
                <button

                  className="bg-red-500 text-white px-2 py-1 hidden md:block rounded hover:bg-red-600"
                  onClick={() => handleDelete(author.authorid)}

                >
                  Delete
                </button>
                )}

                {userRole === 'admin' && (
                <MdDelete
                  onClick={() => handleDelete(author.authorid)}
                  className="text-red-500 w-6 h-6 md:hidden cursor-pointer"
                />
                )}
                </div>
              </td>
            </tr>


          ))}
        </tbody>
      </table>
      <div className="flex justify-start mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/Dashboard')}>
        Go Back
      </button>

      </div>
        
    </div>
      
    {open && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded p-6 w-96">
      <h2 className="text-lg font-bold mb-4">
        {selectedAuthor ? "Edit Author" : "Add Author"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
         type='text'
          className="w-full border border-gray-300 px-3 py-2 rounded"
          name="authorname"
          placeholder="Author Name"
          value={formValues.authorname}
          onChange={handleChange}
        />

          <input
          type='number'
          className="w-full border border-gray-300 px-3 py-2 rounded"
          name="birthdate"
          placeholder="Birth Date"
          value={formValues.birthdate}
          onChange={handleChange}
        />
        <input
          type='number'
          className="w-full border border-gray-300 px-3 py-2 rounded"
          name="deathdate"
          placeholder="Death Date"
          value={formValues.deathdate}
          onChange={handleChange}
        />

        <input
        type='text'
          className="w-full border border-gray-300 px-3 py-2 rounded"
          name="nationality"
          placeholder="Nationality"
          value={formValues.nationality}
          onChange={handleChange}

        />

        <input
        type='text'
          className="w-full border border-gray-300 px-3 py-2 rounded"
          name="sex"
          placeholder="Sex"
          value={formValues.sex}
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

  )
}

export default Authors
