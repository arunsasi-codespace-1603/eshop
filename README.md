# E-Shop

A modern, responsive fashion e-commerce frontend built with React. The project provides a premium shopping experience with product browsing, search, filtering, sorting, product details, and a persistent shopping bag.

## Live Demo

**[View E-Shop Live](https://eshop-psi-five.vercel.app/)**

## Overview

E-Shop is a frontend e-commerce application focused on creating a clean, modern, and responsive online shopping experience.

The application is designed around a fashion/luxury retail catalogue and includes structured product data, category navigation, product variations, search functionality, filtering, sorting, product detail pages, and a shopping bag.

Product data is currently managed through local JSON files, making the project suitable as a frontend portfolio project and as a foundation for future API/backend integration.

## Features

### Product Catalogue

* Product listing pages
* Category and subcategory navigation
* Product cards
* Product detail pages
* Product variations
* Product pricing
* Product ratings and reviews
* Related products
* Product image galleries

### Search & Discovery

* Product search
* Search results page
* Search suggestions
* Category navigation
* Collection pages
* Product filtering
* Product sorting
* Empty and not-found states

### Shopping Bag

* Add products to shopping bag
* Update product quantities
* Remove products
* Calculate cart quantity
* Calculate cart subtotal
* Persistent cart using browser `localStorage`
* Shopping bag summary
* Checkout call-to-action

> Payment processing and backend checkout functionality are not currently implemented.

### Responsive Experience

The interface includes responsive layouts and mobile-specific behaviour to provide a consistent experience across desktop and mobile devices.

## Tech Stack

| Technology            | Purpose                    |
| --------------------- | -------------------------- |
| React 19              | Frontend UI                |
| JavaScript            | Application logic          |
| React Router 7        | Client-side routing        |
| Sass / SCSS           | Styling                    |
| Swiper                | Product/image sliders      |
| React Bootstrap Icons | Interface icons            |
| Local JSON            | Product and catalogue data |
| LocalStorage          | Shopping bag persistence   |
| Vercel                | Deployment                 |

## Application Routes

The application currently includes routes for:

```text
/
```

Home page.

```text
/about
```

About page.

```text
/product/:pId/:slug
```

Product detail page.

```text
/products/:gender/collections
```

Collection listing.

```text
/products/:category/:subCategory
```

Category product listing.

```text
/products/:category/:subCategory/:type
```

Filtered product listing by type.

```text
/search
```

Search results.

```text
/shopping-bag
```

Shopping bag.

## Project Structure

```text
eshop/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Collection/
│   │   ├── ProductFilters/
│   │   ├── SearchBar/
│   │   ├── Newsletter/
│   │   ├── home/
│   │   ├── product/
│   │   └── ui/
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── data/
│   │   ├── products.json
│   │   ├── category.json
│   │   ├── collection.json
│   │   ├── filters.json
│   │   └── ...
│   │
│   ├── hooks/
│   │   └── useIsMobile.js
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Product/
│   │   ├── ShoppingBag/
│   │   └── ...
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── styles/
│   │
│   ├── utils/
│   │   ├── filterProduct.js
│   │   ├── productFilters.js
│   │   └── sortProduct.js
│   │
│   ├── App.js
│   └── index.js
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Product Image System

The project uses a consistent visual approach for product imagery.

The intended product image standard is:

* **Canvas:** 1200 × 1500 px
* **Aspect ratio:** 4:5
* **Background:** `#EFEFEF`
* **Composition:** Centered product
* **Product scale:** Controlled with generous negative space
* **Lighting:** Soft professional studio lighting
* **Shadow:** Subtle natural contact shadow
* **Style:** Premium e-commerce catalogue photography
* **Output:** One product per image

Product imagery can be prepared in multiple colours and viewing angles while maintaining consistent product proportions and presentation.

## Data Architecture

Product and catalogue information is currently stored in JSON files inside:

```text
src/data/
```

This includes information such as:

* Product names
* Prices
* Categories
* Subcategories
* Product descriptions
* Product variants
* Colours
* Sizes
* Ratings
* Reviews
* Shipping information
* Related products

This structure makes it possible to replace the local JSON data with an API or database in a future version.

## Shopping Bag Architecture

The shopping bag is managed through a React Context:

```text
CartContext.jsx
```

Cart state is stored in React state and persisted to the browser using:

```text
localStorage
```

This allows the shopping bag to remain available after refreshing the page within the same browser.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/arunsasi-codespace-1603/eshop.git
```

### 2. Navigate into the project

```bash
cd eshop
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

## Production Build

To create an optimized production build:

```bash
npm run build
```

The production files will be generated in:

```text
build/
```

## Deployment

The application is deployed using Vercel.

### Live Application

**https://eshop-psi-five.vercel.app/**

Future deployments can be connected directly to the GitHub repository so that changes pushed to the main branch can be deployed automatically.

## Current Limitations

This version is primarily a frontend e-commerce experience.

The following functionality is not currently connected to a backend:

* User authentication
* User accounts
* Database
* Real product inventory
* Payment processing
* Order management
* Customer accounts
* Admin dashboard
* Backend checkout
* Real-time product data

The application is therefore best considered a frontend e-commerce project/demo.

## Future Improvements

Possible future development includes:

* Backend/API integration
* Database integration
* User authentication
* Real checkout flow
* Payment gateway integration
* Order management
* Admin dashboard
* Product inventory management
* Wishlist persistence
* User accounts
* Product reviews
* Real-time product data
* Advanced search
* Improved accessibility
* Automated testing
* Performance optimization

## Project Goals

The main goal of E-Shop is to build a scalable and visually polished React e-commerce frontend that demonstrates:

* Component-based architecture
* Client-side routing
* React state management
* Reusable UI components
* Responsive design
* Product catalogue architecture
* Search and filtering logic
* Shopping cart state management
* Persistent browser state
* Modern e-commerce UX patterns

## Screenshots

Screenshots of the application can be added here to showcase:

* Homepage
* Product listing
* Product details
* Search results
* Shopping bag
* Mobile responsive layout

## License

This project is currently intended as a personal/portfolio development project.
