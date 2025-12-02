# StudyBuddy (React Native)

This is a React Native project bootstrapped with `@react-native-community/cli`.

## Getting Started

> Note: Make sure you have completed the React Native environment setup before continuing: https://reactnative.dev/docs/environment-setup

### Step 1 — Start Metro

From the project root, start the Metro bundler:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2 — Build and run your app

With Metro running, open another terminal and run a build command.

Android:

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

iOS:

If this is the first time or you've updated native dependencies:

```sh
# Install CocoaPods dependencies (run once or when native deps change)
bundle install
bundle exec pod install
```

Then run:

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

You can also open the Android or iOS project in Android Studio/Xcode and run builds from there.

### Step 3 — Modify your app

Open `App.tsx` and make a change. Fast Refresh will automatically update the running app.

To force a reload:
- Android: Press R twice or open the Dev Menu (Ctrl/Cmd+M) and select "Reload".
- iOS: Press R in the Simulator.

## Congratulations!

You’ve successfully run and modified your React Native app.

### Next steps
- Integrate this into an existing app: https://reactnative.dev/docs/integration-with-existing-apps
- Learn more about React Native: https://reactnative.dev/docs/getting-started

## Troubleshooting

If you encounter problems, refer to the official troubleshooting page: https://reactnative.dev/docs/troubleshooting

## Learn more

- React Native website: https://reactnative.dev
- Getting Started/Environment setup: https://reactnative.dev/docs/environment-setup
- Docs/Guides: https://reactnative.dev/docs
- Blog: https://reactnative.dev/blog
- Source: https://github.com/facebook/react-native

---

## Using the production backend & building for release

This project supports multiple `.env` files. By setting `ENVFILE` at build time or copying `.env.production` to `.env`, the app can use production values.

### Environment files
- `.env` — development values (e.g., emulator/proxy to `10.0.2.2`).
- `.env.production` — production values (e.g., `API_URL` pointing to the Vercel host).

`babel.config.js` reads `ENVFILE` at build time to determine which env file is used by `react-native-dotenv`.

### Production backend

Set this URL as `API_URL` in `.env.production`:

```
https://study-buddy-backend-three.vercel.app/api/query
```

### Useful scripts

- Run Android with dev env:
```sh
npm run android:debug:env
```

- Run Android with production env:
```sh
npm run android:prod:env
```

- Create a release APK:
```sh
npm run android:prod:assemble
```

- Build an Android App Bundle (AAB):
```sh
npm run android:prod:bundle
```

- Install a release build on a connected device (requires signing):
```sh
npm run android:prod:install
```

- Copy `.env.production` to `.env`:
```sh
npm run android:copy-prod-env
```

### Build notes and tips

- Whenever you switch env files, restart Metro and reset the cache:
```sh
npx react-native start --reset-cache
```

- The `ENVFILE` variable is read at build time; make sure it is set when running bundler/Gradle tasks.

- For release builds going to the Play Store, configure release keystore and signing in `android/` (see `android/app/build.gradle`). Keep keystore passwords out of the repo (use `gradle.properties`, CI secrets, or local environment).

- Use Android Studio Logcat or Chrome DevTools to inspect network requests and verify they point to the intended backend.

### Install dependencies

Install npm dependencies in the project root before running scripts:

```bash
npm install
# OR on CI:
npm ci
```

On Linux/macOS you can export ENVFILE inline (no cross-env required):

```bash
ENVFILE=.env.production npx react-native run-android
```

If `cross-env: not found`, ensure `npm install` or `npm ci` is executed.

### Verification commands

Check backend health:
```sh
curl https://study-buddy-backend-three.vercel.app/api/health
```

Check a sample GraphQL request:
```sh
curl -X POST https://study-buddy-backend-three.vercel.app/api/query \
	-H "Content-Type: application/json" \
	-d '{"query":"{ __schema { types { name } } }"}'
```

---

## Android release building and collection

The Android project is configured to produce both per-ABI split APKs and a universal APK. After a release build, you'll find artifacts under `android/app/build/outputs/`.

To build releases and collect them into `./release`, run this command — this is how to release:

```bash
# Build release and copy artifacts to ./release
npm run android:prod:assemble && npm run android:prod:collect
```

Example terminal output for the release process:

```bash
randitha@randithadesktop:~/Desktop/IT/UoM/Human Computer Interaction/Development/StudyBuddy$ npm run android:prod:assemble && npm run android:prod:collect

> StudyBuddy@0.0.1 android:prod:assemble
> cd android && npx cross-env ENVFILE=.env.production ./gradlew assembleRelease


[Incubating] Problems report is available at: file:///home/randitha/Desktop/IT/UoM/Human%20Computer%20Interaction/Development/StudyBuddy/android/build/reports/problems/problems-report.html

Deprecated Gradle features were used in this build, making it incompatible with Gradle 10.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/9.0.0/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

BUILD SUCCESSFUL in 2s
386 actionable tasks: 27 executed, 359 up-to-date
Consider enabling configuration cache to speed up this build: https://docs.gradle.org/9.0.0/userguide/configuration_cache_enabling.html

> StudyBuddy@0.0.1 android:prod:collect
> mkdir -p ./release && cp android/app/build/outputs/apk/release/* ./release || true

cp: -r not specified; omitting directory 'android/app/build/outputs/apk/release/baselineProfiles'
randitha@randithadesktop:~/Desktop/IT/UoM/Human Computer Interaction/Development/StudyBuddy$ 
```

Recommended improvements for the `collect` script:
- Copy only APKs/AABs, avoid directories, and error on failure (remove `|| true` in CI).
- Example `collect` script (copy APKs and AABs recursively):
```bash
mkdir -p ./release && cp -r android/app/build/outputs/apk/release/*.apk ./release || true
mkdir -p ./release && cp -r android/app/build/outputs/bundle/release/*.aab ./release || true
```

Or, to copy everything and fail if errors occur:
```bash
mkdir -p ./release && cp -r android/app/build/outputs/* ./release
```

### Important: Signing release builds
Before publishing to the Play Store:
1. Create a release keystore using `keytool`.
2. Add signing properties to `~/.gradle/gradle.properties` or `android/gradle.properties` (do not commit secrets).
3. Update `android/app/build.gradle` to use release signingConfig for release builds.
4. Verify signing using `apksigner` or `jarsigner`.

---

## Clean up tracked release artifacts

If `release/` was previously committed, remove it from Git tracking (keeps local files):

```bash
git rm -r --cached release
git commit -m "chore: stop tracking release/ artifacts"
```

---

If you'd like, I can also update the `README.md` in the backend repo (`StudyBuddy_Backend/README.md`) to document the Vercel URL and `MONGO_URI` usage—tell me and I'll update it as a follow-up.
