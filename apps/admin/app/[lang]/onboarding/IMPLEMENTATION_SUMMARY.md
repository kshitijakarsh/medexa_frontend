# Hospital Onboarding Wizard - Implementation Summary

## Overview

Successfully implemented a 5-step hospital onboarding wizard with per-step validation and API saves.

## Files Created

### 1. Schemas (`_components/schemas.ts`)

- Defined Zod validation schemas for all 5 steps
- Each step has its own schema with appropriate validation rules
- Exported TypeScript types for type safety

### 2. API Client Helpers (`lib/hospitals.ts`)

- `createHospital()` - Step 1: Creates hospital and returns ID
- `updateHospitalModules()` - Step 2: Updates module assignments
- `saveHospitalPayment()` - Step 3: Saves payment details
- `saveHospitalLicense()` - Step 4: Saves license history
- `uploadRegulatoryDoc()` - Step 5: Uploads regulatory document

### 3. Section Components

#### Step 1 Wrapper (`sections/StepHospitalBase.tsx`)

- Wraps existing HospitalInfoSection, AdminAccountSection, and UserCredentialSection
- Maintains logo upload functionality

#### Step 3 (`sections/PaymentDetailsSection.tsx`)

- Gateway ID, Merchant ID, Terminal Key
- Bank details (name, account number, vault path)
- VAT registration and number
- Currency code (3-character limit)

#### Step 4 (`sections/LicenseHistorySection.tsx`)

- Plan key, seats, storage quota
- Start and end dates
- Auto-renew toggle
- License status

#### Step 5 (`sections/RegulatoryDocumentSection.tsx`)

- Document type and authority
- Document number
- Issue and expiry dates
- File upload with preview
- Status and notes

### 4. Updated Components

#### FormActionsSection

- Added wizard mode support with dynamic button labels
- Back button for navigation (hidden on step 1)
- Primary button with configurable labels
- Step indicators (0-4)

#### FormInput

- Added `maxLength` prop for character limits

### 5. Main Wizard (`_components/OnboardWizard.tsx`)

- Manages 5-step flow with state
- Separate form instance for each step
- Per-step validation using Zod
- API calls after successful validation
- Visual step indicator showing progress
- Error handling and loading states
- Success redirect on completion

### 6. Updated Page (`page.tsx`)

- Renders `OnboardWizard` instead of old single-form component

## Step Flow

### Step 1: Hospital Base Information

- Button: "Onboard New"
- Creates hospital via POST `/api/hospitals`
- Returns `hospitalId` for subsequent steps

### Step 2: Module Assignment

- Button: "Next"
- Updates modules via PUT `/api/hospitals/{id}/modules`

### Step 3: Payment Details

- Button: "Next"
- Saves payment via PUT `/api/hospitals/{id}/payment`

### Step 4: License History

- Button: "Next"
- Saves license via PUT `/api/hospitals/{id}/license`

### Step 5: Regulatory Document

- Button: "Onboard New"
- Uploads document via POST `/api/hospitals/{id}/regulatory-docs`
- Redirects to `/hospitals` on success

## Features

✅ Per-step validation using Zod schemas
✅ Per-step API saves (separate requests)
✅ Visual step indicator (1-5)
✅ Back navigation (without saving)
✅ Dynamic button labels ("Onboard New" on steps 1 & 5, "Next" on 2-4)
✅ File upload support (hospital logo, regulatory document)
✅ Error handling with user feedback
✅ Loading states during API calls
✅ Type-safe with TypeScript
✅ No linter errors

## API Endpoints Required

The following endpoints need to be implemented on the backend:

1. `POST /api/hospitals` - Create hospital
2. `PUT /api/hospitals/{id}/modules` - Update modules
3. `PUT /api/hospitals/{id}/payment` - Save payment details
4. `PUT /api/hospitals/{id}/license` - Save license history
5. `POST /api/hospitals/{id}/regulatory-docs` - Upload regulatory document

## Next Steps

To complete the integration:

1. Implement the backend API endpoints listed above
2. Test the entire onboarding flow
3. Add proper error handling for network failures
4. Consider adding a progress save/resume feature
5. Add success notification before redirect
