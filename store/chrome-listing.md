# Chrome Web Store copy — workspace development version

Name: Calendar Rail — shortcut for Gmail
Short description / subtitle: Calendar shortcut for Gmail
Category: Productivity
Price: Free
Language: English (U.S.)

## Description

Add a Calendar button below Mail, Chat and Meet in Gmail’s left navigation. Select it to expand Gmail’s built-in Calendar companion across the center workspace, without opening a new tab. Select Mail, Chat or Meet to return.

This uses the Calendar companion’s available views and features, rather than the full standalone Calendar website. Gmail handles sign-in and account selection. Gmail’s right side panel must be shown, and your organization may restrict Calendar.

The original outline icon follows Gmail’s text color and supports narrow navigation. Unknown layouts hide the button or show an opening error. Refresh Gmail after installation or updates.

Free. No ads, subscriptions, analytics, backend, account connection or persistent storage. No reading of messages, attachments, contacts, account addresses or calendar event contents. No network API calls or developer servers.

Your browser asks to read and change data on mail.google.com. That access is necessary to add the button, activate Gmail’s existing Calendar control and resize its panel. No Calendar host access or extra extension API permissions are requested.

This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.

## Links

Source: https://github.com/TylorMayfield/calendar-rail
Support: https://github.com/TylorMayfield/calendar-rail/issues
Privacy: https://github.com/TylorMayfield/calendar-rail/blob/main/PRIVACY.md

## Privacy fields

Single purpose: Expand Gmail’s own Calendar companion into its center workspace from a left-navigation button.
Page access justification: A declarative content script runs only on https://mail.google.com/mail/* to insert a button, activate the existing Calendar control and resize its panel. It inspects navigation/control state and frame geometry, not message or event content. No tabs, Calendar host, identity, cookies or storage permission.
Developer collection: None. No tracking, remote code, analytics, diagnostic collection or developer network requests. Google’s native companion loads its own content under Google’s policies.

## Reviewer instructions

Enable the extension for mail.google.com and refresh signed-in Gmail. Show Gmail’s right side panel. Select Calendar below Meet (or below Compose in recognized mail-only layouts). Calendar’s companion should fill the center workspace. Select Mail/Chat/Meet or the native Calendar Close control to restore the underlying app. Verify with each of two signed-in Google accounts and changed account order; no account number is mapped by the extension.

No private test account is supplied. Never upload real message/event content in screenshots. Outstanding installed Safari, live multi-account, fresh-install and update checks are listed in docs/verification.md. Do not submit until those checks and signing/access are resolved. Existing App Store Connect draft metadata and old screenshots still need replacement before submission.
