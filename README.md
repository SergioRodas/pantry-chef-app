# 🧑‍🍳 Pantry Chef

A React Native application that helps you find recipes based on your available ingredients.

## 🚀 Features

- Modern UI with light/dark mode support
- Type-safe development with TypeScript
- Clean Architecture structure
- Themed components system
- Responsive design

## 🛠 Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Custom Theming System

## 📝 Development Practices

### Conventional Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```bash
feat(theme): add dark mode support
fix(input): resolve text color in dark mode
docs(readme): update installation steps
```

## 🏗 Project Structure

```
/
├── app/                 # Expo Router configuration
├── assets/             # Static assets
└── src/
   └── presentation/   # UI Layer
      ├── components/
   ├── components/ # Reusable UI components
   ├── hooks/ # Custom React hooks
   ├── screens/ # Screen components
   └── styles/ # Theme and styling
```

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/pantry-chef.git
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
   1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   2. Find your local IP address:
   ```bash
   # On Windows
   ipconfig
   # Look for IPv4 Address under your active network adapter

   # On macOS/Linux
   ifconfig
   # Look for inet under your active network adapter (usually en0 or wlan0)
   ```

   3. Update your `.env` file with your IP:
   ```env
   API_URL=http://your-ip:3000/api
   ```

4. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🎨 Theming

The app includes a comprehensive theming system with support for:
- Light/Dark mode
- Consistent spacing
- Typography scales
- Color palettes
- Component-level theming

## 📱 Current Features

- Search interface for ingredients
- Responsive design
- Dark mode support
- Themed components

## 🔜 Coming Soon

- Recipe search functionality
- Ingredient suggestions
- Recipe details view
- Favorites system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.