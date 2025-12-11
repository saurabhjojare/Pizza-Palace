# Pizza Palace

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

| Method | Endpoint      | Description |
|--------|---------------|-------------|
| POST   | /singup       | User registration |
| POST   | /login        | User login |

### Customer

| Method | Endpoint                    | Description |
|--------|-----------------------------|-------------|
| GET    | /customer                  | Get all customers |
| GET    | /customer/:id              | Get customer by ID |
| PATCH  | /customer/:id              | Update customer info |
| DELETE | /customer/:id              | Delete a customer |

### Pizza

| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| POST   | /pizza                | Create a pizza |
| GET    | /pizza                | Get all pizzas |
| GET    | /pizza/:id            | Get pizza by ID |
| PATCH  | /pizza/:id            | Update pizza info |
| DELETE | /pizza/:id            | Delete a pizza |

### Order

| Method | Endpoint                        | Description |
|--------|---------------------------------|-------------|
| POST   | /order                         | Create a new order |
| GET    | /order                         | Get all orders |
| GET    | /order/customer/:customerId    | Get orders by customer ID |
| GET    | /order/:id                     | Get order by ID |
| PATCH  | /order/:id                     | Update order info |
| DELETE | /order/:id                     | Delete an order |

## How to Run Locally

> **Note:** Make sure Docker is installed on your machine before running these commands.

<p><strong>Clone the repository:</strong></p>

```bash
git clone https://github.com/saurabhjojare/Pizza-Ordering-System.git
cd Pizza-Ordering-System
```

<p><strong>Run backend:</strong></p>

```bash
cd pizza-backend
docker compose up -d --build
```

<p><strong>Run frontend:</strong></p>

```bash
cd ../pizza-frontend
docker compose up -d --build
```

## License
This project is licensed under the [MIT License](LICENSE).
  
For any issues or feedback, please contact saurabh.jojare@gmail.com.
