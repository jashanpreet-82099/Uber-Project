# User Registration API

## `POST /user/register`

Creates a new user account and returns an authentication token.

> The route is mounted under `/user`, so the full endpoint is `/user/register`.

### Request

Set the request header:

```http
Content-Type: application/json
```

Send the user data in the request body as JSON:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Request fields

| Field                | Type   | Required | Requirements                                                   |
| -------------------- | ------ | -------- | -------------------------------------------------------------- |
| `fullname.firstname` | string | Yes      | At least 3 characters                                          |
| `fullname.lastname`  | string | No       | If provided, at least 3 characters according to the user model |
| `email`              | string | Yes      | Must be a valid email address and unique                       |
| `password`           | string | Yes      | At least 6 characters                                          |

The password is hashed before the user is stored in the database.

### Success response

**Status:** `201 Created`

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation error

**Status:** `400 Bad Request`

Returned when a required field is missing or a field does not meet its validation rules.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "a@b",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

Validation messages include:

- `Invalid Email`
- `First name must be at least 3 characters long`
- `password must be at least 6 characters`

### Other status codes

- `500 Internal Server Error`: An unexpected server or database error occurs, such as a duplicate email or a database connection failure.

## Example using cURL

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```

## `POST /user/login`

Authenticates an existing user and returns an authentication token.

### Request

Set the request header:

```http
Content-Type: application/json
```

Send the user's email and password in the request body as JSON:

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Request fields

| Field      | Type   | Required | Requirements                  |
| ---------- | ------ | -------- | ----------------------------- |
| `email`    | string | Yes      | Must be a valid email address |
| `password` | string | Yes      | At least 6 characters         |

### Success response

**Status:** `200 OK`

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Validation error

**Status:** `400 Bad Request`

Returned when the email is invalid or the password is shorter than 6 characters.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "short",
      "msg": "password is aleast 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### Invalid credentials

**Status:** `401 Unauthorized`

Returned when the email is not registered or the password does not match.

```json
{
  "message": "Invalid email or password"
}
```

## Example using cURL

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```

## `GET /user/profile`

Returns the profile of the currently authenticated user.

### Authentication

Provide the JWT in either the `token` cookie or an authorization header:

```http
Authorization: Bearer <jwt-token>
```

### Success response

**Status:** `200 OK`

```json
{
  "_id": "<user-id>",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Unauthorized response

**Status:** `401 Unauthorized`

Returned when the token is missing, invalid, expired, or blacklisted.

```json
{
  "message": "Unauthorized"
}
```

### Example using cURL

```bash
curl http://localhost:3000/user/profile \
  -H "Authorization: Bearer <jwt-token>"
```

## `GET /user/logout`

Logs out the authenticated user, clears the `token` cookie, and blacklists the JWT for 24 hours.

### Authentication

Provide the JWT in the `token` cookie or as a Bearer token:

```http
Authorization: Bearer <jwt-token>
```

## Captain Routes

### `POST /captain/register`

Creates a new captain account, hashes the password, and returns an authentication token with the captain record. No authentication is required.

### Request

Set the request header:

```http
Content-Type: application/json
```

Send the captain and vehicle data in the request body as JSON:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Driver"
  },
  "email": "jane.driver@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "White",
    "model": "Toyota Prius",
    "plate": "ABC123",
    "vehicleType": "car",
    "capacity": 4
  }
}
```

### Request fields

| Field                 | Type    | Required | Requirements                             |
| --------------------- | ------- | -------- | ---------------------------------------- |
| `fullname.firstname`  | string  | Yes      | At least 3 characters                    |
| `fullname.lastname`   | string  | Yes      | At least 3 characters                    |
| `email`               | string  | Yes      | Must be a valid email address and unique |
| `password`            | string  | Yes      | At least 6 characters                    |
| `vehicle.color`       | string  | Yes      | At least 3 characters                    |
| `vehicle.model`       | string  | Yes      | At least 3 characters                    |
| `vehicle.plate`       | string  | Yes      | At least 3 characters                    |
| `vehicle.vehicleType` | string  | Yes      | Must be `car`, `bike`, or `auto`         |
| `vehicle.capacity`    | integer | Yes      | At least 1                               |

The password is hashed before the captain is stored in the database.

### Success response

**Status:** `201 Created`

```json
{
  "message": "Captain registered successfully",
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Driver"
    },
    "email": "jane.driver@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "White",
      "model": "Toyota Prius",
      "plate": "ABC123",
      "vehicleType": "car",
      "capacity": 4
    }
  }
}
```

### Validation error

**Status:** `400 Bad Request`

Returned when a required field is missing or a field does not meet its validation rules.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "van",
      "msg": "Vehicle type must be car, bike or auto",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

### Duplicate email

**Status:** `400 Bad Request`

Returned when a captain already exists with the submitted email address.

```json
{
  "message": "Captain with this email already exists."
}
```

## Example using cURL

```bash
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Jane",
      "lastname": "Driver"
    },
    "email": "jane.driver@example.com",
    "password": "secret123",
    "vehicle": {
      "color": "White",
      "model": "Toyota Prius",
      "plate": "ABC123",
      "vehicleType": "car",
      "capacity": 4
    }
  }'
```

### `POST /captain/login`

Authenticates an existing captain and returns a JWT. The response also sets the `token` cookie.

### Request

```json
{
  "email": "jane.driver@example.com",
  "password": "secret123"
}
```

### Request fields

| Field      | Type   | Required | Requirements                  |
| ---------- | ------ | -------- | ----------------------------- |
| `email`    | string | Yes      | Must be a valid email address |
| `password` | string | Yes      | At least 6 characters         |

### Success response

**Status:** `200 OK`

```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Driver"
    },
    "email": "jane.driver@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "White",
      "model": "Toyota Prius",
      "plate": "ABC123",
      "vehicleType": "car",
      "capacity": 4
    }
  }
}
```

### Validation error

**Status:** `400 Bad Request`

Returned when the email is invalid or the password is shorter than 6 characters.

### Invalid credentials

**Status:** `401 Unauthorized`

Returned when the email is not registered or the password does not match.

```json
{
  "message": "Invalid email or password"
}
```

### Example using cURL

```bash
curl -X POST http://localhost:3000/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.driver@example.com",
    "password": "secret123"
  }'
```

### `GET /captain/profile`

Returns the profile of the currently authenticated captain.

### Authentication

Provide the JWT in either the `token` cookie or an authorization header:

```http
Authorization: Bearer <jwt-token>
```

### Success response

**Status:** `200 OK`

The response contains the captain record in a `captain` property.

```json
{
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Driver"
    },
    "email": "jane.driver@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "White",
      "model": "Toyota Prius",
      "plate": "ABC123",
      "vehicleType": "car",
      "capacity": 4
    }
  }
}
```

### `GET /captain/logout`

Logs out the authenticated captain, clears the `token` cookie, and blacklists the JWT.

### Authentication

Provide the JWT in the `token` cookie or as a Bearer token:

```http
Authorization: Bearer <jwt-token>
```

### Success response

**Status:** `200 OK`

```json
{
  "message": "logout successfully"
}
```

### Unauthorized response

**Status:** `401 Unauthorized`

Returned when the token is missing, invalid, expired, or already blacklisted. This applies to both `/captain/profile` and `/captain/logout`.

```json
{
  "message": "Unauthorized"
}
```

### Example using cURL

```bash
curl http://localhost:3000/captain/logout \
  -H "Authorization: Bearer <jwt-token>"
```
