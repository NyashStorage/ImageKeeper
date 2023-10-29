import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import moment from 'moment';
import { DEFAULT_LIMIT, FilesService } from './files.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../app/decorators/current-user.decorator';
import { JwtPayloadDto } from '../app/dao/jwt-payload.dto';
import { castToEntity } from '../utils/helpers/type.helpers';
import { FindFileResponse } from './dao/responses/find-file.response';
import {
  ErrorResponse,
  ValidationErrorResponse,
} from '../app/dao/responses/error.response';
import { UpdateFileRequest } from './dao/requests/update-file.request';
import { FileModel } from './models/file.model';
import { ListFileRequest } from './dao/requests/list-file.request';
import { ListFileResponse } from './dao/responses/list-file.response';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('single')
  @ApiOperation({ summary: 'Uploads a single file to server' })
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: FindFileResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'File not specified',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  async uploadSingle(
    @UploadedFile() image: Express.Multer.File,
    @CurrentUser() user: JwtPayloadDto,
  ): Promise<FindFileResponse> {
    return this.prepareFindResponse(
      this.uploadFile(image?.buffer, image?.mimetype, user.userId),
    );
  }

  @Post('multiple')
  @ApiOperation({ summary: 'Uploads multiple files to server' })
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: [FindFileResponse],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'File not specified',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  async uploadMultiple(
    @UploadedFiles() images: Express.Multer.File[] = [null],
    @CurrentUser() user: JwtPayloadDto,
  ): Promise<FindFileResponse[]> {
    const promises = [];

    // Upload all images at same time, keeping promises intact.
    for (const image of images)
      promises.push(
        this.uploadFile(image?.buffer, image?.mimetype, user.userId),
      );

    // Wait for all images to upload and get rid of unnecessary fields in responses.
    const filesData = await Promise.all(promises);

    const files = [];
    for (const fileData of filesData)
      files.push(await this.prepareFindResponse(fileData));

    return files;
  }

  @Get()
  @ApiOperation({ summary: 'Gets a list of uploaded files' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ListFileResponse,
  })
  async listFiles(
    @Query() { page, limit }: ListFileRequest,
  ): Promise<ListFileResponse> {
    return this.prepareListResponse(page, limit);
  }

  @Get('/owned')
  @ApiOperation({ summary: 'Gets list of uploaded files of current user' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ListFileResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  async listOwnedFiles(
    @Query() { page, limit }: ListFileRequest,
    @CurrentUser() { userId }: JwtPayloadDto,
  ): Promise<ListFileResponse> {
    return this.prepareListResponse(page, limit, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: "Edits current user's file by id" })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindFileResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'File with identifier ":id" was not found or you are not its owner',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'title should not be empty',
    type: ValidationErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFileRequest: UpdateFileRequest,
    @CurrentUser() user: JwtPayloadDto,
  ): Promise<FindFileResponse> {
    return this.prepareFindResponse(
      this.filesService.updateFile(id, updateFileRequest, user.userId),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes current user's file by id" })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindFileResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'File with identifier ":id" was not found or you are not its owner',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayloadDto,
  ): Promise<FindFileResponse> {
    return this.prepareFindResponse(
      this.filesService.deleteFile(id, user.userId),
    );
  }

  /**
   * Uploads file, generating file name.
   */
  async uploadFile(buffer: Buffer, mimeType: string, userId: string) {
    return this.filesService.uploadFile(buffer, mimeType, {
      title: moment().format('D MMMM'),
      ownerId: userId,
    });
  }

  async prepareListResponse(
    page: number = 1,
    limit: number = DEFAULT_LIMIT,
    userId?: string | undefined,
  ) {
    const filesData = await this.filesService.listFiles(
      --page * limit,
      limit,
      userId ? { ownerId: userId } : {},
    );

    const files = [];
    for (const fileData of filesData)
      files.push(await this.prepareFindResponse(fileData));

    return castToEntity(
      {
        ...(await this.filesService.calculatePaginationInformation(
          page * limit,
          limit,
          files.length,
          userId,
        )),
        files,
      },
      ListFileResponse,
    );
  }

  /**
   * Adds link to original file to FindFileResponse to generate url.
   */
  async prepareFindResponse(
    promise: Promise<FileModel> | FileModel,
  ): Promise<FindFileResponse> {
    const file = await promise;
    const entity = await castToEntity(file, FindFileResponse);

    entity.url = file;

    return entity;
  }
}
