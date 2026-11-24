# COMPA Mobile

COMPA is an Expo/React Native student companion app that complements the existing Next.js web prototype.

## Architecture

- Expo Router provides file-based navigation and the five-tab experience.
- Supabase provides email/password authentication and private user data.
- AsyncStorage persists the Supabase session.
- `src/data/content.ts` provides the initial reusable content until the shared backend is populated.
- Row Level Security protects profiles, quiz attempts, bookmarks, and study tasks.

## Setup

Requires Node.js 20+ and Android Studio with an emulator, or Expo Go on an Android device.

```powershell
cd 'C:\Users\USER\COMPA Mobile App\COMPA-Mobile-App\mobile'
npm install
Copy-Item .env.example .env
```

Add the Supabase project URL and anon key to `.env`, then open the Supabase SQL editor and run `supabase\schema.sql`.

```powershell
npm start
```

## Run on Android

```powershell
npm run android
```

For a physical device, keep the phone and computer on the same network and scan the Expo QR code.

## Web reuse approach

Reuse static data models and validated API contracts from the web app. Do not import Next.js server components or web-only packages into React Native. When the Supabase schema is shared, both applications can use the same subjects, quiz content, resources, profiles, and progress records.
