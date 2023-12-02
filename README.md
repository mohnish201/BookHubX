# Bookory 

## Introduction

**Bookory** is a comprehensive online platform that integrates a feature-rich bookstore with a vibrant reading community. Leveraging Angular for the frontend, this project offers users an immersive experience in discovering, purchasing, and engaging with books, fostering a community-driven environment for discussions, reviews, and recommendations. The backend can be developed using either Java or Node.js, and the database can be MySQL or MongoDB. Additionally, the project includes an intelligent chatbot service powered by GPT to assist users in finding books and authors based on their preferences.

## Objective

The primary objective is to create a comprehensive Online Bookstore and Reading Community where users can discover, buy, read books, and actively participate in discussions, share insights, and build a network of readers and authors. The focus will predominantly be on the frontend side, specifically Angular, to deliver a seamless and engaging user experience.

## Key Entities

- **Books**: Core entities with attributes such as Title, Author, Genre, Description, and Price.
- **Users**: Supporting different user roles—Readers, Authors, and Admins.
- **Community Discussions**: Platform enables discussions categorized by genres or specific books.
- **Book Reviews and Ratings**: Users can write reviews, rate books, contributing to recommendations.
- **Reading Lists**: Users create lists, recommend books, and track their reading.

## Key Features

1. **Bookstore**: Enables browsing, purchasing books based on genre, author, etc.
2. **Community Discussions**: Forum for discussions related to books and genres.
3. **Book Reviews and Ratings**: Allow users to review, rate books, and see aggregated ratings.
4. **Reading Lists**: Users create, share reading lists, fostering community engagement.
5. **Author Interaction**: Authors engage with readers, respond to reviews, participate in discussions.
6. **Chatbot Service**: Integration of GPT-powered chatbot for book recommendations.
## **Installation & Getting Started**

1. Clone the repository: **`git clone <https://github.com/yourusername/explorenature.git>`**
2. Install dependencies: **`npm install`**
3. Start the guided tour: **`npm start`**

 ## **User Journey**
1. Register or Log in: Users can either register with new credentials or log in using existing ones.
2. Browse Books: Explore a diverse collection of books categorized by genre, author, and other criteria.
3. Interact with Community Discussions: Engage in discussions related to books, genres, and authors.
4. Rate and Review Books: Provide ratings and write reviews for books they've read to help others.
5. Create Reading Lists: Formulate reading lists, recommend books, and track their reading progress.
6. Engage with Authors: Connect and engage with authors, participate in discussions, and receive insights.
7. Chatbot Interaction: Interact with the GPT-powered chatbot to seek book recommendations based on preferences.


## **API Endpoints**

### **Authentication**

- **`POST /api/auth/register`** - Register a new user.
- **`POST /api/auth/login`** - Log in an existing user.

### **Books**

- **`GET /api/books`** - Retrieve all books.
- **`GET /api/books/:book_id`** - Retrieve book details.
- **`PATCH /api/books/:book_id`** - Update book details.
- **`POST /api/books`** - Publish new book.
- **`DELETE /api/books/:book_id`** - Delete book.


### **Authors**

- **`GET /api/authors`** - Retrieve all authors.
- **`GET /api/authors/:id`** - Retrieve author details.
- **`POST /api/authors`** - Create Profile for new Author.
- **`DELETE /api/authors/:author_id`** - Delete author.


### **Cart**

- **`GET /api/cart`** - Retrieve all cart Items.
- **`PATCH /api/cart/addBook`** - Add book to Cart.
- **`DELETE /api/cart/removeBook/:book_id`** - Delete book from cart.

### **Favorites**

- **`GET /api/favorite`** - Retrieve all favorite books.
- **`PATCH /api/favorite/addBook`** - Add book to favorite.
- **`DELETE /api/favorite/removeBook/:book_id`** - Delete book from Favorite.

### **Discussions**

- **`GET /api/discussion/:book_id`** - Retrieve discussion by book_id.
- **`PATCH /api/discussion/addComment/:book_id`** - Post comment to the discussions.

### **Reviews**

- **`GET /api/reviews/:book_id`** - Retrieve review by book_id.
- **`PATCH /api/reviews/addReview/:book_id`** - Post review to the book.

### **Chatbot**

- **`POST /api/chatbot/`** - send message by user to chatbot.







## Technology Stack

- **Front-end**: Angular
- **Back-end**: Node.js
- **Database**: MongoDB
- **Authentication**: JWT-based with role-based access control
- **Chatbot Service**: GPT-based for user recommendations

---
