import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "./graphql"
import "./App.css"

interface Repository {
  name: string
  url: string
}

interface User {
  user: {
    repositories: {
      nodes: Repository[]
    }
  }
}

const App: React.FC = () => {
  const [username, setUsername] = useState("")
  const { loading, error, data } = useQuery<User>(GET_REPOSITORIES, {
    variables: { username },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Trigger the GraphQL query when the form is submitted
    // You can access the repository data in `data.user.repositories`
  }

  return (
    <div className="container">
      <h1>Search GitHub Repositories</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={username.trim()}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && !data && username !== "" && <p>Error: {error.message}</p>}

      <div className="result-container">
        {data?.user.repositories.nodes.map((repository) => (
          <div key={repository.name} className="repository">
            <a href={repository.url} className="repository-link">
              {repository.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
