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
