# fullstack_boltalka
A full-stack "boltalka" application with a backend API on Django and a frontend SPA on React JS. At the moment, the frontend is made almost without using css.
### Written on Python 3.10!!!
## API Reference

### Register

```bash
  POST /api/register
```

#### Body
| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------  |
| `username`| `string` | **Required**. Your username |
| `password`| `string` | **Required**. Your password |

### Login

```bash
  POST /api/login
```

#### Body
| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `username`| `string` | **Required**. Your username |
| `password`| `string` | **Required**. Your password |

### Logout

```bash
  POST /api/logout
```

#### Headers
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`| `Bearer ${token}` | **Required**. Your token |

### Get user

```bash
  GET /api/user
```

#### Headers
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`| `Bearer ${token}` | **Required**. Your token |


### Create dialog

```bash
  POST /api/create_dialog
```

#### Headers
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`| `Bearer ${token}` | **Required**. Your token |


### Delete dialog

```bash
  POST /api/delete_dialog/${id}
```

#### Headers
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`| `Bearer ${token}` | **Required**. Your token |

#### Request
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`| `integer` | **Required**. Dialog id |


### Get dialogs

```bash
  GET /api/dialogs
```

#### Headers
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`| `Bearer ${token}` | **Required**. Your token |


### Get dialog with id

```bash
  GET /api/dialog/${id}
```

#### Headers
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`| `Bearer ${token}` | **Required**. Your token |

#### Request
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`| `integer` | **Required**. Dialog id |


### Send message

```bash
  POST /api/send_message
```

#### Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dialog`| `integer` | **Required**. Dialog id |
| `message`| `string` | **Required**. Message content |

#### Headers
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`| `Bearer ${token}` | **Required**. Your token |






## Installation

### Python
Install python3.10

Install virtualenv with python pip

```bash
  pip install virtualenv
```

Create virtualenv in backend folder
```bash
  virtualenv venv
```

Install requirements.txt into venv
```bash
  venv\Scripts\python.exe -m pip install -r requirements.txt
```

Make migrations and migrate django database
```bash
  venv\Scripts\python.exe manage.py makemigrations
  venv\Scripts\python.exe manage.py migrate
```

Run django server
```bash
  venv\Scripts\python.exe manage.py runserver
```

Now backend server is available on 
```bash
  http://localhost:8000
```

### Node
Install Node js

Install npm with packages in frontend folder
```bash
  npm install
```

Run react js server
```bash
  npm start
```

Now frontend server is available on 
```http
  http://localhost:3000
```
