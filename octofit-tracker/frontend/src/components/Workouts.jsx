import { useState, useEffect } from 'react'
import { apiClient } from '../utils/api'

/**
 * Workouts Component
 *
 * Displays suggested training plans.
 * Uses the API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
 */
export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadWorkouts()
  }, [])

  const loadWorkouts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiClient.getAll('workouts')
      setWorkouts(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load workouts:', err)
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
        <h4 className="alert-heading">Error loading workouts</h4>
        <p>{error}</p>
        <button className="btn btn-sm btn-outline-danger" onClick={loadWorkouts}>
          Try again
        </button>
      </div>
    )
  }

  if (workouts.length === 0) {
    return (
      <div className="alert alert-info">
        <h4 className="alert-heading">No workouts yet</h4>
        <p>Workout suggestions will appear here once they are added.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout.id || workout._id} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <span className="badge bg-primary-subtle text-primary-emphasis mb-2">
                  {workout.level || 'All levels'}
                </span>
                <h5 className="card-title">{workout.title || 'Untitled Workout'}</h5>
                <p className="card-text text-muted">{workout.focus || 'General fitness'}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <small className="text-secondary">⏱ {workout.durationMinutes || 30} min</small>
                  <small className="text-secondary">🎯 {workout.focus || 'Fitness'}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
