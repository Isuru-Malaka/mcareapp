import React, { useState } from 'react';
import { MedicineReminder } from '../types';

interface MedicineReminderFormProps {
  onSubmit: (reminder: Partial<MedicineReminder>) => void;
}

export function MedicineReminderForm({ onSubmit }: MedicineReminderFormProps) {
  const [recipientType, setRecipientType] = useState<'single' | 'group'>('single');
  const [formData, setFormData] = useState({
    recipientId: '',
    medicineName: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      motherId: formData.recipientId
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="single"
              checked={recipientType === 'single'}
              onChange={(e) => setRecipientType(e.target.value as 'single' | 'group')}
              className="mr-2"
            />
            Single Recipient
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="group"
              checked={recipientType === 'group'}
              onChange={(e) => setRecipientType(e.target.value as 'single' | 'group')}
              className="mr-2"
            />
            Group
          </label>
        </div>

        <input
          type="text"
          name="recipientId"
          placeholder={recipientType === 'single' ? "Mother's ID" : 'Group Number'}
          value={formData.recipientId}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={formData.medicineName}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="text"
          name="dosage"
          placeholder="Dosage"
          value={formData.dosage}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="text"
          name="frequency"
          placeholder="Frequency (e.g., 3 times a day)"
          value={formData.frequency}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded-lg resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Send Reminder
      </button>
    </form>
  );
}