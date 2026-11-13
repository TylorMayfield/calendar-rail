# Testing

Run `npm test` and `npm run check` with Node 22+. There are no npm dependencies.

Run `npm run test:browser`, then open `build/browser-harness.html` in Chrome and Safari. Select **Run checks**. This is a generated local fixture with the shipping origin guard replaced for `file:` only; it is never included in the shipping package. Shadow roots are retained by the fixture's test instrumentation, not exposed by the extension. Fixture accounts use example.test addresses and there is no Google sign-in or real mail.

The synthetic suite tests routing and layout behavior with real browser DOM/CSS implementations. It does not prove Google authentication, account ordering, production Gmail experiments, signed Safari behavior or store upgrades. The identity-change test does not actually sign accounts out or reorder a Google session.

Before release, use two designated Google test accounts in EACH browser. Open each inbox, click Calendar and compare the actual Calendar account identity with Gmail's account control. Reverse the sign-in order in a separate disposable profile and repeat. Do not sign the user's everyday profile out to perform that test. Repeat with Calendar's last-used account different from Gmail's active account. Include an unavailable Calendar service, missing/ambiguous account label, organization restrictions and private-window behavior.

For layouts, test Mail/Chat/Meet enabled, Chat disabled, Meet disabled, both disabled, main-menu collapse, 80/100/125/150/200% zoom, dark and light Gmail themes and a narrow window. Replace the navigation root and remove known controls in a synthetic fixture; unknown layouts must leave Gmail usable and add no duplicates.

Test fresh signed installation, update under the SAME store extension ID/bundle identifiers, disable/re-enable, uninstall and refresh, and an open Gmail tab retained across an update. Store update behavior must be checked after an initial store or TestFlight build exists.

Inspect extension source and manifest for unexpected privileges or remote code. Use a controlled fixture with network/storage/content guards, and separately inspect extension-attributed network traffic in DevTools/Web Inspector. Do not attribute Google's normal Gmail/Calendar traffic to the extension. Never save real messages, account credentials or calendar event details in test fixtures, screenshots, logs or public issues.

Record completed checks and their limits in verification.md. Compilation and synthetic fixture passes are not physical-device or real-account acceptance.
