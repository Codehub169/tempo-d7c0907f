#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Navigate to the directory where the script is located (optional, assumes execution from project root)
# cd "$(dirname "$0")"

# Inform the user about the process
echo "Starting up hueneu website..."

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Build the project
echo "Building the project..."
npm run build

# Step 3: Start the application on port 9000
echo "Starting application on http://localhost:9000 ..."
npm run preview

echo "hueneu website setup complete and running."
