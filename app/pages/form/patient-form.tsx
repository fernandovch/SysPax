"use client"
import { useState, FormEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  province: string;
  canton: string;
  barrio: string;
  isFirstVisit: boolean;
  previousConsultation: string;
  consultationReason: string;
  phoneNumber: string;
  patientId: string;
}

const PatientForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    province: '',
    canton: '',
    barrio: '',
    isFirstVisit: false,
    previousConsultation: '',
    consultationReason: '',
    phoneNumber: '',
    patientId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend endpoint
    // Replace 'your-backend-endpoint' with the actual endpoint URL
    const response = await fetch('/pages/api/form-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log('Form submitted successfully');
      // Handle successful form submission
    } else {
      console.error('Form submission failed');
      // Handle form submission error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-blue-100 p-4 rounded">
      <h2 className="text-xl text-blue-800 font-bold mb-4">Patient Information</h2>      
      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {/* Is First Visit? */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="isFirstVisit"
            checked={formData.isFirstVisit}
            onChange={handleChange}
            className="mr-2"
          />
          First Visit?
        </label>
      </div>

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Province
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Canton
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Barrio
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Cedula
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <button type="submit" className="w-full bg-navy-600 text-blue-800 py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default PatientForm;
