#!/bin/bash

echo "🚀 Setting up Block-MEET development environment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Compile smart contracts
echo "🔨 Compiling smart contracts..."
npx truffle compile

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Connect your MetaMask wallet"
echo ""
echo "📚 For more information, check the README.md file"