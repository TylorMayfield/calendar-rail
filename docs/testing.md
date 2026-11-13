# Testing

Run `npm test`, `npm run check`, `npm run package`, and `npm run test:browser`. No dependencies are installed. The browser command generates `build/browser-harness.html`; manually open it in a permitted browser environment and select Run checks. The current automated browser environment blocked file navigation, so current fixture results are not claimed.

The fixture substitutes only the local-file origin guard and a synthetic Calendar URL attribute in the generated test copy. Shipping code uses the Gmail origin and real native iframe URL. The fixture contains no real Google sign-in or message/event data. It guards message getters, Calendar frame document getters, network APIs, cookies and storage, and exercises navigation replacement, singleton mounting, collapse, theme, companion activation, return navigation and cleanup. Mock and fixture success do not establish live account correctness.

Live matrix: both signed-in accounts and reordered sessions; Mail/Chat/Meet, mail-only layouts, right panel shown/hidden, menu collapse, 80/100/125/150/200% zoom, light/dark themes, narrow windows, account/organization restrictions, fresh install, unpacked update and signed store update. Compare actual Calendar identity with the Gmail account, rather than copying `/u/N` numbers. Record unavailable native controls as a limitation.

Inspect extension-origin runtime traffic separately from Google’s own native companion traffic. The extension must make no collection requests, inspect no message/event contents, and add no account storage. Use synthetic/private sentinels for guarded content tests; never capture real content in public screenshots.

Known layout dependency: `[data-guest-app-id="6"]`, Calendar companion iframe origin/path, one iframe per native panel, known center-view controls and recognized panel ancestors. Remove or change these in fixtures: no guessed insertion or layout mutation is allowed. Replace the navigation root repeatedly: exactly one owned button. Closing or navigating away must remove all owned layout attributes/styles and restore the previous main inert state.

Legacy account-URL reference tests are retained under tests/legacy and excluded from the active suite. They are not part of 1.1.0 behavior or its package.
