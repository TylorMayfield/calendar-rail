# Calendar Rail

A free, private Calendar shortcut for Gmail's left app rail, below Mail, Chat and Meet. Opens Google Calendar in a new tab. Shared vanilla JavaScript and Manifest V3 for Chrome and macOS Safari.

**Release status:** development build. Neither store listing is live. Submission is paused following a request for Calendar in Gmail’s center pane; that experimental behavior is not included. See [verification](docs/verification.md) and [submission status](docs/submission-status.md) for evidence and remaining checks.

## Privacy and permissions

The only website scope is `https://mail.google.com/mail/*`. No extension API permissions, background worker, backend, cookies, account connection, analytics, ads, subscriptions or persistent storage.

Your browser can describe the permission as reading and changing data on mail.google.com. It is necessary to insert the shortcut and read the active account email address from the account button. Calendar Rail does not read messages, attachments, contacts or calendar events. An email address is held only while constructing a normal Calendar navigation URL; it is sent to Google only when you open the link. No account numbers are saved or copied between services. If the active identity is ambiguous, Google's account chooser opens.

[Full privacy policy](PRIVACY.md) · [Support](https://github.com/TylorMayfield/calendar-rail/issues)

## Install a development build

### Chrome

1. Download this source or clone the repository.
2. Visit `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select `extension/`.
3. Refresh Gmail. Select **Calendar** below Meet in the left rail.
4. If Chat and Meet are both disabled, a shortcut appears below Compose instead.

### Safari on macOS

Requires a Mac with Xcode and Safari. This project contains a macOS Safari web extension wrapper in `safari/`.

1. Open `safari/Calendar Rail.xcodeproj` in Xcode.
2. Select your Apple developer team for the app and extension targets. Bundle prefix is `com.tylormayfield.calendarrail`.
3. Build and run the macOS app. Enable Calendar Rail in Safari **Settings → Extensions** and allow `mail.google.com`.
4. Refresh Gmail. See [Safari build instructions](docs/safari.md).

Do not enable unsigned extensions on your everyday browser without understanding the developer setting. A signed App Store build does not need that setting.

## Development

There are no runtime or development npm dependencies. Node 22+ is sufficient for:

```sh
npm test
npm run check
npm run package
npm run test:browser
```

`test:browser` builds a self-contained synthetic navigation fixture and behavioral regression harness at `build/browser-harness.html`. Open it in Chrome or Safari and select **Run checks**. It does not use a real Google account. Fixture builds relax the origin guard for the generated local file only; those files never enter the shipping ZIP. See [testing](docs/testing.md).

## Compatibility and limits

Gmail has no supported extension point for adding app-rail buttons. The adapter validates the location, dimensions and known sibling controls, adds one isolated element, and leaves Gmail controls untouched. A layout it cannot recognize produces no shortcut. No guarantee of compatibility with every Gmail experiment, language or another extension is made.

Account routing uses an email-valued `authuser` query. Google's routing and organization policies can still require sign-in or account selection. Browser profiles and Safari private windows have separate sign-in sessions. Reordered account slots are covered by synthetic regression tests; real-account verification must be recorded separately.

Refresh Gmail after installation and updates. Removing the extension stops future injection; refresh open Gmail tabs to remove an existing shortcut. Source is readable and unminified.

## Branding

The monochrome Calendar Rail icon is original artwork created for this project. The in-page calendar symbol is an original generic outline in the page’s current text color. Google and Gmail names identify compatibility only.

This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.
