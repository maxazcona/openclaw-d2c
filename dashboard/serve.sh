#!/bin/bash
# Simple HTTP server for OpenClaw Dashboard
# Usage: ./serve.sh [port]

PORT=${1:-8080}

echo "🚀 Starting OpenClaw Dashboard on http://localhost:$PORT"
echo "Press Ctrl+C to stop"
echo ""

# Use Python's built-in HTTP server
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer $PORT
else
    echo "❌ Python not found. Install Python or use another HTTP server."
    exit 1
fi
