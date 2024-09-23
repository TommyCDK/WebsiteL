from flask import Flask, request, render_template
import csv
import os
from datetime import datetime

app = Flask(__name__)

# Ensure the data directory exists
data_dir = 'data'
if not os.path.exists(data_dir):
    os.makedirs(data_dir)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Get form data
    category1 = request.form['category1']
    category2 = request.form['category2']
    category3 = request.form['category3']
    category4 = request.form['category4']
    category5 = request.form['category5']

    # Create a timestamp for the filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f'categories_{timestamp}.csv'
    filepath = os.path.join(data_dir, filename)

    # Write data to CSV file
    with open(filepath, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'])
        writer.writerow([category1, category2, category3, category4, category5])

    return 'Data has been successfully written to a CSV file on the server.'

if __name__ == '__main__':
    app.run(debug=True)