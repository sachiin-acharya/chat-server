import { Database } from "../config";
import { DataTypes } from "sequelize";

const sequelize = Database.sequelize;

const User = sequelize.define("users_user", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('landlord', 'tenant'),
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    is_staff: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_superuser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    date_joined: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'users_user',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['email'],
            where: {
                deleted_at: null
            }
        },
        {
            unique: true,
            fields: ['username'],
            where: {
                deleted_at: null
            }
        }
    ]
});

export default User;