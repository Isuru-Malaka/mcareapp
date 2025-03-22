import React, { useState } from 'react';
import { LayoutDashboard, Guitar as Hospital, BookOpen, MessageSquare, UserPlus, FileText, Users, Settings, LogOut, ChevronDown, Video, FileUp, Mail, SendHorizontal, Inbox, Menu, X } from 'lucide-react';
import { MothersList } from './components/MothersList';
import { NewRegistrationForm } from './components/NewRegistrationForm';
import { MedicineReminderForm } from './components/MedicineReminder';

import { ArticleUpload } from './components/ArticleUpload';
import { Mother } from './types';
import { VdoUpload } from './components/VdoUpload'; // Import the VdoUpload component






// Sample data for demonstration
const sampleMothers: Mother[] = [
  {
    id: "M001",
    name: "Sarah Johnson",
    age: 28,
    clinicArea: "Central Clinic",
    gramaNiladariDivision: "Division A",
    homeAddress: "123 Main St",
    mobileNumber: "+94 71 234 5678",
    emergencyNumber: "+94 71 876 5432",
    gravidity: 2,
    youngestChildAge: 3,
    height: 165,
    weight: 65,
    bloodGroup: "O+",
    allergies: "None",
    educationLevel: "Bachelor's Degree",
    job: "Teacher",
    husband: {
      name: "John Johnson",
      age: 30,
      contactNumber: "+94 71 999 8888"
    },
    pastMedicalReport: "No significant medical history",
    pastPregnancyHistory: "One previous normal delivery",
    otherSpecial: "Regular prenatal vitamins",
    bmi: 23.9,
    babyKicks: 12,
    sugarLevel: 95,
    vaccineDates: [
      "2024-01-15",
      "2024-02-15",
      "2024-03-15"
    ],
    deliveryDate: "2024-09-15"
  },
  {
    id: "M002",
    name: "Emily Davis",
    age: 32,
    clinicArea: "East Clinic",
    gramaNiladariDivision: "Division B",
    homeAddress: "456 Oak St",
    mobileNumber: "+94 71 345 6789",
    emergencyNumber: "+94 71 987 6543",
    gravidity: 1,
    youngestChildAge: 0,
    height: 170,
    weight: 70,
    bloodGroup: "A+",
    allergies: "Penicillin",
    educationLevel: "Master's Degree",
    job: "Software Engineer",
    husband: {
      name: "Michael Davis",
      age: 34,
      contactNumber: "+94 71 777 6666"
    },
    pastMedicalReport: "Mild asthma",
    pastPregnancyHistory: "First pregnancy",
    otherSpecial: "Taking asthma medication",
    bmi: 24.2,
    babyKicks: 15,
    sugarLevel: 90,
    vaccineDates: [
      "2024-02-01",
      "2024-03-01"
    ],
    deliveryDate: "2024-08-20"
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedDropdowns, setExpandedDropdowns] = useState<string[]>([]);
  const [messageType, setMessageType] = useState<'single' | 'group'>('single');
  const [recipientId, setRecipientId] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (section: string) => {
    setExpandedDropdowns(prev =>
      prev.includes(section)
        ? prev.filter(item => item !== section)
        : [...prev, section]
    );
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    closeMobileMenu();
  };


  
  const renderPageContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Total Mothers', value: '2,345', icon: Users, color: 'bg-pink-500' },
              { title: 'New Registrations', value: '128', icon: UserPlus, color: 'bg-blue-500' },
              { title: 'Pending Messages', value: '45', icon: MessageSquare, color: 'bg-purple-500' },
              { title: 'Clinic Visits Today', value: '89', icon: Hospital, color: 'bg-green-500' },
              { title: 'Knowledge Articles', value: '156', icon: BookOpen, color: 'bg-yellow-500' },
              { title: 'Reports Generated', value: '1,890', icon: FileText, color: 'bg-red-500' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                    <p className="text-xl md:text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'clinic':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Medicine Reminder</h2>
            <MedicineReminderForm onSubmit={console.log} />
          </div>
        );

     


        case 'knowledge-Articles':
          return (
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
              <ArticleUpload />
            </div>
          );
  
        

          case 'knowledge-Video Page': // Updated case for video upload
          return (
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
              <VdoUpload /> {/* Render the video upload section */}
            </div>
          );
  









    
      case 'messages-Write Message':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Write Message</h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="single"
                    checked={messageType === 'single'}
                    onChange={() => setMessageType('single')}
                    className="mr-2"
                  />
                  Single Recipient
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="group"
                    checked={messageType === 'group'}
                    onChange={() => setMessageType('group')}
                    className="mr-2"
                  />
                  Group Message
                </label>
              </div>
              <input
                type="text"
                placeholder={messageType === 'single' ? "Mother's ID" : 'Group Number'}
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                placeholder="Type your message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="w-full h-32 p-2 border rounded-lg resize-none"
              />
              <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Send Message
              </button>
            </div>
          </div>
        );

      case 'messages-Inbox':
      case 'messages-Outbox':
        const isInbox = activeSection === 'messages-Inbox';
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">{isInbox ? 'Inbox' : 'Outbox'}</h2>
            <div className="space-y-4">
              {[
                { id: 'M001', name: 'Sarah Johnson', subject: 'Appointment Confirmation', date: '2024-03-15' },
                { id: 'M002', name: 'Emily Davis', subject: 'Test Results', date: '2024-03-14' },
                { id: 'M003', name: 'Maria Garcia', subject: 'Follow-up Questions', date: '2024-03-13' },
              ].map((message, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="font-medium">{message.name}</h3>
                      <p className="text-sm text-gray-600">ID: {message.id}</p>
                    </div>
                    <span className="text-sm text-gray-500 mt-2 sm:mt-0">{message.date}</span>
                  </div>
                  <p className="mt-2">{message.subject}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'register-New Register':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">New Registration</h2>
            <NewRegistrationForm />
          </div>
        );

      case 'register-Registered Persons':
      case 'register-Old Registered':
        const isNew = activeSection === 'register-Registered Persons';
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">{isNew ? 'Registered Persons' : 'Old Registrations'}</h2>
            <MothersList mothers={sampleMothers} />
          </div>
        );

      case 'profiles-View Profiles':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Mother Profiles</h2>
            <MothersList mothers={sampleMothers} />
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <p className="text-gray-600">Select a section from the sidebar to view content</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-white border-r border-gray-200 fixed h-full z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <h1 className="text-xl font-bold text-indigo-600">Mother's Care App</h1>
        </div>
        
        <nav className="mt-2">
          <div className="px-4 space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
              { icon: Hospital, label: 'Clinic', id: 'clinic' },
              {
                icon: BookOpen,
                label: 'Knowledge Hub',
                id: 'knowledge',
                submenu: ['Articles', 'Video Page']
              },
              {
                icon: MessageSquare,
                label: 'Messages',
                id: 'messages',
                submenu: ['Inbox', 'Outbox', 'Write Message']
              },
              {
                icon: UserPlus,
                label: 'Register',
                id: 'register',
                submenu: ['New Register', 'Registered Persons', 'Old Registered']
              },
              {
                icon: FileText,
                label: 'Report',
                id: 'report',
                submenu: ['Upload Report']
              },
              {
                icon: Users,
                label: "Mothers Profile",
                id: 'profiles',
                submenu: ['View Profiles']
              },
            ].map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => item.submenu ? toggleDropdown(item.id) : handleSectionClick(item.id)}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                    activeSection === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                  {item.submenu && (
                    <ChevronDown className={`ml-auto w-4 h-4 transition-transform ${
                      expandedDropdowns.includes(item.id) ? 'transform rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {item.submenu && expandedDropdowns.includes(item.id) && (
                  <div className="ml-9 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem}
                        onClick={() => handleSectionClick(`${item.id}-${subItem}`)}
                        className={`block w-full px-4 py-2 text-sm rounded-lg ${
                          activeSection === `${item.id}-${subItem}` 
                            ? 'text-indigo-600 bg-indigo-50' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 fixed w-full lg:w-[calc(100%-16rem)] z-20">
          <div className="px-4 md:px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 ml-12 lg:ml-0">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5" />
              </button>
              <button className="flex items-center px-3 md:px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="pt-24 px-4 md:px-6 pb-8">
          {renderPageContent()}
        </div>
      </main>
    </div>
  );
}

export default App;