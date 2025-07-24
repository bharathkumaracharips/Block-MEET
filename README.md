# Block-MEET - Decentralized Video Conferencing

A blockchain-powered video conferencing platform built with Next.js and Solidity smart contracts.

## 🚀 Features

- **Decentralized Architecture**: Built on blockchain technology for enhanced security
- **IPFS Integration**: Secure file storage and sharing
- **Real-time Video Conferencing**: WebRTC-powered video calls
- **Smart Contract Integration**: User registry and meeting management
- **Modern UI**: Responsive design with Tailwind CSS and Framer Motion

## 📁 Project Structure

```
Block-MEET/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── meeting/           # Meeting-related pages
│   │   │   ├── create/        # Create meeting page
│   │   │   ├── join/          # Join meeting page
│   │   │   ├── conference/    # Conference room
│   │   │   └── chat/          # Chat functionality
│   │   ├── contact/           # Contact page
│   │   ├── login/             # Wallet connection
│   │   └── search/            # Search functionality
│   ├── components/            # Reusable React components
│   │   ├── home/              # Home page components
│   │   └── layout/            # Layout components
│   ├── contexts/              # React contexts
│   └── types/                 # TypeScript type definitions
├── contracts/                 # Solidity smart contracts
├── migrations/                # Truffle migration scripts
└── public/                    # Static assets
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Block-MEET
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Truffle globally**
   ```bash
   npm install -g truffle
   ```

4. **Compile smart contracts**
   ```bash
   truffle compile
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Development

### Frontend Development
- Built with **Next.js 14** and **React 18**
- Styled with **Tailwind CSS**
- Animations with **Framer Motion**
- Icons from **Lucide React**

### Blockchain Development
- Smart contracts written in **Solidity**
- Deployed using **Truffle**
- Web3 integration with **ethers.js**

### Key Components

#### Meeting Flow
1. **Home Page** (`src/app/page.tsx`) - Landing page with hero section
2. **Create Meeting** (`src/app/meeting/create/page.tsx`) - Generate unique meeting IDs
3. **Join Meeting** (`src/app/meeting/join/page.tsx`) - Enter meeting ID to join
4. **Conference Room** (`src/app/meeting/conference/[id]/page.tsx`) - Video conferencing interface
5. **Chat** (`src/app/meeting/chat/page.tsx`) - Real-time messaging

#### Web3 Integration
- **Web3Context** (`src/contexts/Web3Context.tsx`) - MetaMask wallet connection
- **UserLinkRegistry** (`contracts/UserLinkRegistry.sol`) - User data storage

## 🎨 Styling

The project uses a custom design system with:
- **Dark theme** with black background
- **Custom button styles** (`.btn-primary`, `.meeting-button`, etc.)
- **Responsive design** for mobile and desktop
- **Smooth animations** and transitions

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy smart contracts**
   ```bash
   truffle migrate --network <network-name>
   ```

3. **Start production server**
   ```bash
   npm start
   ```

## 🔗 IPFS Integration

The application includes IPFS integration for decentralized file storage. Access the IPFS interface at `http://localhost:3000` when running locally.

## 👥 Team

**TEAM ANONYMOUS**

## 📄 License

MIT License - see LICENSE file for details.