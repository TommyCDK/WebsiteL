const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Define the path for the CSV file
const csvFilePath = path.join(__dirname, 'data.csv');

// Function to write data to CSV
const writeToCSV = (data) => {
  const headers = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'];
  const row = `${data.category1},${data.category2},${data.category3},${data.category4},${data.category5}\n`;

  if (!fs.existsSync(csvFilePath)) {
    // If the CSV file doesn't exist, create it and add the headers
    fs.writeFileSync(csvFilePath, `${headers.join(',')}\n`);
  }

  // Append the new row to the CSV file
  fs.appendFileSync(csvFilePath, row);
};

// Endpoint to handle the form submission
app.post('/submit', (req, res) => {
  const data = req.body;
  
  try {
    writeToCSV(data);
    res.status(200).send('Data successfully written to CSV');
  } catch (error) {
    res.status(500).send('Error writing to CSV');
  }
});

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
