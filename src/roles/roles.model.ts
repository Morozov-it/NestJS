import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

//указываются необходимые поля для СОЗДАНИЯ нового User
interface RoleCreationAttrs {
    value: string;
    description: string;
}

//декоратор для создания таблицы в базе данных с названием roles
@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    //декоратор для swagger
    @ApiProperty({ example: 1, description: 'Unique id of role'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ example: 'ADMIN', description: "Unique value of role"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({ example: 'Crud operations', description: 'Possibilities of the role'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    description: string;

    //описание связи между таблицами: 
    //через третью таблицу UserRoles только с внешними ключами
    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}