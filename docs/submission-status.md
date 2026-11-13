# Submission status

As of November 13, 2026, neither extension has been submitted for store review. There are no submission receipts and neither listing is live. The requested center-workspace behavior now renders in the Chrome 1.1.0 development build. Submission remains paused for the outstanding acceptance/signing/access gates; see verification.md.

## Chrome Web Store

The existing publisher session for the intended Google account requires fresh reauthentication. The dashboard is at https://chrome.google.com/webstore/devconsole. No new registration, payment or agreement acceptance was performed. Complete that sign-in in the existing browser; do not send credentials in chat. Updated workspace listing/privacy copy is prepared under store/. Existing images describe the old product and require replacement before upload.

## Mac App Store

The existing Apple developer account was verified in App Store Connect and Apple Developer under Tylor Mayfield, team 3TTDK9YYV5.

- Registered app bundle identifier: com.tylormayfield.calendarrail.
- Created macOS-only App Store Connect app record: 6834452908, Calendar Rail.
- Draft: https://appstoreconnect.apple.com/apps/6834452908/distribution
- SKU: calendar-rail-macos. Primary language: English (U.S.).
- Saved version 1.0.1 description, keywords, support and marketing URLs, copyright, subtitle and Productivity category. Required independence disclaimer is in the description.
- Saved privacy policy URL and a Data Not Collected questionnaire draft. The privacy declaration has not been published.
- No build uploaded or selected. No review submission made. No price schedule saved; Free is required before release.
- No new license agreement accepted or purchase made. The default license-agreement section was not edited.

The universal local macOS app builds and launches, but uses ad-hoc signing. No valid local code-signing identities were found by the available CLI. Its Safari extension did not appear in Safari's installed extensions. Configure signing for BOTH targets in Xcode using the existing developer team, then install and test the actual extension. Distribution requires appropriate Apple signing/provisioning or an eligible App Store Connect web-extension packager workflow. The packager was researched but eligibility/compute allowance was not verified; no compute was purchased or consumed through that workflow.

Outstanding acceptance includes two live signed-in Google accounts and real Safari layout/update checks. See verification.md. Version 1.1.0 now expands the native companion in Chrome, but actual Safari and live multi-account behavior remain unverified. Existing App Store draft text still describes 1.0.1; replace it before submission.

## GitHub

Public repository created and initially pushed using the existing GitHub Desktop session: https://github.com/TylorMayfield/calendar-rail. Connected GitHub identity and public visibility verified. No new GitHub login or agreement accepted. The CLI's stale token was not used or changed.
