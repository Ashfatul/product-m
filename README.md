# Product Management App

A simple React app to browse products, search them, and filter by category. Built as a assessment project.

**Live Demo:** [product-manage-ashfatul.netlify.app](product-manage-ashfatul.netlify.app)  
Built for [Roxnor](https://roxnor.com/)

---

## What It Does

- Shows a list of products in a table
- You can search for products by name
- Filter products by category
- Click on a product to see more details
- Works on phone and desktop (responsive)
- Shows loading screens while fetching data

---

## Architecture Decisions

### Why Zustand + React Query?
I split state into two parts:
- **Zustand** - Stores the UI state (search input, current category filter, which page you're on)
- **React Query** - Fetches products from the API and caches them

This way the UI state and API data don't get mixed up.

### Data Fetching
- Data caches for 5 minutes so we don't make unnecessary API calls
- If a request fails, it retries 3 times automatically
- No refetch when you click back to the tab (unless data is old)

### Component Structure
Each component is in its own folder in `src/components/`. 

---

## Project Structure

```
src/
├── components/       # All the React components
├── layout/          # Header, footer, sidebar wrapper
├── routes/          # Page routing setup
├── store/           # Zustand store
├── query/           # API fetching hooks
├── theme/           # Colors and styling
├── types/           # TypeScript types
├── utility/         # Helper functions
└── assets/          # Images and global styles
```

## Components

- **Home** - Hero page with welcome message and button to products
- **ProductList** - Table of products with search/filter/pagination
- **ProductDetails** - Single product page with all info
- **BaseLayout** - Page wrapper (header, sidebar, footer on all pages)
- **Drawer** - Mobile menu that slides out from the side
- **Skeletons** - Gray loading placeholders while data loads

---

## Dependencies

```
react (19.2.4)              - React library
react-router-dom (7.13.1)   - Page routing
zustand (5.0.12)            - state management
@tanstack/react-query       - API data fetching
axios (1.13.6)              - HTTP requests
antd (6.3.3)                - UI components (Table, Button, etc)
styled-components (6.3.11)  - CSS styling
sass (1.98.0)               - SCSS preprocessing
vite (8.0.0)                - Build tool
typescript                  - Type checking
```

---

## Installation

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/product-management.git
cd product-management
```

### 2. Install packages
```bash
npm install
```

### 3. Create `.env` file
```env
VITE_API_BASE_URL=https://api.example.com/api
VITE_PER_PAGE_PRODUCTS=10
```

### 4. Start dev server
```bash
npm run dev
```
Then open `http://localhost:5173`

### 5. Build for production
```bash
npm run build
```

---

## How the Components Work

### ProductList
Shows all products in a table. 
- Uses the `productQuery()` hook to fetch products from the API
- Uses Zustand store for search term, selected category, and current page
- Pagination buttons at the bottom load more products

### ProductDetails
Shows one product when you click on it.
- Gets the product ID from the URL (e.g., `/products/123`)
- Uses `productDetailsQuery()` hook to fetch just that product
- Shows image, price, rating, description

### Home
Just the welcome page. Has a nice hero section and a button to go to products.

### BaseLayout
Wraps every page with a header on top. On mobile, there's a menu button that opens the Drawer.

---

## API Endpoints

The app expects these API routes:

```
GET /products                    # Get all products
GET /products/:id                # Get one product
GET /products/search?q=keyword   # Search products
GET /products/categories         # Get all categories
```

---

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 5174
```

**Can't connect to API?**
- Check `.env` file has the right API URL
- Make sure backend server is running
- Open DevTools Console to see errors

**npm install fails?**
```bash
rm -rf node_modules
npm install
```

**Build fails?**
```bash
npm run build
```

If still broken, clear cache:
```bash
rm -rf node_modules .vite dist
npm install
npm run build
```

---

**March 20, 2026**
