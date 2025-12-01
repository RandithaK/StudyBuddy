This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Using the production backend & building for release 🔧

This project supports multiple `.env` files and can be built with a production backend by setting `ENVFILE` at build time or by copying `.env.production` over `.env`.

### Environment files

- `.env` — default local env used for development (emulator/proxy to `10.0.2.2`).
- `.env.production` — production values (we added a file which points `API_URL` to the Vercel host).

`babel.config.js` reads `ENVFILE` at build time to determine which env file should be used by `react-native-dotenv`.

### Production backend

The production backend for this project is hosted at:

```
https://study-buddy-backend-three.vercel.app/api/query
```

This should be set as `API_URL` in `.env.production`.

### Useful scripts

We've added scripts to `package.json` that allow you to build and run with a specific env file.

- Run Android with the development `.env`:
```sh
npm run android:debug:env
```
- Run Android with the production env (uses `.env.production`):
```sh
npm run android:prod:env
```
- Create a release APK (assemble):
```sh
npm run android:prod:assemble
```
- Build an Android App Bundle (AAB):
```sh
npm run android:prod:bundle
```
- Install a release build on a connected device (requires signing config):
```sh
npm run android:prod:install
```
- Copy `.env.production` to `.env` if needed:
```sh
npm run android:copy-prod-env
```

### Build notes and tips

- If you switch env files, always restart Metro with cache reset:
```sh
npx react-native start --reset-cache
```
- The `ENVFILE` variable is read by Babel at build-time; make sure it is set when running the bundler or Gradle tasks.
- For release builds that are going to the Play Store, make sure to configure a release keystore and signing information in `android/` (see `android/app/build.gradle`), and keep passwords in `gradle.properties` or CI secrets.
- Use network inspection (Android Studio Logcat / Chrome DevTools) to confirm runtime network requests go to your production host.

### Install dependencies first

Before running any of the scripts above make sure you've installed npm dependencies in the root of the project:

```bash
npm install
```

If you prefer not to install `cross-env`, or if you're on Linux/macOS, you can use the native env assignment for running commands:

```bash
# Linux/macOS (no cross-env required)
ENVFILE=.env.production npx react-native run-android
```

If you still see `cross-env: not found`, run `npm install` and then retry the script; on CI use `npm ci` to make sure dev dependencies are installed.

### Verification commands

Check backend health quickly via curl:
```sh
curl https://study-buddy-backend-three.vercel.app/api/health
```

Check a sample GraphQL request (example):
```sh
curl -X POST https://study-buddy-backend-three.vercel.app/api/query \
	-H "Content-Type: application/json" \
	-d '{"query":"{ __schema { types { name } } }"}'
```

	### Build split & universal APKs

	The Android project is configured to produce both per-ABI split APKs (smaller APKs built for a specific CPU architecture) and a universal combined APK (a single large APK containing all ABIs). You will find these outputs in `android/app/build/outputs/apk/release/` after a release build.

	To build the release split and universal APKs and copy them to `./release`:
	```bash
	npm run android:prod:assemble && npm run android:prod:collect
	```

	Key outputs:
	- Split APKs: `android/app/build/outputs/apk/release/app-arm64-v8a-release.apk` (and similar for other ABIs)
	- Universal (combined) APK: `android/app/build/outputs/apk/release/app-release-universal.apk`

	Install a split APK to a device (example):
	```bash
	adb install -r android/app/build/outputs/apk/release/app-arm64-v8a-release.apk
	```

	Install the universal APK:
	```bash
	adb install -r android/app/build/outputs/apk/release/app-release-universal.apk
	```

	### Clean up tracked release folder (if needed)

	If you previously committed a `release/` folder to Git, it may still be tracked even after adding it to `.gitignore`. To stop tracking and remove it from the Git index (without deleting your local files), run:

	```bash
	# Remove release folder from git tracking but keep local files
	git rm -r --cached release
	git commit -m "chore: stop tracking release/ artifacts"
	```



If you want me to update the `README.md` in the backend repo (`StudyBuddy_Backend/README.md`) with the Vercel URL and notes on `MONGO_URI`, I can do that as a follow-up.
