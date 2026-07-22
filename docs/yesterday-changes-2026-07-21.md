# Zeefood Web - Yesterday Changes

Date covered: July 21, 2026

Note: No Git commits were found for this date. This document is based on the current uncommitted working tree changes and files modified or added around July 21, 2026.

## Summary

Yesterday's work focused on refreshing the Zeefood web experience with stronger branding, Urdu typography, improved food imagery, carousel-style category browsing, and a redesigned location/order selection modal.

## Main Changes

### 1. Hero Section Refresh

- Reworked the home hero into a client-side rotating product showcase.
- Added rotating food items including Pulao, Nuggets, Roll, Kabab, Dal Haleem, and Dahi Bhala.
- Added animated image transitions and copy fade effects.
- Introduced Urdu brand text for "Amma G Ka Dhaba".
- Updated the hero visual direction from a single biryani image to multiple featured food products.

Files:

- `src/components/home/Hero.tsx`
- `src/app/globals.css`
- `public/plao.png`
- `public/nugits.png`
- `public/roll.png`
- `public/kabab.png`
- `public/dalhallem.png`
- `public/dahibhala.png`

### 2. Urdu Font And Brand Typography

- Added a local Urdu font face named `KhanBaba`.
- Updated global Urdu font handling for `lang="ur"`, RTL content, and helper classes.
- Removed the Google-hosted `Noto_Nastaliq_Urdu` setup from the root layout.
- Kept Poppins as the primary English/UI font.

Files:

- `src/app/globals.css`
- `src/app/layout.tsx`
- `public/fonts/474a7d37-1c01-48a7-abdb-0be3a4f4096e.ttf`
- `fonts/474a7d37-1c01-48a7-abdb-0be3a4f4096e.ttf`

### 3. Location Modal Redesign

- Rebuilt the location modal with a cleaner branded design.
- Added Delivery and Pick-Up order modes.
- Added current-location style action.
- Added branch/area selector behavior.
- Added structured `sessionStorage` saving for order type, city, area, branch, address, and timestamp.
- Added icons from `lucide-react` for visual clarity.

Files:

- `src/components/common/LocationModal.tsx`

### 4. Navigation Updates

- Updated navbar styling and behavior.
- Improved responsive layout and visual polish.
- Continued aligning the navigation with the refreshed Zeefood/Ama G Ka Dhaba branding.

Files:

- `src/components/common/Navbar.tsx`

### 5. Home Menu Category Cards

- Updated the home Explore Menu section with a horizontal carousel layout.
- Added category background images.
- Added left/right desktop scroll controls.
- Improved category card styling with stronger food imagery and Urdu display support.

Files:

- `src/components/home/ExploreMenu.tsx`
- `public/desi_compressed.webp`
- `public/drinks_compressed.webp`
- `public/extra_items_compressed.webp`
- `public/chaat_compressed.webp`
- `public/achar_compressed.webp`
- `public/frozen_compressed.webp`

### 6. Order Page Category Bar

- Replaced simple category pills with larger image-backed category buttons.
- Added scroll controls for browsing categories.
- Added category image and display-name maps.
- Improved Urdu category display for Desi and related categories.

Files:

- `src/components/order/OrderPage.tsx`

### 7. Configuration And Dependency Updates

- Added `fontkit` to project dependencies.
- Updated ESLint and TypeScript config to exclude the generated worktree folder from checks.
- Updated `package-lock.json` after dependency changes.

Files:

- `package.json`
- `package-lock.json`
- `eslint.config.mjs`
- `tsconfig.json`

### 8. New Visual Assets

Added new public images for hero products, category backgrounds, and branding support.

Assets include:

- `public/achar_compressed.webp`
- `public/background image.png`
- `public/bg2.png`
- `public/chaat_compressed.webp`
- `public/dahibhala.png`
- `public/dalhallem.png`
- `public/desi_compressed.webp`
- `public/drinks_compressed.webp`
- `public/extra_items_compressed.webp`
- `public/frozen_compressed.webp`
- `public/kabab.png`
- `public/nugits.png`
- `public/plao.png`
- `public/roll.png`
- `public/fonts/`
- `fonts/`

## Technical Notes

- Current diff size: 11 tracked files changed with about 769 additions and 307 deletions.
- Additional untracked files include image assets, font files, and a generated worktree folder.
- The worktree folder `Zeefood-web.worktrees/` is now excluded from ESLint and TypeScript checks.

## Suggested Follow-Up

- Review the new hero and category carousel on mobile and desktop.
- Confirm the Urdu font renders correctly on all supported browsers.
- Check whether the duplicated root `fonts/` folder is needed, since the app references fonts from `public/fonts/`.
- Decide whether the generated `Zeefood-web.worktrees/` folder should stay untracked or be moved outside the project.
