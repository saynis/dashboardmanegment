import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Authors from '../Authors/Authors'

const AuthorsMain = () => {
    const [dataAuthors, setDataAuthors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    


    useEffect(() => {
    fetchAuthors()
    }, [])

    const fetchAuthors = async () => {
      try {
          setLoading(true)
          const response = await axios.get("http://localhost:2000/api/authors/all") // Debug response
          setDataAuthors(response.data.authors)
          setError(null)
      } catch (error) {
          console.error("Error details:", error)
          setError(error.message || "Failed to fetch authors")
      } finally {
          setLoading(false)
      }
  }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <Authors authors={dataAuthors} refreshAuthors={fetchAuthors} />
        </div>
    )
}

export default AuthorsMain

