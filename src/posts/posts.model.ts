import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

//указываются необходимые поля для СОЗДАНИЯ нового User
interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

//декоратор для создания таблицы в базе данных с названием posts
@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    //декоратор для swagger
    @ApiProperty({ example: 1, description: 'Unique id of post'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ example: 'title', description: 'Title of post'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({ example: 'Content', description: 'Content of post'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({ example: 'Image' })
    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    //один пост принадлежит одному пользователю
    @BelongsTo(() => User)
    author: User
}