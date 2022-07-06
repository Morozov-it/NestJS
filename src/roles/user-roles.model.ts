import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

//декоратор для создания таблицы в базе данных с названием roles, без полей с датами создания и обновления
@Table({tableName: 'user-roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    //декоратор для внешнего ключа
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    //декоратор для внешнего ключа
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

}