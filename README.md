# DalFound

A lost-and-found website for Dalhousie University. CSCI 2690 – Team 6.

Live site: https://<jett-moore>.github.io/dalfound/

## Project structure

| File | Purpose |
|---|---|
| `index.html` + `js/browse.js` | Browse page and claim pop-up |
| `post.html` + `js/post.js` | Post a found item |
| `staff.html` + `js/staff.js` | Staff login, claims, return/remove |
| `css/style.css` | Shared styles |
| `js/lists.js` | Set lists for categories, locations and drop-off points |
| `js/firebase-config.js` | Firebase connection settings |
| `test.html` | Temporary database test (delete after Phase 1) |

## Database fields (Firestore)

**items**
- `category` – from `CATEGORIES`
- `locationFound` – from `CAMPUS_LOCATIONS`
- `dateFound` – date, not in the future
- `dropOff` – from `DROP_OFF_LOCATIONS`
- `photo` – shrunk image stored as a base64 string
- `status` – `available`, `returned` or `removed`
- `postedAt` – server timestamp

**claims**
- `itemId` – ID of the item being claimed
- `name`
- `email`
- `detail` – specific detail proving ownership
- `submittedAt` – server timestamp

No field stores ID numbers or student numbers.

## Firebase setup

- Firebase project ID: `dalfound-ff5ce`
- Cloud Firestore database: `(default)`
- Firestore location: `northamerica-northeast1` (Montréal)
- Firebase JavaScript SDK: `13.4.0`
- Email/password authentication is enabled for the staff login.
- The Firebase web configuration is stored in `js/firebase-config.js`.
- Firestore security rules are stored in `firestore.rules`.
- Database write/read connectivity was successfully tested on November 20, 2026.
- The initial Firestore test mode has been disabled.
- Staff read and update permissions will be added as part of WBS 1.4.1.

## How we work

- `main` is protected: create a branch per feature, open a pull request, and get one review before merging.
- Changes merged to `main` go live on GitHub Pages within a few minutes.

## Resetting sample data

_To be written (WBS 1.5.3)._
