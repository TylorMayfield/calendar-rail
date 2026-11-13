# Verification — November 13, 2026

Version 1.1.0 is the center-workspace development implementation. Version 1.0.1 was the earlier new-tab implementation. No store submission or live listing is confirmed.

| Check | Evidence and limit |
| --- | --- |
| Actual Chrome workspace | Loaded 1.1.0 in the existing unpacked extension. Gmail’s native Calendar companion filled the center area, x324–1144 and y64–654 at a 1200×670 CSS viewport. Visually verified the Calendar header. No event content was captured. |
| Mail and Chat switching | Opened Calendar over Chat and over Mail, then selected Mail and Chat. Owned panel styling disappeared, underlying main focusability was restored, and exactly one rail button remained. |
| Collapsed navigation and native close | Collapsed Gmail’s main menu: Calendar filled x84–1144 (1060 px wide). Its native Close button restored the center workspace and removed inert state. Restored the menu afterward. |
| Icon and dark Gmail | Original simple monochrome outline inherits the live native rail color. Reviewed against the actual dark Gmail rail. Calendar companion styling is controlled by Google and may differ from Gmail’s theme. |
| Zoom/narrow limitation | At 175% (685 CSS px) and 200% (600 CSS px), Gmail hid its native companion control. The extension safely hid its own button and added no overlay. Reset zoom to 100% and refreshed Gmail to restore its native companion control. Workspace operation at those narrow widths is unavailable, rather than claiming full support. |
| Automated workspace/privacy tests | Node suite covers native activation without double-clicking, owned-style cleanup, 1px transient viewport handling, inert-state restoration, ambiguous/missing native structures, app clicks/route changes, and no Calendar frame document access in guarded mocks. Static audit checks Gmail-only scope, absence of API permissions/network/storage/content-document sinks, valid scripts, icons and disclaimer. These do not prove runtime network absence in every Google experiment. |
| New browser fixture | Generated a synthetic workspace/layout/privacy fixture. Opening its file URL was blocked by browser security policy; no workaround was attempted. Current fixture execution remains unverified. Prior 16/16 Chrome/Safari fixture results applied to version 1.0.1 only. |
| Account selection | New implementation does not read email addresses or map account slots. It activates the Calendar companion already owned by the Gmail session. Only one live signed-in account was available. Two-account and changed-order acceptance remains required. |
| Updates/fresh install | Reloaded the existing unpacked ID from 1.0.1 to 1.1.0 and refreshed Gmail. One button, no duplicate. A clean install of 1.1.0 and signed store-update tests remain required. |
| Safari | Earlier unsigned universal wrapper compiled and native app launched. Installed Safari extension did not appear with ad-hoc signing. 1.1.0 universal arm64/x86_64 Release build succeeded (`build-safari.log`); actual Safari extension, companion behavior, fresh install and update remain unverified until valid signing/access. |

## Remaining release gates

- Two simultaneously signed-in Google accounts, independently verified Calendar identity for each, then changed sign-in order. No numeric-slot assumption is acceptable.
- Actual signed Safari extension: Mail/Chat switching, dark/light modes, narrow/collapsed navigation, zoom, fresh install and update.
- Current synthetic browser fixture execution; Chrome fresh install and keyboard acceptance.
- Runtime network inspection scoped to extension-origin traffic, separated from Google’s normal Gmail/Calendar traffic. Source/mocks show no collection paths; Google necessarily loads Calendar content.
- Current store screenshots without private content, replacing all images showing the old new-tab product. Existing screenshot drafts are historical and must not be uploaded as 1.1.0 evidence.
- Publisher reauthentication for Chrome; Apple signing/provisioning, updated metadata/privacy/free price and build upload. Verify receipts after actual submission.

This is Gmail’s Calendar companion expanded to the center, not the full standalone Calendar website. Week/month parity is not implemented. Unknown layouts must fail closed without leaving the main view inert or adding duplicate controls.
