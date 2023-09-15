<h1 align="center">Imobify</h1>
<p align="center">Read in <a href="https://github.com/imobify/imobify-app/blob/main/READ.en.md">English</a></p>

## 🔧 Instalação

Requisitos:

- Node.js v18 ou maior
- Emulador de Android instalado ou um celular compatível
- Estar executando o <a href="https://github.com/imobify/imobify-backend" target="_blank">back-end</a>

```bash
# 1. instale as dependências
yarn

# 2. copie .env.template para .env
cp .env.template .env

# 3. preencha o arquivo .env com suas variáveis de ambiente

# 4. inicie o emulador de Android ou conecte seu celular ao computador

# 5. execute o projeto

yarn android

```

**OBS:** Para iOS, as instruções são as mesmas, mas é necessário um Mac. Apenas substitua pelo comando `yarn ios` no último passo.

## 💻 Tecnologias

- [React Native](https://reactnative.dev/) e [Expo](https://expo.dev/) - Framework para desenvolvimento de aplicativos multiplataforma utilizando React.
- [Zustand](https://zustand-demo.pmnd.rs/) - Biblioteca minimalista para gerenciamento de estado global.
- [React Native Paper](https://reactnativepaper.com/) - Biblioteca de componentes no padrão Material Design.

## ⚙️ Utilitários

Este repositório está configurado com:
 
 - [husky](https://github.com/typicode/husky) para Git hooks
    - executa lint-staged e eslint em pre-commit
    - valida a mensagem de commit com commitlint em commit-msg
 - [commitizen](https://github.com/commitizen/cz-cli) com [commitlint](https://github.com/conventional-changelog/commitlint) para impor commits padronizados: \<tipo>[escopo opcional]: \<descrição>
    - referência: [conventional commits](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3)