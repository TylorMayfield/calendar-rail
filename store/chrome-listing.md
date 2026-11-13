# Chrome Web Store copy

Title: Calendar Rail — shortcut for Gmail

Short description: Add a private Calendar shortcut to Gmail’s left navigation. Free, with no ads or tracking.

Category: Productivity
Price: Free
Language: English (United States)

## Description

Open Google Calendar from Gmail's left app rail. Calendar Rail adds a simple calendar icon below Mail, Chat and Meet and opens Calendar in a new tab.

The shortcut uses the active account address shown in Gmail's account button, rather than assuming Gmail and Calendar share the same account number. If it cannot identify the account, Google's account chooser opens.

The icon follows the page's text color and fits narrow navigation. If Gmail's layout is not recognized, the shortcut stays hidden. When Chat and Meet are disabled, it appears below Compose instead. Refresh Gmail after installation or updates.

Free. No ads, subscriptions, analytics, backend, account connection or persistent storage. It does not read messages, attachments, contacts or calendar events.

Your browser asks to read and change data on mail.google.com. This page access lets Calendar Rail insert the shortcut and identify the active account from its account button. When you select Calendar, your browser sends that account address directly to Google in the normal Calendar navigation URL. No email or calendar content is transmitted.

Google can require sign-in or restrict Calendar through your organization. Gmail layout changes can temporarily hide the shortcut. This extension does not grant access to a Google account or Calendar data.

This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.

## Links

Homepage/source: https://github.com/TylorMayfield/calendar-rail
Support: https://github.com/TylorMayfield/calendar-rail/issues
Privacy: https://github.com/TylorMayfield/calendar-rail/blob/main/PRIVACY.md

## Privacy practices fields

Single purpose: Add a Calendar shortcut to Gmail's left navigation that opens Google Calendar for the active account in a new tab.

Host access justification: The declarative content script runs only on https://mail.google.com/mail/* to add one link to the navigation. It reads the active account button's accessible label to construct an account-specific Calendar link. It does not read or transmit messages, attachments, contacts or events. A normal link opens the new tab, so no tabs permission is requested.

Remote code: No. All executable code is bundled, readable and unminified.

Data disclosure: No developer collection or storage of user data. The active account address is handled transiently on the page and included in a navigation URL sent directly to Google only when the user opens Calendar. This use is disclosed in the popup, description and privacy policy. Review the exact wording of the dashboard's data-collection categories before certification; do not confuse local handling with developer collection.

No sale or transfer to third parties by the developer. No advertising, creditworthiness or lending use. No browsing history collection. No diagnostics or analytics collection.

## Reviewer steps

Install, refresh a signed-in Gmail tab with Chat/Meet enabled, and choose Calendar below Meet. Verify the new tab's account matches Gmail's account button. With two signed-in accounts, repeat for each; do not rely on numeric slots. If the account button is missing/ambiguous the extension opens Google's account chooser. No special test login is required by the extension. See docs/verification.md for checks actually completed before submission.
