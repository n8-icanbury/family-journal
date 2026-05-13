# Family ABC Journal — Project Brief

## What It Is
A mobile-first React app for family therapy journaling using the CBT ABC framework (Activating Event → Belief → Consequence). Built for a family using CPT for PTSD therapy with a therapist.

## Tech Stack
- **Frontend:** React + Vite (local: `C:\Dev\family-journal`)
- **Styling:** Apple iOS Human Interface Guidelines — system colors, SF Pro font, grouped table view layout
- **Storage:** `window.storage` (Claude artifact) with `?.` optional chaining for local dev
- **Backend:** Anthropic API + Notion MCP for saving entries to Notion
- **Repo:** https://github.com/n8-icanbury/family-journal

## Dev Environment (Windows)
- Git 2.54, Node v24.15, npm 11.12
- VS Code with Prettier, ESLint, GitLens, Error Lens, ES7 React snippets
- Claude Code installed and authenticated in VS Code Terminal
- Projects stored in `C:\Dev\` — never OneDrive

## Current Features
- Setup screen: name + family members, persisted to device
- ABC form: voice input, 10 example suggestions per field, progress bar
- MVP Shoutout: weekly recognition dropdown (can't pick yourself)
- Celebration screen: confetti, fireworks, disco ball, Sam (grey cat) + Arya (tuxedo cat) dancing
- Replace screen: optional belief rewrite with voice input
- Lootbox: 20 rotating affirmations
- Notion sync: auto-creates database on first submit, adds rows after

## Next Features (priority order)
1. User authentication + registration (name, family role: Father/Mother/Son/Daughter)
2. Persistent secure login with "remember me" per device
3. Supabase for auth and secure data storage (HIPAA-eligible)
4. Expo React Native conversion for iOS push notifications + widgets

## Design Decisions
- Apple HIG aesthetic throughout
- Celebration screen stays dark/festive intentionally
- No localStorage — use `window.storage?.` with optional chaining
