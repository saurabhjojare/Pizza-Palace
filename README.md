# Pizza Ordering System

## Overview

A feature rich pizza ordering application crafted to simplify and enhance the ordering experience for both customers and store admins. Users can effortlessly browse the menu, customize pizzas to their taste, and manage their cart with ease. Administrators have powerful tools to manage inventory, track orders, and update customer details, all in one seamless system.

## Screenshots

### Client View

Log into your account

![Login Page](https://drive.google.com/uc?export=view&id=1zQIVg4C4SDLHLVFF3ORU_N294qdGNks2)

Browse full pizza selection

![Home Page](https://drive.google.com/uc?export=view&id=1bfkrW_0tUBLlQ_oGYTdeL2hqjiaNN26C)

Quickly search the collection

![Search Pizza Home](https://drive.google.com/uc?export=view&id=1EookyjpRTPNxTRgBmpS_cjfQiN9peMM4)

Select items and place your order

![Cart](https://drive.google.com/uc?export=view&id=1FeznW801j2jMEguI9buqADvuaLnrqS4B)

Check your order history

![My Orders](https://drive.google.com/uc?export=view&id=1L6Mnc1GlK3_9Lr49hCBHeu8UJDelq680)

Access your profile

![My Profile](https://drive.google.com/uc?export=view&id=1lXow5aDsT2Hl5sr-CMyVIdp0HoVtyXZV)

### Admin Panel
Browse the pizza menu

![Pizza List](https://drive.google.com/uc?export=view&id=1MkhCt_qL9Y8goh91rN3TH-8Uzi8dLtdr)

Modify Pizza

![Update Pizza](https://drive.google.com/uc?export=view&id=1hmjUwYiIRlPRCuheFDnZu7Ke7IhBzle3)

Explore customer profiles

![Customers List](https://drive.google.com/uc?export=view&id=15IdEqXq2E4On_SlRLqyqIVxc_fv5eaga)

View all admins except yourself

![Admin List](https://drive.google.com/uc?export=view&id=1GvxeZZ2dcGWlfW6i6I6_mJJl7n_71dQM)

Browse all orders with filters for username and date

![All Orders](https://drive.google.com/uc?export=view&id=1ZnRgvDGeKJLXTauA8BMu_dyd1wo9vgDQ)

## Feature Summary

The images above showcase the core features of the Pizza Ordering System:

- **Cart Management**: Add or remove pizzas, select sizes, and adjust quantities in real time
- **Customer Management**: Add, view, update, and delete customer records
- **Order Tracking**: View complete order history for efficient order tracking and customer service
- **Validation & Control**: Enforce rules for customizing orders & managing inventory to ensure smooth process
- **Authentication & Authorization**: Secure user access with JWT for login, validation, & role-based permissions


## Tech Stack
**Frontend**: ReactJS (TypeScript), Bootstrap  
**Backend**: NestJS   
**Database**: PostgreSQL    
**API**: RESTful APIs  
**Authentication**: JWT (JSON Web Token)  
**Containerization**: Docker

## REST API Reference

### Authentication

| Method | Endpoint       | Role   | Description                 |
|--------|---------------|--------|-----------------------------|
| `POST` | `/auth/login`  | Public | Login a user and return JWT token |

### Customers

| Method | Endpoint                     | Role           | Description                       |
|--------|-----------------------------|----------------|-----------------------------------|
| `POST` | `/customers`                 | Public         | Create a new customer             |
| `GET`  | `/customers`                 | Admin          | Get all customers                 |
| `POST` | `/customers/by-role`         | Admin          | Get customers by role             |
| `GET`  | `/customers/:id`             | Admin/Customer | Get customer by ID                |
| `PATCH`| `/customers/:id`             | Admin/Customer | Update customer info              |
| `DELETE`| `/customers/:id`            | Admin/Customer | Delete a customer                 |
| `GET`  | `/customers/:id/full-name`   | Admin/Customer | Get full name of a customer      |
| `GET`  | `/customers/:id/address`     | Admin/Customer | Get address of a customer         |
| `GET`  | `/customers/search/customers`| Public         | Search customers by query         |
| `GET`  | `/customers/search/admins`   | Public         | Search admins by query            |

### Pizzas

| Method | Endpoint                   | Role           | Description                     |
|--------|----------------------------|----------------|---------------------------------|
| `POST` | `/pizzas`                  | Admin/Customer | Create a pizza                  |
| `GET`  | `/pizzas`                  | Public         | Get all pizzas                  |
| `GET`  | `/pizzas/:id`              | Admin/Customer | Get pizza by ID                 |
| `PATCH`| `/pizzas/:id`              | Admin/Customer | Update pizza info               |
| `DELETE`| `/pizzas/:id`             | Admin/Customer | Delete a pizza                  |
| `POST` | `/pizzas/search-by-name`   | Admin/Customer | Search pizza by name            |

### Orders

| Method | Endpoint                          | Role           | Description                       |
|--------|----------------------------------|----------------|-----------------------------------|
| `POST` | `/orders`                         | Customer       | Create a new order                 |
| `GET`  | `/orders`                         | Admin          | Get all orders                     |
| `GET`  | `/orders/customer/:customerId`    | Customer       | Get orders by customer ID          |
| `GET`  | `/orders/filter`                  | Admin          | Filter orders by name/date         |
| `GET`  | `/orders/:id`                     | Customer       | Get order by ID                    |
| `PATCH`| `/orders/:id`                     | Admin/Customer | Update order info                  |
| `DELETE`| `/orders/:id`                    | Admin/Customer | Delete an order                    |
| `GET`  | `/orders/customer/:customerId/date` | Customer     | Get orders for customer by date    |

## License
This project is licensed under the [MIT License](LICENSE).
  
For any issues or feedback, please contact saurabh.jojare@gmail.com.
