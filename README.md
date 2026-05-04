# hackathonbuddy
Hackathon Buddy is a full-stack event CRM for managing hackathons. Create events, handle registrations, generate QR-based tickets, enable secure check-ins, and track real-time analytics for organizers, participants, and volunteers.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Firebase CLI
- Razorpay Account

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd functions && npm install
   ```

### 🔐 Environment Configuration

#### 1. Firebase Functions
Set the following environment variables using the Firebase CLI:
```bash
firebase functions:config:set razorpay.key_id="YOUR_KEY_ID" razorpay.key_secret="YOUR_KEY_SECRET"
firebase functions:config:set email.user="YOUR_GMAIL" email.pass="YOUR_APP_PASSWORD"
```

#### 2. Frontend
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=...
VITE_RAZORPAY_KEY=...
```

## 🏗️ Architecture

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Firebase Cloud Functions (Node.js)
- **Database**: Firestore (Real-time sync)
- **Authentication**: Firebase Auth (RBAC: Admin, Organizer, Volunteer)
- **Payments**: Razorpay Integration
- **Ticketing**: Automated QR generation and email delivery

## 📱 Modules

1. **Marketing**: Premium editorial-style SaaS landing page.
2. **Participant**: Frictionless registration & payment flow.
3. **Organizer**: Data-heavy dashboard with real-time analytics.
4. **Volunteer**: High-speed QR scanning interface.
5. **Admin**: Platform-wide governance and system monitoring.

## 🛠️ Development

Run the development server:
```bash
npm run dev
```

Run Firebase Emulators:
```bash
firebase emulators:start
```

---
Built with ❤️ for the Hackathon Community.
