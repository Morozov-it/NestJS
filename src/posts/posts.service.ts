import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    //внедрение модели
    constructor(@InjectModel(Post) private postModel: typeof Post) { }

    async createPost(postDto: CreatePostDto, req: any, image: any) {
        console.log(postDto, req, image)
        return { postDto, req, image }
    }
}
