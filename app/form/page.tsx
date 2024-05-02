"use client"
import Script from 'next/script';
import { useState, FormEvent } from 'react';
import { useEffect } from 'react';


interface InputEvent {
  target: HTMLInputElement;
}

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

  function formatInput(value: string): string {
    // Remove any non-digit characters
    const digits: string = value.replace(/\D/g, '');
    // Format the digits to 'D-DDDD-DDDD'
    return digits.replace(/(\d)(?=(\d{4})+(?!\d))/g, "$1-");
  }
  
  // Function to set the value to the input
  function onInputChanged(event: InputEvent): void {
    const input: HTMLInputElement = event.target;
    if (input.validity.valueMissing) {
      // Set custom message for the required field
      input.setCustomValidity('Formato de cedula D-DDDD-DDDD.');
      return;
    } else {
      // Clear custom message
      input.setCustomValidity('');
      
    }
    
    const formattedValue: string = formatInput(input.value);
    input.value = formattedValue;
  }

  // function callValidateInput(event: InputEvent )
  // {
  //   const input: HTMLInputElement = event.target;
  //   validateInput( input);
  // }

  // function validateInput( input :HTMLInputElement ): void {
    
  //   if (input.validity.valueMissing) {
  //     // Set custom message for the required field
  //     input.setCustomValidity('Ingresar el data requerido.');
  //   } else {
  //     // Clear custom message
  //     input.setCustomValidity('');
  //   }
  // }



  return (
    <>
      <Script
  id="show-banner" 
  dangerouslySetInnerHTML={{
    __html:
  
  `   

  function validateInput(input) {
    if (input.validity.valueMissing) {
      // Set custom message for the required field
      input.setCustomValidity('Ingresar el dato requerido.');
    } else {
      // Clear custom message
      input.setCustomValidity('');
    }
  }

  const inputElement = document.querySelectorAll('input[type="text"]');
  inputElement.forEach((i)=>{
    i.addEventListener('invalid', function() {
    validateInput(i);
    })
  })
  


    
   ` }}
    
   />
    
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-blue-50 p-4 mt-10 rounded">
      <h1 className="text-xl text-center text-gray-100 bg-navy-600 font-bold mb-4 p-4 rounded">Information del paciente</h1>      
      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Primer nombre
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
          placeholder='Nombre'          
          //onInput={(e:any)=>callValidateInput(e)}
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Apellidos
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
          placeholder='Primer y segundo apellido'
          //onInput={(e:any)=>callValidateInput(e)}
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
          Primera visita?
        </label>
      </div>

      <div className="mb-4">
        <label htmlFor="province" className="block text-sm font-medium text-gray-700">
          Provincia
        </label>
        <input
          type="text"
          id="province"
          name="province"
          value={formData.province}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
          placeholder='Provincia donde reside'
          //onInput={(e:any)=>callValidateInput(e)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="canton" className="block text-sm font-medium text-gray-700">
          Canton
        </label>
        <input
          type="text"
          id="canton"
          name="canton"
          value={formData.canton}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
          placeholder='Canton donde reside'
          //onInput={(e:any)=>callValidateInput(e)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="barrio" className="block text-sm font-medium text-gray-700">
          Barrio
        </label>
        <input
          type="text"
          id="barrio"
          name="barrio"
          value={formData.barrio}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
          placeholder='Barrio donde reside'
          //onInput={(e:any)=>callValidateInput(e)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Telefono personal
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
          placeholder='Celular personal / Contacto de emergencia'
          //onInput={(e:any)=>callValidateInput(e)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
          Cedula
        </label>
        <input
          type="text"
          id="patientId"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          onInput={(event:any)=>onInputChanged(event)}
          className="mt-1 p-2 border rounded w-full"
          required
          placeholder='Formato correcto D-DDDD-DDDD'
        />
      </div>
      <button type="submit" className="w-full bg-navy-600 text-white py-2 px-4 rounded" onSubmit={(e)=> handleSubmit(e)}>
        Submit
      </button>
    </form>
</>
    
  );
};

export default PatientForm;
