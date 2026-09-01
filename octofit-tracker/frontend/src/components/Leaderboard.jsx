import { useState, useEffect } from 'react'
import { apiClient } from '../utils/api'

/**
 * Leaderboard Component
 * 
 * Displays competitive leaderboard with ranked users.
 * Uses the API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
 */
export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiClient.getAll('leaderboard')
      setEntries(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load leaderboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
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
        <h4 className="alert-heading">Error loading leaderboard</h4>
        <p>{error}</p>
        <button className="btn btn-sm btn-outline-danger" onClick={loadLeaderboard}>
          Try again
        </button>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="alert alert-info">
        <h4 className="alert-heading">No leaderboard entries yet</h4>
        <p>Users will appear here as they log activities.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4">🏆 Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th width="80">Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Activities</th>
              <th>Total Calories</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id || entry._id} className={index < 3 ? 'table-success' : ''}>
                <td className="fw-bold fs-5">{getMedalEmoji(entry.rank || index + 1)}</td>
                <td className="fw-semibold">{entry.userId?.username || entry.username || 'Unknown'}</td>
                <td>{entry.score || entry.totalCalories || 0}</td>
                <td>{entry.activityCount || '-'}</td>
                <td>{entry.totalCalories || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
