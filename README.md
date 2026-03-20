# Foody

A modern recipe discovery app built with React and Tailwind CSS. Browse, search, and save meals from two free APIs — all without accounts or sign-ups.

## Features

- **Dual API sources** — Recipes from [TheMealDB](https://www.themealdb.com/) and [DummyJSON Recipes](https://dummyjson.com/docs/recipes) for maximum variety
- **Live search** — Results appear as you type with debounced queries across both APIs
- **Browse by category** — Scrollable category bar with thumbnails (Beef, Chicken, Seafood, Dessert, etc.)
- **Browse by cuisine** — Dropdown filter with African cuisines highlighted (Egyptian, Kenyan, Moroccan, Tunisian) plus 25+ world cuisines
- **Recipe modal** — Full recipe view with ingredients, step-by-step instructions, YouTube video embeds, ratings, prep/cook time, and calorie info
- **Surprise Me** — Random recipe generator with category/tag filters and a source toggle
- **Save favourites** — Meals saved to localStorage with a device-only notice (no backend needed)
- **Masonry layout** — Pinterest-style staggered grid with varied card heights
- **Pagination** — Numbered pagination with ellipsis, smooth scroll-to-top
- **Cursor glow** — Soft radial light that trails the mouse for a polished feel
- **Staggered animations** — Cards cascade in with delay-offset fade/slide
- **Fully responsive** — Mobile hamburger menu, adaptive grid, touch-friendly

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 |
| Routing | React Router 6 |
| Styling | Tailwind CSS 4 |
| Build | Vite 5 |
| APIs | TheMealDB, DummyJSON |
| State | React Context + localStorage |

Zero external UI libraries. Zero backend. Zero API keys required.

## Getting Started

```bash
# Clone
git clone https://github.com/your-username/foody.git
cd foody

# Install
pnpm install

# Dev server
pnpm dev

# Production build
pnpm build
```

## Project Structure

```
src/
  components/
    AreaFilter.jsx      # Cuisine dropdown (grouped by region)
    CategoryBar.jsx     # Scrollable category pills
    CursorGlow.jsx      # Mouse-trailing radial glow effect
    Header.jsx          # Fixed nav with active states + saved count badge
    Hero.jsx            # Hero section with live search + quick tags
    MealCard.jsx        # Recipe card (masonry item, save/view)
    MealGrid.jsx        # Masonry grid wrapper
    Pagination.jsx      # Numbered page navigation
    RecipeModal.jsx     # Full recipe detail modal (both API formats)
    Skeleton.jsx        # Loading placeholder (masonry skeleton)
    Toast.jsx           # Toast notification renderer
  context/
    RecipeModalContext.jsx   # Modal open/close state
    SavedMealsContext.jsx    # localStorage saved meals
    ToastContext.jsx         # Toast notification queue
  hooks/
    useDebounce.js      # Debounce hook for live search
  pages/
    Home.jsx            # Main page (featured, search, category, area)
    MealofTheDay.jsx    # Random recipe with category picker
    SavedMeals.jsx      # Saved meals collection
  utils/
    normalize.js        # DummyJSON → common meal format
    parseIngredients.js # MealDB ingredient extractor
  Requests.js           # API endpoint definitions
```

## APIs Used

**TheMealDB** — Categories, areas, search, random, full recipe lookup with YouTube links and ingredient images.

**DummyJSON Recipes** — 50 recipes with ratings, difficulty levels, prep/cook times, calorie counts, cuisine tags, and servings.

Both are free with no authentication required.

## License

MIT
