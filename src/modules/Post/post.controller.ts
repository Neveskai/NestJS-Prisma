import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common'
import { PostService } from './post.service'
import { Post as PostModel } from '@prisma/client'
import { CreatePostDto } from './dto/createPost.dto'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('feed/published')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    })
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string): Promise<PostModel[]> {
    const query = filteredPostsQuery(searchString)

    return this.postService.posts(query)
  }

  @Post()
  async createDraft(@Body() postData: CreatePostDto): Promise<PostModel> {
    const { title, content, authorId } = postData

    const payload = {
      title,
      content,
      author: {
        connect: { id: authorId as number },
      },
    }

    return this.postService.createPost(payload)
  }

  @Put('publish/:id')
  async publishPost(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id },
      data: { published: true },
    })
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postService.deletePost({ id })
  }
}

const filteredPostsQuery = (searchString: string) => ({
  where: {
    OR: [
      {
        title: { contains: searchString },
      },
      {
        content: { contains: searchString },
      },
    ],
  },
})
