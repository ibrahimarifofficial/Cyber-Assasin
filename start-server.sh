#!/bin/bash

echo "========================================"
echo "CyberAssassin Development Server"
echo "========================================"
echo ""
echo "Starting local server on port 8000..."
echo ""
echo "Open your browser and navigate to:"
echo "http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

python3 -m http.server 8000

