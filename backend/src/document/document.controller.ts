// import { Controller } from '@nestjs/common';

// @Controller('document')
// export class DocumentController {}

// src/document/document.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import { DocumentData } from './document.service';


@ApiTags('documents')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a document for data extraction' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Document file to be uploaded', type: FileUploadDto })
  @ApiResponse({ status: 201, description: 'Document uploaded and processed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid file format.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File): Promise<Partial<DocumentData>> {
    return this.documentService.processDocument(file);
  }
}

