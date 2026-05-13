# Authentication Design

## Approach
Supabase for auth and secure data storage (HIPAA-eligible infrastructure).

## Registration Fields
- Full name
- Email
- Password
- Family role: Father / Mother / Son / Daughter

## Session Behavior
- "Remember me" persistent login per device
- JWT tokens stored securely via Supabase client
- Auto-refresh so users rarely need to log in again

## Security Considerations
- App handles sensitive personal/emotional data — treat as PHI-adjacent
- Row-level security: each user sees only their own entries
- All data encrypted at rest via Supabase
- Never store passwords or tokens in window.storage or localStorage

## Status
⏳ Not yet built — planned as next major feature
