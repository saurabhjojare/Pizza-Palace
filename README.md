# Pizza Ordering System

## Overview

A feature rich pizza ordering application crafted to simplify and enhance the ordering experience for both customers and store admins. Users can effortlessly browse the menu, customize pizzas to their taste, and manage their cart with ease. Administrators have powerful tools to manage inventory, track orders, and update customer details, all in one seamless system.

## Screenshots

### Client View

Log into your account

![Login Page](https://www.dropbox.com/scl/fi/igdumyhtjiyr6yedup17v/Login-Filled.png?rlkey=bpcw3twdn35j4xywnidejeguj&raw=1)

Browse full pizza selection

![Home Page](https://www.dropbox.com/scl/fi/5ucsw714x2tr55z7155kg/Home-Logged.png?rlkey=lq83jil6sex77u9yrch2r6f9b&raw=1)

Quickly search the collection

![Search Pizza Home](https://www.dropbox.com/scl/fi/8o54ag94l3d6f1ls38di5/Search-Pizza-Home.png?rlkey=pcxy0s5cxevnt8g7ri8rrsjrj&raw=1)

Select items and place your order

![Cart](https://www.dropbox.com/scl/fi/pzr6kltkhaqkjb0w7as8h/Cart.png?rlkey=myh2b3roleujgnvff60rgyxa7&raw=1)

Check your order history

![My Orders](https://www.dropbox.com/scl/fi/9cd68qrgevx39o5e87w4j/My-Orders.png?rlkey=ez1pjb1lzpqq9ids8ea76k8d6&raw=1)

Access your profile

![My Profile](https://www.dropbox.com/scl/fi/9yadn7nk8zlpw03dn4vfr/My-Profile.png?rlkey=svcanugtnv2d9n3m63mmncmrw&raw=1)

### Admin Panel
Browse the pizza menu

![Pizza List](https://www.dropbox.com/scl/fi/hhn5kv6pmjy8tf9f3vp7g/Pizza-List.png?rlkey=gufjf37pztb81ee6c7uzulvhd&raw=1)

Modify Pizza

![Update Pizza](https://www.dropbox.com/scl/fi/yo5zr1a4mi0trno95exp6/Update-Pizza.png?rlkey=7i5foe22pk8v21cis0f0xx0es&raw=1)

Explore customer profiles

![Customers List](https://www.dropbox.com/scl/fi/uajmdhq50r5tgwp1i98np/Customers-List.png?rlkey=8q7aj8klahclhw6cqutvddmmk&raw=1)

View all admins except yourself

![Admin List](https://www.dropbox.com/scl/fi/nnr3hxs2grjrtykam3bc9/Admin-List.png?rlkey=zmgte6r0szaty9lri574ilqm0&raw=1)

Browse all orders with filters for username and date

![All Orders](https://www.dropbox.com/scl/fi/kxneie8z5e01scd2nsiih/All-Orders.png?rlkey=bko7ov1wr7qgvcjgifb7k2j3e&raw=1)

## Feature Summary

The images above showcase the core features of the Pizza Ordering System:

- **Cart Management**: Add or remove pizzas, select sizes, and adjust quantities in real time.
- **Customer Management**: Add, view, update, and delete customer records.
- **Order Tracking**: View complete order history for efficient order tracking and customer service.
- **Validation & Control**: Enforce rules for customizing orders and managing inventory to ensure a smooth process.
- **Authentication & Authorization**: Secure user and endpoint access using JWT (JSON Web Tokens) for safe login, request validation, and role-based permission control.


## Tech Stack
**Frontend**: ReactJS (TypeScript), Bootstrap  
**Backend**: NestJS   
**Database**: PostgreSQL    
**API**: RESTful APIs  
**Authentication**: JWT (JSON Web Token)  
**Containerization**: Docker

## REST API Reference

### Authentication

| Method | Endpoint          | Role       | Description                       | Request Body Example |
|--------|-----------------|------------|-----------------------------------|--------------------|
| `POST` | `/auth/login`    | Public     | Login a user and return JWT token | `{ "email": "john@example.com", "password": "password123" }` |

### Customers

| Method | Endpoint                     | Role        | Description                       | Request Body Example |
|--------|-----------------------------|------------|-----------------------------------|--------------------|
| `POST` | `/customers`                 | Public     | Create a new customer             | `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }` |
| `GET`  | `/customers`                 | Admin      | Get all customers                 | N/A |
| `POST` | `/customers/by-role`         | Admin      | Get customers by role             | `{ "role": "CUSTOMER", "id": 1 }` |
| `GET`  | `/customers/:id`             | Admin/Customer | Get customer by ID             | N/A |
| `PATCH`| `/customers/:id`             | Admin/Customer | Update customer info            | `{ "name": "John Updated" }` |
| `DELETE`| `/customers/:id`            | Admin/Customer | Delete a customer               | N/A |
| `GET`  | `/customers/:id/full-name`   | Admin/Customer | Get full name of a customer    | N/A |
| `GET`  | `/customers/:id/address`     | Admin/Customer | Get address of a customer       | N/A |
| `GET`  | `/customers/search/customers`| Public     | Search customers by query         | `/customers/search/customers?q=John` |
| `GET`  | `/customers/search/admins`   | Public     | Search admins by query            | `/customers/search/admins?q=Jane` |

### Pizzas

| Method | Endpoint               | Role        | Description                     | Request Body Example |
|--------|----------------------|------------|---------------------------------|--------------------|
| `POST` | `/pizzas`             | Admin/Customer | Create a pizza                 | `{ "name": "Margherita", "price": 10.99, "ingredients": ["cheese", "tomato"], "size": ["S", "M", "L"] }` |
| `GET`  | `/pizzas`             | Public     | Get all pizzas                  | N/A |
| `GET`  | `/pizzas/:id`         | Admin/Customer | Get pizza by ID               | N/A |
| `PATCH`| `/pizzas/:id`         | Admin/Customer | Update pizza info              | `{ "price": 12.99 }` |
| `DELETE`| `/pizzas/:id`        | Admin/Customer | Delete a pizza                | N/A |
| `POST` | `/pizzas/search-by-name` | Admin/Customer | Search pizza by name         | `{ "name": "Margherita" }` |

### Orders

| Method | Endpoint                       | Role        | Description                       | Request Body Example |
|--------|--------------------------------|------------|-----------------------------------|--------------------|
| `POST` | `/orders`                       | Customer   | Create a new order                 | `{ "userId": 1, "items": [{ "pizzaId": 2, "quantity": 2 }] }` |
| `GET`  | `/orders`                       | Admin      | Get all orders                     | N/A |
| `GET`  | `/orders/customer/:customerId`  | Customer   | Get orders by customer ID          | N/A |
| `GET`  | `/orders/filter`                | Admin      | Filter orders by name/date         | `/orders/filter?name=John&date=2025-09-01` |
| `GET`  | `/orders/:id`                   | Customer   | Get order by ID                    | N/A |
| `PATCH`| `/orders/:id`                   | Admin/Customer | Update order info                 | `{ "status": "delivered" }` |
| `DELETE`| `/orders/:id`                  | Admin/Customer | Delete an order                   | N/A |
| `GET`  | `/orders/customer/:customerId/date` | Customer | Get orders for customer by date   | `/orders/customer/1/date?date=2025-09-01` |

### Order Lines

| Method | Endpoint                | Role  | Description                     | Request Body Example |
|--------|------------------------|-------|---------------------------------|--------------------|
| `POST` | `/order-line`           | Customer | Create an order line           | `{ "orderId": 1, "pizzaId": 2, "quantity": 2 }` |
| `GET`  | `/order-line`           | Admin   | Get all order lines            | N/A |
| `GET`  | `/order-line/:id`       | Admin   | Get order line by ID           | N/A |
| `PATCH`| `/order-line/:id`       | Admin   | Update order line              | `{ "quantity": 3 }` |
| `DELETE`| `/order-line/:id`      | Admin   | Delete order line              | N/A |

## License
This project is licensed under the [MIT License](LICENSE).
  
For any issues or feedback, please contact saurabh.jojare@gmail.com.
