# Onboarding Step 1: Module Assignment Implementation Summary

## Changes Made

### 1. Dependencies Added
- **@tanstack/react-query** (^5.90.5) - For data fetching and mutations
- **zustand** (^5.0.8) - For state management with sessionStorage persistence

### 2. Files Created

#### Mock API Layer
- **`apps/admin/lib/api/mock/modules.ts`**
  - `Module` interface with id, name, description
  - `getModules()` - Returns 6 mock modules (IPD, OPD, OT, Pharmacy, Lab, Billing)
  - `updateTenantModules(tenantId, payload)` - Mock mutation for saving
  - Realistic delays: 500ms for GET, 800ms for PUT
  - 5% random error rate for testing

#### State Management
- **`apps/admin/stores/onboarding.ts`**
  - Zustand store with persist middleware (sessionStorage)
  - State: `modules.selectedIds`, `modules.status` ('idle' | 'saved' | 'skipped')
  - Actions: `setModules()`, `saveModules()`, `skipModules()`, `resetModules()`

### 3. Files Modified

#### Query Provider Setup
- **`apps/admin/components/providers.tsx`**
  - Added `QueryClientProvider` with QueryClient
  - Configured with 60s stale time, no refetch on window focus

#### Module Step Form
- **`apps/admin/app/[lang]/onboarding/_components/ModuleStepForm.tsx`**
  - Complete rewrite to use TanStack Query and zustand
  - `useQuery` with key `['modules']` for fetching
  - `useMutation` with key `['tenant', 'modules']` for saving
  - Optimistic UI updates in `onMutate`
  - Skip button functionality
  - Navigation to payment step on success
  - Error handling and display

#### Module Assignment Section
- **`apps/admin/app/[lang]/onboarding/_components/sections/ModulesAssignmentSection.tsx`**
  - Updated to accept `modules` prop (from TanStack Query)
  - Display module descriptions in dropdown
  - Wider popover (400px) to accommodate descriptions
  - Better UI for module selection

## Features Implemented

✅ **Data Fetching**
- TanStack Query fetches modules via mock API
- Loading state during fetch
- Query key: `['modules']`

✅ **State Management**
- Zustand store tracks selected modules and step status
- Persisted to sessionStorage
- State survives page reloads

✅ **Optimistic UI**
- Updates store immediately on mutation start
- Provides instant feedback to users

✅ **Skip Functionality**
- Skip button marks status as 'skipped'
- Navigates to payment step without validation
- Does not save to backend

✅ **Save Functionality**
- Validates form before submission
- Calls mock mutation
- Updates zustand store
- Navigates to payment step on success
- Disables button during save

✅ **Error Handling**
- Displays error messages from mutation
- Console logs for debugging
- Graceful error recovery

✅ **UI/UX**
- Multi-select dropdown with checkboxes
- Module descriptions in dropdown
- Selected modules shown as badges
- Loading states
- Back, Reset, Skip, and Save buttons

## Query Keys Used

- **GET Modules:** `['modules']`
- **PUT Tenant Modules:** `['tenant', 'modules']`

## Navigation Flow

1. User lands on `/[lang]/onboarding/modules?hospitalId=xxx`
2. Modules load automatically
3. User can:
   - Select modules
   - Click "Skip" → Status: 'skipped' → Navigate to payment
   - Click "Save & Continue" → Status: 'saved' → Navigate to payment
4. State preserved in sessionStorage

## Testing Notes

- Mock API includes random errors (5% chance)
- State can be inspected in DevTools → Session Storage → `onboarding-storage`
- Build successful with no type errors
- All existing lint warnings are pre-existing

## Acceptance Criteria Met

✅ Modules load via TanStack Query mock and render as selectable list
✅ Save calls the mock mutation, updates the zustand store, and routes to /onboarding/payment
✅ Skip updates the store and routes forward without error
✅ State is preserved across navigation and page reloads within the session

## Next Steps

- Backend can implement real API endpoints:
  - `GET /api/v1/modules`
  - `PUT /api/v1/tenants/{id}/modules`
- Replace mock API imports with real API client
- Add additional onboarding steps using the same pattern
