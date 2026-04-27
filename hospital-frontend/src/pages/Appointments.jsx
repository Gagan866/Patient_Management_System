import { useEffect, useState } from 'react'
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from '../services/appointmentService'
import { getDoctors } from '../services/doctorService'
import { getPatients } from '../services/patientService'
import Layout from '../components/Layout'
import AppointmentForm from '../components/AppointmentForm'
import AppointmentTable from '../components/AppointmentTable'
import '../styles/global.css'
import '../styles/form.css'
import '../styles/table.css'

const initialAppointmentForm = {
  patientId: '',
  doctorId: '',
  appointmentDate: '',
  appointmentTime: '',
  status: 'Scheduled',
}

function Appointments() {
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [formData, setFormData] = useState(initialAppointmentForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
        getPatients(),
        getDoctors(),
        getAppointments(),
      ])

      setPatients(patientsRes.data || [])
      setDoctors(doctorsRes.data || [])
      setAppointments(appointmentsRes.data || [])
    } catch {
      setError('Failed to load appointment data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    const payload = {
      patientId: Number(formData.patientId),
      doctorId: Number(formData.doctorId),
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      status: formData.status || 'Scheduled',
    }

    try {
      if (editingId) {
        await updateAppointment(editingId, payload)
        setMessage('Appointment updated successfully.')
      } else {
        await createAppointment(payload)
        setMessage('Appointment booked successfully.')
      }

      setFormData(initialAppointmentForm)
      setEditingId(null)
      fetchData()
    } catch (apiError) {
      const responseMessage = apiError.response?.data?.message
      setError(responseMessage || 'Unable to book appointment.')
    }
  }

  const handleEdit = (appointment) => {
    setEditingId(appointment.id)
    setFormData({
      patientId: String(appointment.patient?.id || ''),
      doctorId: String(appointment.doctor?.id || ''),
      appointmentDate: appointment.appointmentDate || '',
      appointmentTime: appointment.appointmentTime || '',
      status: appointment.status || 'Scheduled',
    })
    setError('')
    setMessage('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData(initialAppointmentForm)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure?')
    if (!confirmed) {
      return
    }

    setError('')
    setMessage('')

    try {
      await deleteAppointment(id)
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
      setMessage('Appointment deleted successfully.')

      if (editingId === id) {
        handleCancelEdit()
      }
    } catch (apiError) {
      const responseMessage = apiError.response?.data?.message
      setError(responseMessage || 'Unable to delete appointment.')
    }
  }

  return (
    <Layout activeView="appointments">
      <main className="page-content">
        <h2 className="page-title">Appointments</h2>
        <AppointmentForm
          formData={formData}
          patients={patients}
          doctors={doctors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
          editingId={editingId}
          message={message}
          error={error}
        />
        <AppointmentTable
          appointments={appointments}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </Layout>
  )
}

export default Appointments
