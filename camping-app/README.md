# Camping Web App

## MySQL Setup Instructions

### Prerequisites

- Install [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- Install [Node.js](https://nodejs.org/)
- Install MySQL2 and Sequelize:
  ```sh
  npm install mysql2 sequelize
  ```

### Database Setup

1. Start MySQL server.
2. Log in to MySQL:
   ```sh
   mysql -u root -p
   ```
3. Create the database:
   ```sql
   CREATE DATABASE camping_app;
   USE camping_app;
   ```
4. Ensure strict mode for better error handling:
   ```sql
   SET @@SESSION.sql_mode = 'STRICT_TRANS_TABLES';
   ```
5. Create tables (refer to the schema below).

## Entity-Relationship Diagram (ERD)

![Camping App ERD](camping-app\src\ERD.png)

## API Documentation

### Users API

#### Get all User

**Endpoint:** `GET /api/users/`

**Response:**

```json
{
  "result": 200,
  "data": [
    {
      "user_id": "45a2f3fe-010b-11f0-82e0-644ed7b0b165",
      "first_name": "Alice",
      "last_name": "Johnson",
      "username": "alice_j",
      "email": "alice@example.com",
      "profile_pic": "https://example.com/profiles/alice.jpg",
      "is_verified": true,
      "social_links": {
        "twitter": "@alice_j",
        "instagram": "@alice.j"
      },
      "created_at": "2025-03-14T19:33:57.000Z"
    }
  ]
}
```

### Camping Sites API

#### Create Site

**Endpoint:** `POST /api/campingSite/create`
**Request Body:**

```json
{
  "title": "Great Barrier Reef Camp",
  "description": "A tropical camping site located near the stunning Great Barrier Reef, offering snorkeling, diving, and breathtaking ocean views.",
  "location": "Queensland, Australia",
  "coordinates": {
    "type": "Point",
    "coordinates": [145.75, -16.92]
  },
  "average_rating": "4.90"
}
```

**Response:**

```json
{
  "result": 200,
  "data": {
    "site_id": "745397db-be39-4240-8db4-cee6c25cb6b9",
    "created_at": "2025-03-18T04:21:12.421Z",
    "updated_at": "2025-03-18T04:21:12.421Z",
    "title": "Great Barrier Reef Camp",
    "description": "A tropical camping site located near the stunning Great Barrier Reef, offering snorkeling, diving, and breathtaking ocean views.",
    "location": "Queensland, Australia",
    "coordinates": {
      "type": "Point",
      "coordinates": [145.75, -16.92]
    },
    "average_rating": "4.90"
  }
}
```

## Query Examples

### Select all users

```sql
SELECT * FROM Users;
```

### Get all camping sites with ratings

```sql
SELECT CampingSites.title, Ratings.rating
FROM CampingSites
JOIN Ratings ON CampingSites.site_id = Ratings.site_id;
```

### Get all tags

```sql
SELECT * FROM Tags;
```
