import { Controller, Post, Get,Body, UseGuards, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PredictService } from './predict.service';
import { predictDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('predictions')
export class PredictController {
    constructor(private predictService:PredictService ){}

    // @UseGuards(JwtAuthGuard)
    @Post('predict')
    @UseInterceptors(FileInterceptor('image'))
    async predict(@UploadedFile() image: Express.Multer.File, @Body() body:predictDto, @Res() res: Response): Promise<any> {
        const patientData= await this.predictService.predict(body,image)
        const doc=patientData["_doc"];
        return res.status(HttpStatus.OK).json({status:"OK","patient_result":{
            "id":patientData._id,
            "patient_name": `${doc.firstName} ${doc.lastName}`,
            "npeumonia_type": doc.label==1?"bacterienne":doc.label==2?"viral":"",
            "patient_affected": doc.label==0?false:true,
        }}) ;
    }

    @Get('all')
    getPredictions() :string {
        return "all";
    }
}
