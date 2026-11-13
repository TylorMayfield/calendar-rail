# Calendar Rail

A free Calendar button below Mail, Chat and Meet in Gmail. Opens Gmail’s own Calendar companion across the center workspace, keeping the same Gmail tab and Google session. Original monochrome icon; shared vanilla JavaScript and Manifest V3 for Chrome and macOS Safari.

**Version 1.1.1 is pending Chrome Web Store review**, with automatic publication after approval. The Mac version is not ready: both Apple cloud packaging attempts returned Service Error and installed Safari acceptance remains unverified. Neither listing is confirmed live. See [verification](docs/verification.md) and [submission status](docs/submission-status.md).

Version 1.1.1 fixes sizing from scrolled Mail: Calendar stays below the header, measures current workspace edges and follows zoom/menu changes. Verified in live Chrome at 100%, 125% and 150%.

## Privacy and permissions

The only website scope is `https://mail.google.com/mail/*`. Browsers may describe this as permission to read and change data on mail.google.com. Page modification is needed to add the button, activate Gmail’s existing Calendar control and resize its frame. The extension does not read account identities, messages, attachments, contacts, event contents or the Calendar frame document. Gmail handles Calendar authentication and account selection.

No extension API permissions, Calendar host access, background worker, backend, account connection, analytics, ads, subscriptions, network API calls or persistent storage. [Privacy policy](PRIVACY.md).

## Development installation

Chrome: load `extension/` at `chrome://extensions` using **Load unpacked**, then refresh Gmail. Show Gmail’s right side panel, and select **Calendar** below Meet. Select Calendar again, its native Close control, or Mail/Chat/Meet to return. With Chat and Meet disabled, the button appears below Compose when that layout is recognized.

Safari on macOS: open `safari/Calendar Rail.xcodeproj`, configure the existing developer team for both targets, build/run, then enable Calendar Rail in Safari **Settings → Extensions** and allow mail.google.com. A valid signed build is still needed for installed Safari acceptance. See [Safari instructions](docs/safari.md).

Node 22+; no npm dependencies:

```sh
npm test
npm run check
npm run package
npm run test:browser
```

The generated browser harness is a synthetic fixture, not real Google authentication. See [testing](docs/testing.md).

## Limits

This expands Gmail’s built-in Calendar companion. It does not embed the full standalone Calendar website or add its week/month interface. Its available views, colors and features are controlled by Google. Gmail’s right side panel must be available. Calendar can be restricted by an organization.

Gmail has no supported extension point for adding app-rail buttons or expanding its companion. The adapter requires known controls, a recognized center region and exactly one Calendar iframe in its panel. Unrecognized layouts hide the shortcut or display an opening error. No security headers are removed, and no frame is navigated or copied. Returning to another app removes owned styles and restores the underlying workspace’s focusability. Gmail experiments, locales and other extensions can affect compatibility.

Multiple live account selection and account reordering must still be tested; no numeric account mapping is assumed or implemented. Refresh Gmail after installation, updates or removal. Source is readable and unminified.

## Branding

The extension icon and generic in-page calendar outline are original. Google and Gmail names explain compatibility only.

This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.
