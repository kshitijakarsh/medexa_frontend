# Module Assignment Step Implementation

## Overview

This implementation adds TanStack Query and zustand to the Module Assignment step of the hospital onboarding wizard.

## Files Created

### 1. Mock API Layer
**Location:** `lib/api/mock/modules.ts`

- `getModules()` - Returns a list of 6 modules with id, name, and description
- `updateTenantModules(tenantId, payload)` - Mock mutation that simulates saving selected modules
- 500ms delay for GET, 800ms delay for PUT to simulate network latency
- 5% random error rate for testing error handling

### 2. Zustand Store
**Location:** `stores/onboarding.ts`

- Tracks module selection state: `modules.selectedIds` and `modules.status`
- Status types: 'idle' | 'saved' | 'skipped'
- Actions: `setModules()`, `saveModules()`, `skipModules()`, `resetModules()`
- Persisted to `sessionStorage` using zustand's persist middleware

### 3. Updated Files

#### `components/providers.tsx`
- Added `QueryClientProvider` from TanStack Query
- Configured with sensible defaults (60s stale time, no refetch on window focus)

#### `app/[lang]/onboarding/_components/ModuleStepForm.tsx`
- Complete rewrite to use TanStack Query and zustand
- `useQuery` with key `['modules']` for fetching modules
- `useMutation` with key `['tenant', 'modules']` for saving
- Optimistic UI updates in `onMutate` callback
- Skip button functionality
- Loading state during mutation
- Error display
- Navigation to `/onboarding/payment` on success

#### `app/[lang]/onboarding/_components/sections/ModulesAssignmentSection.tsx`
- Updated to accept `modules` prop from TanStack Query
- Displays module descriptions in dropdown
- Shows selected modules as badges
- Wider popover (400px) to accommodate descriptions

## Query Keys

- **GET Modules:** `['modules']`
- **PUT Tenant Modules:** `['tenant', 'modules']`

## Features

✅ Mock API with realistic delays and error simulation
✅ TanStack Query for data fetching and mutations
✅ Zustand store for state management
✅ SessionStorage persistence
✅ Optimistic UI updates
✅ Skip functionality (marks as 'skipped' and navigates)
✅ Save functionality (validates, saves, marks as 'saved', navigates)
✅ Loading states
✅ Error handling and display
✅ Module descriptions in UI
✅ State preserved across navigation/page reloads

## Usage

1. Navigate to `/[lang]/onboarding/modules?hospitalId=xxx`
2. Modules load automatically via TanStack Query
3. Select/deselect modules using the dropdown or badge X buttons
4. Click "Skip" to mark as skipped and navigate to payment step
5. Click "Save & Continue" to validate, save, and navigate to payment step
6. State is preserved in sessionStorage

## Testing

The mock API includes:
- 500ms delay for module loading
- 800ms delay for save mutation
- 5% chance of random error to test error handling

To test:
1. Open browser DevTools → Application → Session Storage
2. Look for `onboarding-storage` key
3. Verify state persists across page reloads
4. Test Skip and Save buttons
5. Verify navigation to payment step
