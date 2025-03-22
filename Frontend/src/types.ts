export interface Mother {
  id: string;
  name: string;
  age: number;
  clinicArea: string;
  gramaNiladariDivision: string;
  homeAddress: string;
  mobileNumber: string;
  emergencyNumber: string;
  gravidity: number;
  youngestChildAge: number;
  height: number;
  weight: number;
  bloodGroup: string;
  allergies: string;
  educationLevel: string;
  job: string;
  husband: {
    name: string;
    age: number;
    contactNumber: string;
  };
  pastMedicalReport: string;
  pastPregnancyHistory: string;
  otherSpecial: string;
  bmi: number;
  babyKicks: number;
  sugarLevel: number;
  vaccineDates: string[];
  deliveryDate: string;
}

export interface MedicineReminder {
  id: string;
  motherId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

export interface Report {
  id: string;
  motherId: string;
  type: string;
  date: string;
  fileUrl: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string | string[];
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
}