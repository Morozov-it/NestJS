import { Column, DataType, Model, Table } from "sequelize-typescript";

//указываются необходимые поля для СОЗДАНИЯ нового User
interface UserCreationAttrs {
    email: string;
    password: string;
}

//декоратор для создания таблицы в базе данных
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING, allowNull: false})
    banreason: string;
}