import React from 'react';
import { X } from 'lucide-react';
import { Mother } from '../types';

interface MotherDetailsModalProps {
  mother: Mother;
  onClose: () => void;
}

export function MotherDetailsModal({ mother, onClose }: MotherDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mother Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1">{mother.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <p className="mt-1">{mother.age} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Clinic Area</label>
                <p className="mt-1">{mother.clinicArea}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grama Niladari Division</label>
                <p className="mt-1">{mother.gramaNiladariDivision}</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <p className="mt-1">{mother.mobileNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Number</label>
                <p className="mt-1">{mother.emergencyNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Home Address</label>
                <p className="mt-1">{mother.homeAddress}</p>
              </div>
            </div>
          </section>

          {/* Health Information */}
          <section>
            <h3 className="text-lg font-medium mb-4">Health Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <p className="mt-1">{mother.height} cm</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                <p className="mt-1">{mother.weight} kg</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">BMI</label>
                <p className="mt-1">{mother.bmi.toFixed(1)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <p className="mt-1">{mother.bloodGroup}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sugar Level</label>
                <p className="mt-1">{mother.sugarLevel} mg/dL</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Baby Kicks (24h)</label>
                <p className="mt-1">{mother.babyKicks}</p>
              </div>
            </div>
          </section>

          {/* Pregnancy Information */}
          <section>
            <h3 className="text-lg font-medium mb-4">Pregnancy Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gravidity</label>
                <p className="mt-1">{mother.gravidity}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age of Youngest Child</label>
                <p className="mt-1">{mother.youngestChildAge} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
                <p className="mt-1">{new Date(mother.deliveryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </section>

          {/* Vaccine Dates */}
          <section>
            <h3 className="text-lg font-medium mb-4">Vaccine Dates</h3>
            <div className="grid grid-cols-1 gap-2">
              {mother.vaccineDates.map((date, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <span>{new Date(date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Husband Information */}
          <section>
            <h3 className="text-lg font-medium mb-4">Husband Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1">{mother.husband.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <p className="mt-1">{mother.husband.age} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <p className="mt-1">{mother.husband.contactNumber}</p>
              </div>
            </div>
          </section>

          {/* Medical History */}
          <section>
            <h3 className="text-lg font-medium mb-4">Medical History</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Past Medical Report</label>
                <p className="mt-1 whitespace-pre-wrap">{mother.pastMedicalReport}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Past Pregnancy History</label>
                <p className="mt-1 whitespace-pre-wrap">{mother.pastPregnancyHistory}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Allergies</label>
                <p className="mt-1">{mother.allergies}</p>
              </div>
            </div>
          </section>

          {/* Other Information */}
          <section>
            <h3 className="text-lg font-medium mb-4">Other Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Education Level</label>
                <p className="mt-1">{mother.educationLevel}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job</label>
                <p className="mt-1">{mother.job}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Other Special Notes</label>
                <p className="mt-1 whitespace-pre-wrap">{mother.otherSpecial}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}