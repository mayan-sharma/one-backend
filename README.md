# One
API for a blogging site

## Features
* [x] Users can register and login
* [x] Users can create/edit blogs
* [x] Admin user can do all CRUD operations on blogs

## Setup locally
- Clone the repo using `git clone https://github.com/mayan-sharma/one-backend.git`
- cd 'one-backend'
- Create `.env` file in the root of the project.

```
NODE_ENV=''
PORT=''
CLIENT_URL=''
DATABASE_USER=''
DATABASE_HOST=''
DATABASE_PORT=
DATABASE_NAME=''
DATABASE_PASSWORD=''
JWT_PRE_REGISTER_SECRET=''
JWT_SECRET=''
JWT_PASSWORD_RESET_SECRET=''
SENDGRID_API_KEY=''
EMAIL_TO=''
EMAIL_FROM=''
GOOGLE_CLIENT_ID=''
GOOGLE_CLIENT_SECRET=''
```

## API Reference
### /auth
Path | Method | Description
--- | --- | ---
| /pre-register | POST | Sends an email confirmation for registration |
| /register | POST | Registers a user |
| /login | POST | Login |
| /google-login | POST | Authentication using GoogleAuth |
| /logout | GET | Logout Action |
| /:username | GET | Gets a user's public profile |
| /photo/:username | GET | Gets a user's profile photo |
| / | GET | Gets a user |
| /update | PUT | Update a user |
| /forgot-password | PUT | Sends a reset password email |
| /reset-password | PUT | Update a user's password |

### /blogs
Path | Method | Description
--- | --- | ---
| /blogs-categories-tags | GET | Gets all blogs, categories, tags |
| /photo/:slug | GET | Get landing photo of a blog |
| /search/:term | GET | Search blogs |
| /related/:slug | GET | Gets related blogs |
| /:slug | GET | Gets a blog |
| /user/:username | GET | Gets all blogs by user |
| / | GET | Gets all blogs |
| / | POST | Creates a blog |
| /:slug | DELETE | Deletes a blog (admin) |
| /:slug | PUT | Updates a blog (admin) |
| /user/:slug | DELETE | Deletes a blog |
| /user/:slug | PUT | Updates a blog |

### /categories 
Path | Method | Description
--- | --- | ---
| / | POST | Creates a category |
| / | GET | Gets all categories |
| /:slug | GET | Gets a category |
| /:slug | DELETE | Deletes a category |

### /tags
Path | Method | Description
--- | --- | ---
| / | POST | Creates a tag |
| / | GET | Gets all tags |
| /:slug | GET | Gets a tag |
| /:slug | DELETE | Deletes a tag |

### /contact
Path | Method | Description
--- | --- | ---
| / | POST | Sends a mail to the platform |
| /user | POST | Sends a mail to the user |

## Contributing
Pull requests are welcome.