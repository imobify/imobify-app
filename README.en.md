<h1 align="center">Imobify</h1>

## 🔧 Installation

Requirements:

- Node.js v18 or higher
- Android emulator available or a compatible smartphone
- Running the <a href="https://github.com/imobify/imobify-backend" target="_blank">back-end</a>

```bash
# 1. install dependencies
yarn

# 2. copy .env.template to .env
cp .env.template .env

# 3. fill out the .env file with your environment variables

# 4. start the Android emulator or connect your Android smartphone to the computer

# 5. start the project

yarn android

```

**OBS:** For iOS development, the steps are the same, but a Mac is required. Just replace the last step with the command `yarn ios`.

## 💻 Tech

- [React Native](https://reactnative.dev/) e [Expo](https://expo.dev/) - Framework for multiplatform app development using React.
- [Zustand](https://zustand-demo.pmnd.rs/) - Minimalist global state management library.
- [React Native Paper](https://reactnativepaper.com/) - Standard-compliant Material Design component library.

## ⚙️ Utilities

This project is configured with:
 
 - [husky](https://github.com/typicode/husky) for Git hooks
    - runs lint-staged and eslint on pre-commit
    - validates commit message with commitlint on commit-msg
 - [commitizen](https://github.com/commitizen/cz-cli) with [commitlint](https://github.com/conventional-changelog/commitlint) for enforcing conventional commits: \<type>[optional scope]: \<description>
    - for reference: [conventional commits](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3)