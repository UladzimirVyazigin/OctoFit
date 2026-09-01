import { useState, useEffect } from 'react'
import { apiClient } from '../utils/api'

/**
 * Teams Component
 * 
 * Displays and manages teams.
 * Uses the API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
 */
export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedTeam, setExpandedTeam] = useState(null)

  useEffect(() => {
    loadTeams()
  }, [])

  const loadTeams = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiClient.getAll('teams')
      setTeams(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load teams:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleTeamDetails = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId)
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
        <h4 className="alert-heading">Error loading teams</h4>
        <p>{error}</p>
        <button className="btn btn-sm btn-outline-danger" onClick={loadTeams}>
          Try again
        </button>
      </div>
    )
  }

  if (teams.length === 0) {
    return (
      <div className="alert alert-info">
        <h4 className="alert-heading">No teams yet</h4>
        <p>Teams will appear here once they are created.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      <div className="row">
        {teams.map((team) => (
          <div key={team.id || team._id} className="col-md-6 col-lg-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name || 'Unnamed Team'}</h5>
                <p className="card-text text-muted">{team.description || 'No description'}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-secondary">
                    👥 Members: {team.memberCount || team.members?.length || 0}
                  </small>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => toggleTeamDetails(team.id || team._id)}
                  >
                    {expandedTeam === (team.id || team._id) ? 'Hide' : 'View'} Details
                  </button>
                </div>
              </div>
              {expandedTeam === (team.id || team._id) && (
                <div className="card-footer">
                  {team.members && team.members.length > 0 ? (
                    <>
                      <h6 className="mb-2">Members:</h6>
                      <ul className="list-unstyled">
                        {team.members.map((member, idx) => (
                          <li key={idx} className="small">
                            • {member.username || member.name || 'Unknown'}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="small text-muted">No members yet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
