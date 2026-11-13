# Requirements research

Checked November 13, 2026 against primary documentation.

- Chrome requires a narrowly described single purpose, minimum permissions, accurate privacy declarations, and bundled executable code for Manifest V3. https://developer.chrome.com/docs/webstore/cws-dashboard-privacy and https://developer.chrome.com/docs/webstore/program-policies/policies
- Chrome listing assets include a 128px icon, a 440×280 promotional image and at least one screenshot. 1280×800 is preferred. https://developer.chrome.com/docs/webstore/images and https://developer.chrome.com/docs/webstore/cws-dashboard-listing
- Safari web extensions share standard HTML, CSS and JavaScript with other browsers. macOS distribution uses an app containing the extension. https://developer.apple.com/documentation/safariservices/safari-web-extensions
- The local Xcode converter can create a macOS Swift wrapper. Store distribution requires Apple Developer Program membership and signing of both targets. https://developer.apple.com/documentation/safariservices/packaging-a-web-extension-for-safari and https://developer.apple.com/documentation/safariservices/distributing-your-safari-web-extension
- Apple now also documents an App Store Connect Safari Web Extension Packager under Xcode Cloud. It requires an eligible app record and enrolled developer account; packaging uses included Xcode Cloud compute. Do not purchase additional compute or accept agreements. https://developer.apple.com/documentation/safariservices/packaging-and-distributing-safari-web-extensions-with-app-store-connect
- Multiple Google accounts may have distinct settings and some services can fall back to the default account. Slot numbers are therefore not treated as identities. https://support.google.com/accounts/answer/1721977

## Implementation decision

One Manifest V3 content script pair, an inert help/privacy popup, no background service, no remote dependencies, and no API permission entries. Use static content-script matches only for Gmail's `/mail/` pages. Open a normal link with `noopener noreferrer` instead of requesting `tabs`. Account identification is limited to the active header button. Email-valued `authuser` routing is an observed web behavior, not a promised stable Google API; real-account acceptance is required before claiming reliable multi-account behavior.

## Release gate

Do not submit an unverified layout or claim a successful submission without a store receipt. Do not use screenshots with personal mail or calendar information. Synthetic fixture captures are labeled and are not evidence of real Gmail acceptance. Do not claim listing availability while a package is merely local, uploaded, or in review.
