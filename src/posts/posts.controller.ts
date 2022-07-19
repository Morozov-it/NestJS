import { Body, Controller, UsePipes, Post, UseGuards, Req, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.model'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    //dependency injection
    constructor(private postsService: PostsService) {}

    @ApiOperation({ summary: 'Creating new post' })
    @ApiResponse({ status: 200, type: PostModel })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() postDto: CreatePostDto,
        @Req() req: any,
        @UploadedFile() image: any) {
        return this.postsService.createPost(postDto, req, image)
    }
}
