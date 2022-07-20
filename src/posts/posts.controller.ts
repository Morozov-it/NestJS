import { Controller, Post, UseGuards, UploadedFile, Req, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.model'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    //dependency injection
    constructor(private postsService: PostsService) {}

    //UseInterceptors - перехватчик для получения файла из тела запроса, image - это название поля в теле запроса
    @ApiOperation({ summary: 'Creating new post' })
    @ApiResponse({ status: 200, type: PostModel })
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Req() req: Request,
        @UploadedFile() image: any) {
        return this.postsService.createPost(req, image)
    }
}
