# COMPA Mobile

COMPA is a cross-platform student learning app built with Expo, React Native, Expo Router, and Supabase.

## Features

- Quizzes with immediate feedback
- Learning paths for different education levels
- A curated digital library
- Supabase sign-in and account creation
- Password reset by email

## Prerequisites

- Node.js 20 or newer
- npm
- Android Studio and an emulator, or Expo Go
- A Supabase project

## Setup

From the repository root in PowerShell:

```powershell
cd mobile
npm install
Copy-Item .env.example .env
```

Set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `mobile\.env`.
Do not put a Supabase service-role key in this app.

In the Supabase SQL editor, run `mobile\supabase\schema.sql`. Then start the app:

```powershell
npm start
```

Useful start commands:

```powershell
npm run android
npm run web
```

## Validation

```powershell
npx tsc --noEmit
npx expo lint
npx expo-doctor
```
