document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('categoryForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        let csvContent = '';
        
        // Convert form data to CSV format
        for (let pair of formData.entries()) {
            csvContent += pair[0] + ',' + pair[1] + '\n';
        }
        
        // In a real application, you would send this data to a server
        // For demonstration, we'll just log it to console and show an alert
        console.log(csvContent);
        alert('Form submitted! In a real application, this data would be sent to a server to be written to a CSV file.');
        
        // Optional: Clear the form
        form.reset();
    });
});