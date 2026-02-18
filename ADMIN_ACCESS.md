# Admin Panel Access Guide

## How to Access
The admin panel is hidden from normal users. You can access it by navigating directly to the URL:

**URL:** `/admin` (e.g., `http://localhost:3000/admin` or `yourdomain.com/admin`)

## Authentication
This area is protected by Basic Authentication. You will see a browser prompt asking for a username and password.

### Default Credentials
- **Username:** `admin`
- **Password:** `admin123`

## Configuration
You can change the credentials by setting the following environment variables in your server configuration (or `.env` file locally):

```env
ADMIN_USER=your_new_username
ADMIN_PASSWORD=your_new_password
```

## Troubleshooting
- If you see a "Backend failed" error in the dashboard, check the backend server logs.
- If you are repeatedly asked for a password, ensure you are typing the credentials correctly.
