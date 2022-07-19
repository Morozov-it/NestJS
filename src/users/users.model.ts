import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

//указываются необходимые поля для СОЗДАНИЯ нового User
interface UserCreationAttrs {
    email: string;
    password: string;
}

//декоратор для создания таблицы в базе данных с названием users
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    //декоратор для swagger
    @ApiProperty({ example: 1, description: 'Unique id of user'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ example: 'user@email.com', description: 'Email address of user'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({ example: '123', description: 'Password of user'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({ example: true, description: 'Is user banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({ example: 'for abusing', description: "Reason of user's banned"})
    @Column({type: DataType.STRING, allowNull: true})
    banreason: string;

    //описание связи между таблицами: 
    //через третью таблицу UserRoles только с внешними ключами
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    //один пользователь имеет много постов
    @HasMany(() => Post)
    posts: Post[]
}