import { useState, useEffect } from 'react'
import { apiClient } from '../utils/api'

/**
 * Users Component
 *
 * Displays registered users.
 * Uses the API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
 */
export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiClient.getAll('users')
      setUsers(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load users:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">Error loading users</h4>
        <p>{error}</p>
        <button className="btn btn-sm btn-outline-danger" onClick={loadUsers}>
          Try again
        </button>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="alert alert-info">
        <h4 className="alert-heading">No users yet</h4>
        <p>New team members will appear here once they are added.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
              <th>Role</th>
              <th>Fitness Level</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id || user._id}>
                <td className="fw-semibold">{user.name || 'Unknown user'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.team || 'Unassigned'}</td>
                <td>{user.role || 'student'}</td>
                <td>{user.fitnessLevel || 'beginner'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
