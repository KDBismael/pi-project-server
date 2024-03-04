import { Controller, Post, Get,Body, UseGuards } from '@nestjs/common';
import { PredictService } from './predict.service';
import { predictDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('predictions')
export class PredictController {
    constructor(private predictService:PredictService ){}

    @UseGuards(JwtAuthGuard)
    @Post('predict')
    async predict( @Body() body:predictDto): Promise<string> {
        return  this.predictService.predict(body) ;
    }

    @Get('all')
    getPredictions() :string {
        return "all";
    }
}
