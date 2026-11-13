# macOS Safari build

The shared extension is under `extension/`. Xcode 27.2 generated a macOS-only Swift containing app with:

```sh
xcrun safari-web-extension-converter extension \
  --project-location safari --app-name 'Calendar Rail' \
  --bundle-identifier com.tylormayfield.calendarrail \
  --macos-only --swift --no-open --no-prompt
```

The Xcode project references the shared files. Run from the repository root. No source copies need to be maintained separately.

Build without signing for compile validation:

```sh
xcodebuild -project 'safari/Calendar Rail/Calendar Rail.xcodeproj' \
  -scheme 'Calendar Rail (macOS)' -configuration Release \
  -derivedDataPath build/safari CODE_SIGNING_ALLOWED=NO build
```

For App Store distribution, select the existing developer team for BOTH targets and use a unique app bundle identifier and extension bundle identifier. Archive and export for App Store Connect with valid distribution signing and provisioning. Do not create paid enrollments or accept new agreements without the account holder's approval.

Alternatively, when available for the existing App Store Connect account, upload the shared extension ZIP through the Safari Web Extension Packager on the app's Xcode Cloud tab, then test the resulting build via TestFlight. Verify included compute capacity before packaging and do not buy additional compute.

Unsigned build success only verifies compilation. It does not prove Safari runtime behavior, real-account routing, signing, App Store upload or acceptance.
