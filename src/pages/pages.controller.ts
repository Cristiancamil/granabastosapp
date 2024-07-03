import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { error } from 'console';
import { fileFilter, renameImage } from './helpers/images.helper';

@Controller('pages')
export class PagesController {
  
  constructor(private readonly pagesService: PagesService) {}

  // Cargar archivos de excel
  @Post('upload-excel')
  @UseInterceptors(
    FileInterceptor(
      'file', 
      {
        storage: diskStorage(
          {
            destination: './uploads/excel',
            filename: function(req, file, cb){
              cb(null, file.originalname)
            }
          }
        )
      }
    )
  )
  uploadExcel(@UploadedFile() file : Express.Multer.File) {
    
    if (!file) {
        throw new BadRequestException('File is not uploaded');
    }

    const filePath = path.resolve('./uploads/excel', file.filename);
    
    try {
        const data = this.pagesService.readExcelFile(filePath);
        return data;
    } catch (error) {        
        throw new BadRequestException('Error reading Excel file ' + error.message);
    }
  }

    // Cargar archivos de excel
    @Get('list-excel')
    listExcel(@UploadedFile() file : Express.Multer.File) {
      
      if (!file) {
          throw new BadRequestException('File is not uploaded');
      }
  
      const filePath = path.resolve('./uploads/excel', file.filename);
      
      try {
          const data = this.pagesService.readExcelFile(filePath);
          return data;
      } catch (error) {        
          throw new BadRequestException('Error reading Excel file ' + error.message);
      }
    }

  // Cargar imágenes
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
            destination: './img',
            filename: renameImage
          }),
          fileFilter: fileFilter
  }))
  uploadImg(@UploadedFile() file : Express.Multer.File) {
    try {
        const data = "Holaaaaaaaaaaaaaaaaaaaaaaaa"
        return data;
    } catch (error) {        
        throw new BadRequestException('Error reading Excel file ' + error.message);
    }
  }
}
