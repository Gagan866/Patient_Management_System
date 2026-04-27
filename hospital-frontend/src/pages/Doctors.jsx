import { useEffect, useState } from 'react'
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from '../services/doctorService'
import Layout from '../components/Layout'
import '../styles/global.css'
import '../styles/form.css'
import '../styles/table.css'

const initialForm = {
  name: '',
  specialization: '',
  availableFrom: '',
  availableTo: '',
}

const initialErrors = {
  name: '',
  specialization: '',
  availableFrom: '',
  availableTo: '',
}

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [errors, setErrors] = useState(initialErrors)

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const response = await getDoctors()
      setDoctors(response.data || [])
    } catch {
      setError('Failed to load doctors.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const resetForm = () => {
    setFormData(initialForm)
    setEditingId(null)
    setErrors(initialErrors)
  }

  const validateForm = () => {
    const nextErrors = { ...initialErrors }

    if (!formData.name.trim()) nextErrors.name = 'Name is required.'
    if (!formData.specialization.trim()) nextErrors.specialization = 'Specialization is required.'
    if (!formData.availableFrom) nextErrors.availableFrom = 'Available from time is required.'
    if (!formData.availableTo) nextErrors.availableTo = 'Available to time is required.'

    setErrors(nextErrors)
    return Object.values(nextErrors).every((value) => !value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!validateForm()) {
      return
    }

    try {
      if (editingId) {
        await updateDoctor(editingId, formData)
        setMessage('Doctor updated successfully.')
      } else {
        await createDoctor(formData)
        setMessage('Doctor added successfully.')
      }

      resetForm()
      fetchDoctors()
    } catch {
      setError('Unable to save doctor details.')
    }
  }

  const handleEdit = (doctor) => {
    setEditingId(doctor.id)
    setFormData({
      name: doctor.name || '',
      specialization: doctor.specialization || '',
      availableFrom: doctor.availableFrom || '',
      availableTo: doctor.availableTo || '',
    })
    setError('')
    setMessage('')
    setErrors(initialErrors)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure?')
    if (!confirmed) {
      return
    }

    setError('')
    setMessage('')

    try {
      await deleteDoctor(id)
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id))
      setMessage('Doctor deleted successfully.')

      if (editingId === id) {
        resetForm()
      }
    } catch {
      setError('Unable to delete doctor.')
    }
  }

  return (
    <Layout activeView="doctors">
      <main className="page-content">
        <h2 className="page-title">Doctors</h2>

        <section className="card-section">
          <h3>{editingId ? 'Edit Doctor' : 'Add Doctor'}</h3>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <form className="doctor-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="field-group">
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Specialization"
                required
              />
              {errors.specialization && <p className="field-error">{errors.specialization}</p>}
            </div>

            <div className="field-group">
              <input
                type="time"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                required
              />
              {errors.availableFrom && <p className="field-error">{errors.availableFrom}</p>}
            </div>

            <div className="field-group">
              <input type="time" name="availableTo" value={formData.availableTo} onChange={handleChange} required />
              {errors.availableTo && <p className="field-error">{errors.availableTo}</p>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Doctor' : 'Add Doctor'}
              </button>
              {editingId && (
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="card-section">
          <h3>Doctors List</h3>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : doctors.length === 0 ? (
            <p className="empty-state">No data available</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Available From</th>
                    <th>Available To</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td>{doctor.name}</td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.availableFrom}</td>
                      <td>{doctor.availableTo}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="btn-primary btn-small"
                            onClick={() => handleEdit(doctor)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn-danger btn-small"
                            onClick={() => handleDelete(doctor.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
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

export default Doctors
