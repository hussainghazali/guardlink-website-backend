import { Injectable } from "@nestjs/common";
import { Repository, ServerDescription } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterBlogDto } from "./dto/services-register.dto";
import { Blog } from "./entities/blog.entity";
import { FilesService } from "src/files/files.service";
import { blob } from "stream/consumers";

@Injectable()
export class BlogService {
  constructor(
    private readonly filesService: FilesService,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(
    registerServiceDto: RegisterBlogDto,
    file?: Express.Multer.File
  ) {
    let fileUpload: any;

    if (file) {
      fileUpload = file && (await this.filesService.create(file));
    }

    const { title, description } = registerServiceDto;
    
    const blog = this.blogRepository.create({
      title, description,
      fileId: fileUpload ? fileUpload.id : null,
    });

    return this.blogRepository.save(blog);
  }

  async getAllServices() {
    const allUsers = await this.blogRepository.find();
  
    if (!allUsers || allUsers.length === 0) {
      return {
        message: "No users retrieved",
        data: [],
      };
    }
  
    const formattedUsers = await Promise.all(
      allUsers.map(async (blog) => {
        const file = await this.filesService.findOne(blog.fileId);
        console.log("File : ", file);
  
        let fileURL = null;
        if (file?.data) {
          fileURL = this.filesService.generateFileURL(file);
          console.log("File URL : ", fileURL);
        }
  
        return {
          title: blog.title,
          description: blog.description,
          file: fileURL,
        };
      })
    );
  
    return {
      message: "All Services retrieved successfully",
      data: formattedUsers,
    };
  }
}
