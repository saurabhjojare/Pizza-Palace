## 🔗 REST API Reference

### Authentication

| Method | Endpoint          | Role       | Description                       | Request Body Example |
|--------|-----------------|------------|-----------------------------------|--------------------|
| `POST` | `/auth/login`    | Public     | Login a user and return JWT token | `{ "email": "john@example.com", "password": "password123" }` |

---

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

---

### Pizzas

| Method | Endpoint               | Role        | Description                     | Request Body Example |
|--------|----------------------|------------|---------------------------------|--------------------|
| `POST` | `/pizzas`             | Admin/Customer | Create a pizza                 | `{ "name": "Margherita", "price": 10.99, "ingredients": ["cheese", "tomato"], "size": ["S", "M", "L"] }` |
| `GET`  | `/pizzas`             | Public     | Get all pizzas                  | N/A |
| `GET`  | `/pizzas/:id`         | Admin/Customer | Get pizza by ID               | N/A |
| `PATCH`| `/pizzas/:id`         | Admin/Customer | Update pizza info              | `{ "price": 12.99 }` |
| `DELETE`| `/pizzas/:id`        | Admin/Customer | Delete a pizza                | N/A |
| `POST` | `/pizzas/search-by-name` | Admin/Customer | Search pizza by name         | `{ "name": "Margherita" }` |

---

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

---

### Order Lines

| Method | Endpoint                | Role  | Description                     | Request Body Example |
|--------|------------------------|-------|---------------------------------|--------------------|
| `POST` | `/order-line`           | Customer | Create an order line           | `{ "orderId": 1, "pizzaId": 2, "quantity": 2 }` |
| `GET`  | `/order-line`           | Admin   | Get all order lines            | N/A |
| `GET`  | `/order-line/:id`       | Admin   | Get order line by ID           | N/A |
| `PATCH`| `/order-line/:id`       | Admin   | Update order line              | `{ "quantity": 3 }` |
| `DELETE`| `/order-line/:id`      | Admin   | Delete order line              | N/A |
