import JSZip from "jszip"
import { NextResponse } from "next/server"
import sharp, { FormatEnum } from "sharp"
import { TransformationOptions } from "@/types";

export const config = {
    api: {
        bodyParser: false
    }
}

enum FileType {
    PNG = 'png',
    JPEG = 'jpeg',
    AVIF = 'avif',
    WEBP = 'webp'
}

async function convertToZIP (files: Array<{ name: string, buffer: Buffer }>) {
    const zip = new JSZip();
    files.forEach(({ name, buffer }) => {
      zip.file(name, buffer);
    });
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return zipBuffer;
}

export async function POST(request: Request) {
    try{
    const formData = await request.formData()
    const files: File[] = formData.getAll('images') as File[]
    const format: FileType = formData.get('format') as FileType
    const transformations: TransformationOptions = JSON.parse(formData.get('transformations') as string)

    if(!files || !files.length) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const convertedFiles = await Promise.all(
        files.filter(file => file instanceof File).map(async (file) => {
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            let formatedFile = await sharp(fileBuffer)
                .toFormat(format as keyof FormatEnum)

            if(transformations) {
                formatedFile = await formatedFile.resize({
                  width: transformations.width,
                  height: transformations.height
                })
            }

            const convertedBuffer = await formatedFile.toBuffer()

            const name  = file.name.replace(/\.[^/.]+$/, `.${format}`);

            return {
                name,
                buffer: convertedBuffer,
            };
        })
      );

      if (convertedFiles.length > 1) {
        const zipBuffer = await convertToZIP(convertedFiles);
    
        return new NextResponse(zipBuffer, {
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="converted-files.zip"',  
          },
        });
      }

      return new NextResponse(convertedFiles[0].buffer, {
        headers: {
          'Content-Type': `image/${format}`,
          'Content-Disposition': `attachment; filename="converted-file.${format}"`,
        }
      })
  
    } catch (error) {
      console.error('Error al convertir los archivos:', error);
      return NextResponse.json({ error: 'Failed to convert files' }, { status: 500 });
    }
}