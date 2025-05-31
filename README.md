# 🧭 Pokedex Angular

This is a **Pokédex web application** built with [Angular](https://angular.io/), [Angular Material](https://material.angular.io/), and [NgRx](https://ngrx.io/) for state management.  
It fetches data from the public [PokeAPI](https://pokeapi.co/) and provides features such as listing, searching, and liking your favorite Pokémon.

👉 [**Live Demo on StackBlitz**](https://stackblitz.com/~/github.com/Ronald-Nguyen/Pokedex-Angular)

---

## 🚀 Features

- 🔍 **Search Pokémon** by name
- 📜 **List all Pokémon** from the [PokeAPI](https://pokeapi.co/)
- 📄 **View detailed Pokémon information**
- ❤️ **Like your favorite Pokémon**, which are added to a **Favorites list**
- 🔄 **State management** implemented using **NgRx**

---

## 🛠️ Technologies Used

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [NgRx](https://ngrx.io/)
- [PokeAPI](https://pokeapi.co/)
- [StackBlitz](https://stackblitz.com/)

---

## 🧪 Getting Started Locally

To run the project locally on your machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ronald-Nguyen/Pokedex-Angular.git
2. **Navigate into the project directory**
   ```bash
   cd Pokedex-Angular
3. **Install dependencies**
   ```bash
   npm install
4. **Run the development server**
   ```bash
   ng serve
5. **Open the app in your browser**
   ```bash
   http://localhost:4200/

## 📂 Project Structure


/src
 ├── /app
 │    ├── /favorites         # Favorite Pokémon components
 │    ├── /ngrx              # NgRx state management (actions, reducers, effects)
 │    ├── /pokemon-detail    # Detailed view components for a Pokémon
 │    ├── /pokemon-list      # Components for listing/searching Pokémon
 │    ├── app.component.*     # Main app component
 │    ├── app.module.ts       # Main application module
 │    └── app.routes.ts       # Routing configuration
 ├── assets                  # Assets (images, icons, etc.)
 ├── environments            # Environment definitions
 └── index.html              # Main HTML file

