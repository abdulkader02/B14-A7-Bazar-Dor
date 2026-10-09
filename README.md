# 🛒 BazarDor — বাজার দর

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a responsive web application that helps users explore the latest prices of essential products, compare price changes, browse products by category, and view market-wise price information. It provides a simple interface for tracking everyday market price.

## ✨ Features

1. **Live Price Ticker** — Browse product prices and price changes in a scrolling ticker.
2. **Product Price Overview** — Explore top price risers, top price fallers, and all available products.
3. **Category-Based Browsing** — Browse products by category and sort them by price in ascending or descending order.
4. **Product Details** — View product information, price summaries, and market-wise prices.
5. **Authentication** — Sign up and sign in using email and password, Google, or GitHub through Better Auth.

## 🛠️ Technologies Used

- **Next.js** — React framework with App Router
- **React** — Component-based user interface
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive styling
- **Better Auth** — Authentication and session management
- **MongoDB** — Database for authentication data
- **Sonner** — Toast notifications
- **Vercel** — Deployment platform

## 📱 Responsive Design

BazarDor is designed to work across mobile, tablet, and desktop screens.

- Responsive navigation and product ticker
- Flexible product grids
- Mobile-friendly product details and category pages
- Responsive authentication forms
- Consistent spacing and layout

## 🚀 Getting Started

Open http://localhost:3000 in your browser.

## 📂 Main Routes

| Route                      | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `/`                        | Home page with price highlights and all products |
| `/category/[categorySlug]` | Products filtered by category                    |
| `/product/[slug]`          | Product details and market prices                |
| `/signin`                  | Sign-in page                                     |
| `/signup`                  | Registration page                                |
| `/profile`                 | User profile                                     |

## 🌐 Deployment

The project can be deployed on [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Set the production authentication URL and OAuth callback URLs.
5. Deploy and test the application.

## ⚠️ Disclaimer

All displayed prices are indicative and may change depending on market conditions.

## 👨‍💻 Author

**Abdul Kader Khan**

Frontend Developer.
