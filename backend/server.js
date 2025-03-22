const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import cors

const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();
const port = 5001;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Default MySQL user in XAMPP
  password: '',        // Default MySQL password in XAMPP is empty
  database: 'mcare',    // Replace with your database name
  waitForConnections: true,  // Ensures that the connection pool will wait for an available connection
  connectionLimit: 10,  // The maximum number of connections to create
  queueLimit: 0         // No limit to the connection queue
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to handle form submission for user registration
app.post('/register', (req, res) => {
  const formData = req.body;

  // Create a MySQL query to insert the form data into the database
  const query = `
    INSERT INTO users (name, age, clinicArea, gramaNiladariDivision, homeAddress, mobileNumber, emergencyNumber, gravidity, youngestChildAge, height, weight, bloodGroup, allergies, educationLevel, job, husbandName, husbandAge, husbandContact, pastMedicalReport, pastPregnancyHistory, otherSpecial)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Extract the data from the form
  const values = [
    formData.name,
    formData.age,
    formData.clinicArea,
    formData.gramaNiladariDivision,
    formData.homeAddress,
    formData.mobileNumber,
    formData.emergencyNumber,
    formData.gravidity,
    formData.youngestChildAge,
    formData.height,
    formData.weight,
    formData.bloodGroup,
    formData.allergies,
    formData.educationLevel,
    formData.job,
    formData.husbandName,
    formData.husbandAge,
    formData.husbandContact,
    formData.pastMedicalReport,
    formData.pastPregnancyHistory,
    formData.otherSpecial
  ];

  // Insert the data into the database
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).send('Error inserting data');
    }
    res.status(200).send('Registration successful');
  });
});



// Endpoint to fetch all registered persons (users)
app.get('/registered-persons', (req, res) => {
    const query = 'SELECT * FROM users ORDER BY id DESC';  // Fetch users sorted by ID
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching users from the database:', err);
        return res.status(500).send('Error fetching registered persons');
      }
      res.status(200).json(result);  // Send the users data as a JSON response
    });
  });
  




// Endpoint to handle medicine reminder submission
app.post('/medicine-reminder', (req, res) => {
  const formData = req.body;

  const query = `
    INSERT INTO medicine_reminders (mother_id, medicine_name, dosage, frequency, start_date, end_date, additional_notes, recipient_type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    formData.motherId,
    formData.medicineName,
    formData.dosage,
    formData.frequency,
    formData.startDate,
    formData.endDate,
    formData.additionalNotes,
    formData.recipientType
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the medicine reminders table:', err);
      return res.status(500).send('Error inserting data');
    }
    res.status(200).send('Medicine reminder successfully added');
  });
});




// Endpoint to handle message submission
app.post('/send-message', (req, res) => {
    const formData = req.body;
  
    // Create a MySQL query to insert the message data into the database
    const query = `
      INSERT INTO messages (mother_id, message, recipient_type)
      VALUES (?, ?, ?)
    `;
  
    const values = [
      formData.motherId,
      formData.message,
      formData.recipientType
    ];
  
    // Insert the message into the database
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        return res.status(500).send('Error inserting data');
      }
      res.status(200).send('Message sent successfully');
    });
  });
  



// Endpoint to fetch all messages (Outbox)
app.get('/outbox', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY sent_at DESC';
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching messages from the database:', err);
        return res.status(500).send('Error fetching messages');
      }
      res.status(200).json(result);  // Send the messages in response
    });
  });




 // Enable CORS for cross-origin requests
app.use(cors());

// Configure Multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/articles'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Maximum file size 10MB
});







// Endpoint for uploading article data and file
app.post('/upload-article', upload.single('file'), (req, res) => {
    const { title } = req.body;
    const fileName = req.file ? req.file.filename : null;
    const uploadDate = new Date().toISOString().split('T')[0];
  
    const query = `
      INSERT INTO articles (title, fileName, uploadDate)
      VALUES (?, ?, ?)
    `;
  
    db.query(query, [title, fileName, uploadDate], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).send('Error uploading article');
      }
      res.status(200).send('Article uploaded successfully');
    });
  });
  
  // Endpoint to retrieve all articles
  app.get('/get-articles', (req, res) => {
    const query = 'SELECT * FROM articles';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving articles:', err);
        return res.status(500).send('Error fetching articles');
      }
      res.json(results);
    });
  });
  

  // Video upload endpoint
app.post('/upload-video', upload.single('video'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No video file uploaded');
    }
  
    const { title } = req.body;
    const videoFile = req.file;
  
    const videoDetails = {
      title: title,
      file_name: videoFile.filename,
      file_path: videoFile.path,
    };
  
    // Insert video details into the database
    const query = 'INSERT INTO videos (title, file_name, file_path) VALUES (?, ?, ?)';
    db.query(query, [videoDetails.title, videoDetails.file_name, videoDetails.file_path], (err, result) => {
      if (err) {
        console.error('Error saving video to database:', err);
        return res.status(500).send('Failed to save video');
      }
  
      res.status(200).send('Video uploaded successfully');
    });
  });






// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
