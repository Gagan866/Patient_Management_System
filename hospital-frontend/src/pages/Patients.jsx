import { useEffect, useState } from 'react'
import { createPatient, deletePatient, getPatients, updatePatient } from '../services/patientService'
import Layout from '../components/Layout'
import PatientForm from '../components/PatientForm'
import PatientTable from '../components/PatientTable'
import '../styles/global.css'
import '../styles/form.css'
import '../styles/table.css'

const initialForm = {
  name: '',
  age: '',
  gender: '',
  phone: '',
  disease: '',
}

const initialErrors = {
  name: '',
  age: '',
  gender: '',
  phone: '',
  disease: '',
}

function Patients() {
  const [patients, setPatients] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [errors, setErrors] = useState(initialErrors)

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await getPatients()
      setPatients(response.data || [])
    } catch {
      setError('Failed to load patients.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValue = name === 'phone' ? value.replace(/[^0-9]/g, '').slice(0, 10) : value

    setFormData((prev) => ({ ...prev, [name]: nextValue }))
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

    const ageValue = Number(formData.age)
    if (!formData.age || Number.isNaN(ageValue) || ageValue <= 0) {
      nextErrors.age = 'Age must be greater than 0.'
    }

    if (!formData.gender) nextErrors.gender = 'Gender is required.'

    if (!/^\d{10}$/.test(formData.phone)) {
      nextErrors.phone = 'Phone number must be 10 digits.'
    }

    if (!formData.disease.trim()) nextErrors.disease = 'Disease is required.'

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

    const payload = {
      ...formData,
      age: Number(formData.age),
    }

    try {
      if (editingId) {
        await updatePatient(editingId, payload)
        setMessage('Patient updated successfully.')
      } else {
        await createPatient(payload)
        setMessage('Patient added successfully.')
      }

      resetForm()
      fetchPatients()
    } catch {
      setError('Unable to save patient details.')
    }
  }

  const handleEdit = (patient) => {
    setEditingId(patient.id)
    setFormData({
      name: patient.name || '',
      age: patient.age ?? '',
      gender: patient.gender || '',
      phone: patient.phone || '',
      disease: patient.disease || '',
    })
    setError('')
    setMessage('')
    setErrors(initialErrors)
  }

  const handleDelete = async (id) => {
    setError('')
    setMessage('')

    try {
      await deletePatient(id)
      setPatients((prev) => prev.filter((patient) => patient.id !== id))
      setMessage('Patient deleted successfully.')

      if (editingId === id) {
        resetForm()
      }
    } catch {
      setError('Unable to delete patient.')
    }
  }

  return (
    <Layout activeView="patients">
      <main className="container">
        <h2 className="page-title">Patients</h2>
        <PatientForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          editingId={editingId}
          errors={errors}
          message={message}
        />
        {error && <p className="error-message">{error}</p>}
        <PatientTable patients={patients} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
    </Layout>
  )
}

export default Patients
