# Verification

Checked November 13, 2026. The shipping implementation remains the new-tab shortcut, version 1.0.1. The requested central Calendar workspace is not implemented in the shipping package. Submission is paused pending a supported behavior decision and the outstanding acceptance gates below.

## Completed

| Check | Evidence and limits |
| --- | --- |
| Static privacy/permission audit | Gmail `/mail/*` matches only. No API permission entries, background service, remote executable code, network APIs, cookies or storage APIs. No document title, body text or message content reads in the extension. |
| Routing unit tests | Four tests cover identity parsing, identity changes, ambiguous/missing identities, URL encoding and avoiding numeric-slot URLs. Together with the manifest audit, 5 Node tests pass. |
| Chrome synthetic browser suite | 16/16 passed in actual Chrome. Tests duplicate prevention, navigation replacement, unknown layout, width checks, collapse, dark theme, account identity changes, ambiguous/missing accounts, lifecycle cleanup and idle observer behavior. |
| Safari synthetic browser suite | 16/16 passed in actual macOS Safari. Same self-contained local DOM fixture. Does not prove the installed Safari extension, real Google account routing or a signed update. |
| Content/network/storage guards | Browser fixture throws on access to its synthetic message sentinel, fetch/XHR/beacon/WebSocket/EventSource, cookies, local/session storage and IndexedDB. No guarded access observed in either browser. Source audit is separate. This is not a blanket packet-level audit of Google's own page traffic. |
| Actual Chrome install | Loaded the real production manifest unpacked, extension ID napfoammcggclaoiglgceoghffpdmieh. One shortcut below Meet in Gmail's integrated app rail. Live dark theme visually reviewed. |
| Actual account routing | Clicked shortcut in real Gmail; new Calendar tab opened. Compared active account control identity in both apps and confirmed the same signed-in account. No event content needed for the check. |
| Collapse and zoom | Real Gmail main-menu collapse retains one shortcut. At actual Chrome 200% zoom, viewport was 600 CSS pixels with devicePixelRatio 4; one rail shortcut remained. Reset zoom to 100% afterwards. |
| Chrome development update | Reloaded unpacked 1.0.0 to 1.0.1 under the same extension ID. Refreshed Gmail and observed exactly one shortcut. This is not a signed Web Store update test. |
| Safari native wrapper | Universal arm64 and x86_64 macOS build compiles. Containing app launches; activation/help interface visually reviewed. Button opens Safari extension settings. Ad-hoc development signing only. |
| Public source | https://github.com/TylorMayfield/calendar-rail. Public visibility verified through the connected GitHub account. |
| Original artwork | Replaced initial colored concept with a monochrome outline icon per user feedback. In-page SVG inherits current Gmail text color. Store artwork uses a cropped actual Chrome rail and an actual macOS companion-app capture. No message/event content is included. |

## Not completed / release gates

- Installed Safari extension: the ad-hoc build did not appear in Safari's installed extensions. A valid Apple development signature/provisioning setup is needed, or explicit approval for a temporary unsigned-extension developer test. No unsigned-extension protection was changed.
- Two real signed-in Google accounts, signing out/reordering accounts and cross-service default-account differences: not tested. Chrome's second listed Google identity was signed out. No account credentials were entered. Synthetic identity changes are not a substitute.
- Fresh signed store install, signed update and real Safari dark/light, narrow/collapsed and zoom acceptance: not tested.
- Live Gmail light-theme acceptance: synthetic light fixture checked; no claim of full live light-theme acceptance.
- Packet-level extension-attributed network capture: not performed. Guards and readable-code inspection support the absence of extension content transmission, but are not described as whole-browser traffic verification.
- Store submission and review receipts: none. Neither listing is live.

## Main-workspace feasibility test

The user subsequently requested Calendar in Gmail's center pane, preserving the app rail. Google's supported in-window Calendar is its companion side panel, with Day and Schedule views observed in the live UI. A prototype attempted to expand that existing iframe without reading its contents, adding OAuth, changing calendar sharing, requesting Calendar host access, or stripping security headers. Gmail clipped/reset the pane; it was not stable enough to ship. The prototype was reverted. The installed Chrome development build was returned to the stable new-tab version and the experimental markers/proxy were verified absent.

This is evidence that this prototype failed, not a claim that every possible implementation is impossible. No supported full Calendar main-pane extension point was found in the primary documentation consulted. The intended behavior needs a decision before publication continues.
