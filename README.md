# 🧑‍🍳 Pantry Chef

A React Native application that helps you find recipes based on your available ingredients, with a modern and responsive interface.

## 🚀 Features

- **Recipe Search**: Find recipes by ingredients with real-time suggestions
- **Recipe Details**: Detailed view of recipes including:
  - Ingredients and measurements
  - Step-by-step instructions
  - YouTube video links
  - Category and area information
  - Tags
- **Favorites System**: Save and manage your favorite recipes
- **Modern UI**: 
  - Light/dark mode support
  - Responsive design for mobile and web
  - Smooth animations and transitions
  - Hover effects on web
- **Type-safe Development**: 
  - Full TypeScript support
  - Clean Architecture structure
  - Themed components system

## 🛠 Tech Stack

- React Native
- Expo Router
- TypeScript
- Zustand (State Management)
- Custom Theming System
- React Navigation
- AsyncStorage for persistence

## 📱 Screens

### 🔍 Search
- Real-time ingredient search
- Recipe suggestions based on ingredients
- Clean and intuitive interface

### 📖 Recipe Details
- High-quality recipe images
- Detailed ingredients list
- Step-by-step cooking instructions
- YouTube video integration
- Quick favorite toggle
- Recipe tags and categories

### ❤️ Favorites
- Save favorite recipes
- Quick access to saved recipes
- Bulk clear option
- Persistent storage

## 🏗 Project Structure

```
/
├── app/                # Expo Router configuration
│   ├── (tabs)/        # Tab navigation
│   └── meal/          # Recipe details routing
├── assets/            # Static assets
└── src/
    ├── domain/        # Business logic and entities
    │   ├── entities/
    │   └── repositories/
    ├── data/          # Data layer
    │   └── repositories/
    └── presentation/  # UI Layer
        ├── components/# Reusable UI components
        ├── hooks/     # Custom React hooks
        ├── screens/   # Screen components
        ├── stores/    # Zustand stores
        └── styles/    # Theme and styling
```

## 🎨 Theming

The app includes a comprehensive theming system with:
- Automatic light/dark mode detection
- Consistent spacing system
- Typography scales
- Color palettes
- Component-level theming
- Platform-specific styling
- Hover effects for web

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/pantry-chef.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
npm run ios     # iOS
npm run android # Android
npm run web     # Web
```

## 📝 Development Practices

### Conventional Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Style changes
- `refactor`: Code refactoring
- `test`: Testing changes
- `chore`: Build/config changes

Example:
```bash
feat(favorites): add favorites functionality with zustand
style(layout): improve spacing and mobile responsiveness
```

## 🔜 Future Enhancements

- Recipe filtering by dietary restrictions
- Shopping list generation
- Social sharing features
- User ratings and reviews
- Offline support
- Recipe collections/categories

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.