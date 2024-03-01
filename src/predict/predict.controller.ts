import { Controller, Post, Get,Body } from '@nestjs/common';
import { PredictService } from './predict.service';
import { predictDto } from './dto';

@Controller('predictions')
export class PredictController {
    constructor(private predictService:PredictService ){}

    @Post('predict')
    async predict( @Body() body:predictDto): Promise<string> {
        return  this.predictService.predict(body) ;
    }

    @Get('all')
    getPredictions() :string {
        return "all";
    }
}
