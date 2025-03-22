import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  age: string;
  clinicArea: string;
  gramaNiladariDivision: string;
  homeAddress: string;
  mobileNumber: string;
  emergencyNumber: string;
  gravidity: string;
  youngestChildAge: string;
  height: string;
  weight: string;
  bloodGroup: string;
  allergies: string;
  educationLevel: string;
  job: string;
  husbandName: string;
  husbandAge: string;
  husbandContact: string;
  pastMedicalReport: string;
  pastPregnancyHistory: string;
  otherSpecial: string;
}

export function NewRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    clinicArea: '',
    gramaNiladariDivision: '',
    homeAddress: '',
    mobileNumber: '',
    emergencyNumber: '',
    gravidity: '',
    youngestChildAge: '',
    height: '',
    weight: '',
    bloodGroup: '',
    allergies: '',
    educationLevel: '',
    job: '',
    husbandName: '',
    husbandAge: '',
    husbandContact: '',
    pastMedicalReport: '',
    pastPregnancyHistory: '',
    otherSpecial: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.clinicArea) newErrors.clinicArea = 'Clinic Area is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required';
    
    // Validate mobile number format
    const phoneRegex = /^\+?[0-9]{10,12}$/;
    if (formData.mobileNumber && !phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid phone number format';
    }
    
    // Validate age range
    const age = parseInt(formData.age);
    if (age < 15 || age > 60) {
      newErrors.age = 'Age must be between 15 and 60';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const renderField = (
    label: string,
    name: keyof FormData,
    type: string = 'text',
    required: boolean = true,
    options?: string[]
  ) => {
    const commonClasses = `w-full p-2 border rounded-lg ${
      errors[name] ? 'border-red-500' : 'border-gray-300'
    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`;

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'select' && options ? (
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={commonClasses}
          >
            <option value="">Select {label}</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            rows={4}
            className={commonClasses}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={commonClasses}
          />
        )}
        {errors[name] && (
          <div className="flex items-center space-x-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors[name]}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Full Name', 'name')}
          {renderField('Age', 'age', 'number')}
          {renderField('Clinic Area', 'clinicArea')}
          {renderField('Grama Niladari Division', 'gramaNiladariDivision')}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Home Address', 'homeAddress', 'text')}
          {renderField('Mobile Number', 'mobileNumber', 'tel')}
          {renderField('Emergency Number', 'emergencyNumber', 'tel')}
        </div>
      </div>

      {/* Pregnancy Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Pregnancy Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Gravidity', 'gravidity', 'number')}
          {renderField('Age of Youngest Child', 'youngestChildAge', 'number', false)}
        </div>
      </div>

      {/* Health Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Health Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Height (cm)', 'height', 'number')}
          {renderField('Weight (kg)', 'weight', 'number')}
          {renderField('Blood Group', 'bloodGroup', 'select', true, [
            'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
          ])}
          {renderField('Allergies', 'allergies', 'text', false)}
        </div>
      </div>

      {/* Education and Employment */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Education and Employment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Education Level', 'educationLevel', 'select', true, [
            'Primary', 'Secondary', "Bachelor's Degree", "Master's Degree", 'PhD', 'Other'
          ])}
          {renderField('Job', 'job')}
        </div>
      </div>

      {/* Husband Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Husband Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField("Husband's Name", 'husbandName')}
          {renderField("Husband's Age", 'husbandAge', 'number')}
          {renderField("Husband's Contact", 'husbandContact', 'tel')}
        </div>
      </div>

      {/* Medical History */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
        <div className="space-y-6">
          {renderField('Past Medical Report', 'pastMedicalReport', 'textarea')}
          {renderField('Past Pregnancy History', 'pastPregnancyHistory', 'textarea')}
          {renderField('Other Special Notes', 'otherSpecial', 'textarea', false)}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Submit Registration
        </button>
      </div>
    </form>
  );
}