# Submission status — November 13, 2026

## Chrome Web Store: pending review

Calendar Rail version **1.1.1** was submitted through the existing Tylor Mayfield publisher account. Google displayed **“Your extension was submitted for review”** and then **“Status: Pending review.”** Automatic publication after approval is enabled. The listing is not confirmed live.

- Publisher ID: `2ccfa84d-a94d-40d5-b6c7-2e40aeebc196`.
- Extension ID: `plldfijkfajlloicafdcealbdncedljn`.
- Dashboard: https://chrome.google.com/webstore/devconsole/2ccfa84d-a94d-40d5-b6c7-2e40aeebc196/plldfijkfajlloicafdcealbdncedljn/edit/status
- Category: Workflow & Planning. Language: English (United States).
- Distribution: Free of charge; Public; All regions. No in-app purchases.
- Original icon, two current 1280×800 screenshots and 440×280 promotional tile uploaded. Actual Chrome captures are cropped to exclude private message/event content.
- Full description includes companion-view limitations, Gmail page-modification explanation and exact independence disclaimer.
- Privacy: no user-data collection categories selected; single-purpose and Gmail-only host justification saved; all three limited-use disclosures certified; project-specific privacy URL saved.
- Homepage/official website: Tylor.nz. Support: https://www.tylor.nz/support/.
- Reviewer instructions saved; no extension-owned login or test credentials.
- A native screenshot of the submission receipt is retained locally at `build/chrome-submission-receipt.png` and is intentionally not in the public repository.

No purchase or new agreement was accepted. Outstanding live two-account and additional acceptance checks are accurately recorded in verification.md; they are not claimed complete by this submission record.

## Mac App Store: not ready for submission

Existing Apple account: Tylor Mayfield, team `3TTDK9YYV5`.

- App ID `6834452908`; macOS only; SKU `calendar-rail-macos`.
- App record: https://appstoreconnect.apple.com/apps/6834452908/distribution
- Bundle ID `com.tylormayfield.calendarrail`; extension `com.tylormayfield.calendarrail.Extension`.
- Version metadata updated to **1.1.1**, describing the center workspace and its limitations. Reviewer notes saved; the extension has no login of its own.
- A $0.00 price schedule was confirmed for all 175 countries/regions and saved. Availability setup and remaining review metadata/assets are not complete.
- Privacy URL and Data Not Collected questionnaire remain saved drafts; no privacy-publish confirmation or app review submission is claimed.
- Universal local wrapper builds successfully, but installed Safari extension acceptance is still blocked by signing. No valid local signing identities were found.

### Apple cloud packaging attempts

Apple’s Safari Web Extension Packager accepted two uploads under the correct app record:

| Version/build | Archive | Result |
| --- | --- | --- |
| 1.1.1 (1) | Original shared Chrome archive | Service Error |
| 1.1.1 (2) | Safari archive with display name Calendar Rail and original 1024px icon | Service Error after retry |

The packager’s Update flow required the manifest name to match the app record exactly. `npm run package` now creates a Safari-specific metadata archive while keeping all executable files byte-for-byte identical to Chrome. Both recorded cloud attempts failed. No distributable signed build was confirmed, no build selected for review, no review submission made, and no Mac listing is live. No compute upgrade or purchase was made and no new agreement accepted.

To proceed: obtain a successfully signed build, either through a working Apple cloud packager or signing both Xcode targets with the existing developer team. Then install and test the actual Safari extension, capture current Safari screenshots, complete remaining review metadata/availability and submit. Do not substitute Chrome or fixture captures as proof of installed Safari behavior.

## Existing Chrome listings and Tylor.nz contacts

At the user’s request, these public items were **unpublished and archived**, not permanently deleted:

- Jotterly: `kpemlbnlchdbcgcplcgnhdjcpnlnfpca`.
- Hannaford Coupons Auto-Clipper: `edapchghadmippmkfbkhjjfapamofmji`.

Both disappeared from active items, appeared as drafts in the Archived filter, and publisher usage fell from 5/5 to 3/5 before Calendar Rail was added.

Public publisher contact email was changed from the old Otter Labs address to **hello@barkontrack.com**, the contact address published on Tylor.nz. The Google verification email was received and completed, and the dashboard confirmed the new address verified. No verification token is stored in this repository.

Website/homepage/support fields were updated to Tylor.nz and https://www.tylor.nz/support/ for Universal Sign Out, Tab Refresh and Chrome Extension Template. Each metadata update was submitted for review with automatic publication after approval. Do not claim the new public listing details are already live before Google confirms them.

## GitHub

Public repository: https://github.com/TylorMayfield/calendar-rail. Source, packages, original assets, privacy policy and verification evidence are maintained there. No credentials, signing keys, private messages, calendar event content or verification links belong in the repository.
