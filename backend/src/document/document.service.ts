// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class DocumentService {}

// src/document/document.service.ts
import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { encrypt } from '../utils/encryption.util';



export interface DocumentData {
  name: string;
  documentNumber: string;
  dateOfBirth: string;
  // issueDate: Date;
  
  expiryDate: string;
  nationality:string;
}

@Injectable()
export class DocumentService {

  // constructor(private prisma: PrismaService) {}


  async processDocument(file: Express.Multer.File) {
    const extractedText = await Tesseract.recognize(file.buffer, 'eng');
    // console.log("extracted data words",extractedText.data.words);
    const data = this.parseExtractedData(extractedText.data.text);
    // this.saveDocument(data)
    // return this.validateData(data);
    return data;
  }

  private parseExtractedData(text: string) {
    // Use Partial to allow properties to be added gradually
  const data: Partial<DocumentData> = {};
    // Simple parsing logic (this should be improved based on the specific document format)
    const lines = text.split('\n');
    lines.forEach((line) => {
      if (line.includes('Name:')) {
        data.name = line.split('Name:')[1]?.trim();
      } else if (line.includes('Document Number:')) {
        data.documentNumber = line.split('Document Number:')[1]?.trim();
      } else if (line.includes('Date of Birth:')) {
        data.dateOfBirth = line.split('Date of Birth:')[1]?.trim();
      } else if (line.includes('Expiration Date:')) {
        data.expiryDate = line.split('Expiration Date:')[1]?.trim();
      } else if (line.includes('Nationality:')) {
        data.nationality = line.split('Nationality:')[1]?.trim();
      }
    });
    return data;
  }

  private validateData(data: DocumentData) {
    const requiredFields = ['name', 'documentNumber', 'dateOfBirth', 'expirationDate', 'nationality'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Additional validation rules can be added here
    if (this.isDateExpired(data.expiryDate)) {
      throw new Error('Document has expired.');
    }

    return data; // Return validated data
  }

  private isDateExpired(expirationDate: string) {
    const today = new Date();
    const expiry = new Date(expirationDate);
    return expiry < today; // Check if the document is expired
  }

  private saveDocument(data: Partial<DocumentData>) {
    const encryptedFullName = encrypt(data.name);
    const encryptedDocumentNo = encrypt(data.documentNumber);

    // return this.prisma.document.create({
    //   data: {
    //     name: encryptedFullName,
    //     documentNumber: encryptedDocumentNo,
    //     dateOfBirth: data.dateOfBirth,
    //     nationality: data.nationality,
    //     expiryDate: data.expiryDate,
    //   },
    // });
  }
}

