# Calendar Rail privacy policy

Effective November 13, 2026. Developer: Tylor Mayfield.

Calendar Rail adds a shortcut to Gmail's navigation. It does not collect or store email or calendar content, read messages or attachments, read contacts or events, or send content to any server. It has no analytics, tracking, advertising, backend, paid features, account connection, local storage, cookies or external code.

## What runs on Gmail

The extension reads the structure and appearance of Gmail's navigation to insert a Calendar link. It reads the accessible label of the active Google account button to identify the current email address. That address is used only in memory and in the link's `authuser` query so Google Calendar can select the matching signed-in account. The extension does not enumerate the account switcher, read credentials, or copy Gmail's numeric account slot. If the account cannot be identified unambiguously, the link opens Google's account chooser.

## What leaves the browser

The extension makes no background network requests. When you choose Calendar, your browser visits Google Calendar or Google's account chooser. When the active account is known, the normal navigation URL includes that email address, sent directly to Google for account selection. A no-referrer policy prevents sending the Gmail page URL. Google's services and the browser or operating system have their own privacy policies.

The Source, Support and Privacy policy links open GitHub only when you select them. GitHub's own privacy policy applies there. The developer receives no usage reports, browsing history, emails, calendar data or account identifiers from this extension. Information you voluntarily submit in a public GitHub issue is public, so do not include private data.

## Why page access is needed

The only website scope is `https://mail.google.com/mail/*`. Browsers may display a broad warning such as “read and change your data” on mail.google.com. Page access is necessary to add the shortcut and identify the active account from its account button. The code does not use that access to read mail content. It requests no Calendar page access, identity, cookies, tabs, scripting, storage, webRequest or all-sites permission.

Safari may ask you to allow the extension on mail.google.com separately. You can deny or revoke access in Safari Settings → Extensions. Chrome site access can be managed in the extension's Details page. Denying access prevents the shortcut from appearing.

## Retention and removal

There is no extension data to delete. Disable or uninstall Calendar Rail and refresh open Gmail tabs to remove its link. Browser history may retain normal Calendar navigation URLs under your browser's history settings.

Questions: https://github.com/TylorMayfield/calendar-rail/issues

This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.
