import { useEffect, useState } from 'react'
import { getAppointments } from '../services/appointmentService'
import { getPatients } from '../services/patientService'
import Layout from '../components/Layout'
import '../styles/global.css'
import '../styles/table.css'

function Dashboard() {
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      setError('')

      try {
        const [patientsResponse, appointmentsResponse] = await Promise.all([
          getPatients(),
          getAppointments(),
        ])

        setPatients(patientsResponse.data || [])
        setAppointments(appointmentsResponse.data || [])
      } catch {
        setPatients([])
        setAppointments([])
        setError('Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <Layout activeView="dashboard">
      <main className="page-content">
        <h2 className="page-title">Dashboard</h2>
        {error && <p className="error-message">{error}</p>}

        <section className="card-section">
          <h3>Patients List</h3>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : patients.length === 0 ? (
            <p className="empty-state">No data available</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Disease</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.disease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="card-section">
          <h3>Appointments List</h3>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : appointments.length === 0 ? (
            <p className="empty-state">No data available</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.patient?.name || 'N/A'}</td>
                      <td>{appointment.doctor?.name || 'N/A'}</td>
                      <td>{appointment.appointmentDate}</td>
                      <td>{appointment.appointmentTime}</td>
                      <td>{appointment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </Layout>
  )
}

export default Dashboard
