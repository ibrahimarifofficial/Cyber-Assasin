# CyberAssassin - Next.js Version

Enterprise-grade Cybersecurity & AI Solutions website built with Next.js 14, React, and TypeScript.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   └── page.tsx            # Main homepage
├── components/             # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   └── ...
├── hooks/                  # Custom React hooks
│   ├── useHeaderNavigation.ts
│   ├── useParticleAnimation.ts
│   ├── useContactModal.ts
│   └── ...
├── styles/
│   └── globals.css        # Global styles (imports all CSS)
├── css/                   # Original CSS files (preserved)
├── public/
│   └── assets/
│       └── images/        # Images and assets
└── package.json
```

## 🎨 Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Particle animation on hero section
- ✅ Testimonial carousel
- ✅ FAQ accordion
- ✅ Contact modal
- ✅ Legal modals (Privacy Policy, Terms)
- ✅ Back to top button
- ✅ Newsletter subscription
- ✅ Counter animations
- ✅ Image optimization with Next.js Image

## 🛠️ Build for Production

```bash
npm run build
npm start
```

## 📝 Notes

- All CSS files are preserved in the `css/` directory
- Images are in `public/assets/images/`
- The project uses Next.js Image component for optimized images
- All JavaScript functionality has been converted to React hooks

## 🔧 Customization

- **Colors**: Edit `css/variables.css`
- **Content**: Edit component files in `components/`
- **Styling**: Edit CSS files in `css/` directory
- **Animations**: Modify hooks in `hooks/` directory

## 📄 License

All rights reserved - CyberAssassin


