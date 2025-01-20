# Real-Time Chat Application Backend

A robust real-time chat backend service built with Node.js, Express, Socket.IO, and Sequelize ORM. This service provides real-time messaging capabilities with persistent storage in PostgreSQL.

## 🌟 Features

- Real-time bidirectional communication using Socket.IO
- PostgreSQL database integration with Sequelize ORM
- User authentication and session management
- Conversation and message management
- Support for different message types (text, image, video, file)
- Soft delete functionality for data integrity
- Timestamp tracking (created_at, updated_at, deleted_at)
- Environment-based configuration
- TypeScript implementation for better type safety
- Repository pattern for clean architecture
- Comprehensive error handling
- Connection pooling and optimization

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.IO
- **Environment Management**: dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager
- TypeScript
- nodemon (for development)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following configurations:

```env
PORT=8001
BASE_URL=http://localhost

DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_DIALECT=postgres
DB_PORT=5432
DB_SCHEMA=public

FRONTEND_URL=http://localhost:5173
DJANGO_API_URL=http://localhost:8000/conversations
```

### 4. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE your_db_name;
```

2. Run migrations (if using Sequelize CLI):
```bash
npx sequelize-cli db:migrate
```

### 5. Running the Server

#### Development Mode (Recommended)

1. Open two terminal windows/tabs
2. In the first terminal, run TypeScript compiler in watch mode:
```bash
npm run build:watch
```
You should see:
```
[HH:MM:SS] File change detected. Starting incremental compilation...
[HH:MM:SS] Found 0 errors. Watching for file changes.
```

3. In the second terminal, run the server with nodemon:
```bash
npm run start:watch
```
You should see:
```
[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node dist/server.js`
Server started at http://localhost:8001
postgres connected
```

This setup will:
- Automatically recompile TypeScript files when they change (`build:watch`)
- Automatically restart the server when compiled files change (`start:watch`)

#### Production Mode

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
src/
├── config/             # Configuration files
│   ├── database.js     # Database configuration
│   ├── index.ts        # Configuration exports
│   └── ...
├── interface/          # TypeScript interfaces
│   ├── messageInterface.ts
│   ├── userInterface.ts
│   └── ...
├── models/            # Sequelize models
│   ├── conversation.ts
│   ├── message.ts
│   └── ...
├── repositories/      # Repository pattern implementation
│   ├── baseRepository.ts
│   ├── messageRepository.ts
│   └── ...
├── service/          # Business logic services
│   └── messageService.ts
├── socket/           # Socket.IO implementation
│   └── chat.socket.ts
└── server.ts         # Main application file
```

[Rest of the README remains the same...]

## 🔌 WebSocket Events

### Client to Server

| Event | Payload | Description |
|-------|---------|-------------|
| `connection` | `{ userId: string }` | Initial connection with user ID |
| `sendMessage` | `{ conversation_id: number, content: string, type: string }` | Send a new message |
| `disconnect` | - | Client disconnection |

### Server to Client

| Event | Payload | Description |
|-------|---------|-------------|
| `receiveMessage` | `MessageWithSenderInterface` | Broadcast received message |

## 💾 Database Schema

### Users Table
- id (PK)
- email
- username
- password
- phone_number
- profile_picture
- role (enum: 'landlord', 'tenant')
- is_active
- is_staff
- is_superuser
- date_joined
- last_login
- timestamps

### Conversations Table
- id (PK)
- timestamps

### Conversation Participants Table
- conversation_id (PK, FK)
- user_id (PK, FK)
- timestamps

### Messages Table
- id (PK)
- conversation_id (FK)
- sender_id (FK)
- content
- type
- read_at
- timestamps

## 🔒 Security Considerations

- All database passwords and sensitive data are stored in environment variables
- CORS configuration with appropriate origins
- Soft delete implementation for data protection
- Input validation and sanitization
- Error handling and logging

## ⚡ Performance Optimizations

1. Connection Pooling
2. Indexed Database Fields
3. Efficient Socket Event Handling
4. Duplicate Message Prevention
5. Proper Error Handling and Recovery

## 🧪 Testing

```bash
# Run tests
npm test
# or
yarn test
```

## 📦 Production Deployment

1. Set production environment variables
2. Build the TypeScript code:
```bash
npm run build
# or
yarn build
```
3. Start the production server:
```bash
npm start
# or
yarn start
```

## 📝 API Documentation

For detailed API documentation, please refer to the [API Documentation](docs/API.md) file.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Rajesh Adhikari - ((https://github.com/rjad-dev))
- Sachin Acharya - (https://github.com/sachiin-acharya)

## 🙏 Acknowledgments

- The brilliant Rajesh Adhikari. I owe you at least 5 cups of tea for this.

## 🆘 Support

For support, email acharyasachin429@gmail.com or create an issue in the repository.
