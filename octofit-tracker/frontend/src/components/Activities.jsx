import { useState, useEffect } from 'react'
import { apiClient } from '../utils/api'

/**
 * Activities Component
 * 
 * Displays a list of logged activities.
 * Uses the API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
 */
export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiClient.getAll('activities')
      setActivities(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load activities:', err)
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
        <h4 className="alert-heading">Error loading activities</h4>
        <p>{error}</p>
        <button className="btn btn-sm btn-outline-danger" onClick={loadActivities}>
          Try again
        </button>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="alert alert-info">
        <h4 className="alert-heading">No activities yet</h4>
        <p>Start logging activities to see them here.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Activity</th>
              <th>Description</th>
              <th>Date</th>
              <th>Duration (min)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id || activity._id}>
                <td className="fw-semibold">{activity.name || activity.type || 'N/A'}</td>
                <td>{activity.description || '-'}</td>
                <td>
                  {activity.date
                    ? new Date(activity.date).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td>{activity.duration || '-'}</td>
                <td>{activity.calories || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
