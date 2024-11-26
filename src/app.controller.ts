import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Travel } from './travel';
import { CreateTravelDto } from './create-travel.dto';
import { UpdateTravelDto } from './update-travel.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  travels: Travel[] = []
  nextID=0;

  @Get('travels')
  travelsList(){
    return this.travels;
  }

  @Get('travels/:travelid')
  searchTravelWithID(@Param('travelid') id: string){
    const idNumber = parseInt(id);
    const travel = this.travels.find(travel => travel.id == idNumber);
    if (!travel){
      throw new NotFoundException("Nincs ilyen ID-val rendelkező utazás!")
    }
    return travel;
  }
  
  @Post('NewTravel')
  newTravel(@Body() newTravelDetails : CreateTravelDto){
    const newTravel: Travel = {
      ...newTravelDetails,
      id: this.nextID,
      discount : 0
    }
    this.nextID++;
    this.travels.push(newTravel);
    return newTravel;
  }
  
  @Patch('travels/:id')
  UpdateTravel(@Param('id') id: string, @Body() travelDetails: UpdateTravelDto){
    const idNumber = parseInt(id);
    const defaultTravelID = this.travels.findIndex(travel => travel.id == idNumber);
    if (defaultTravelID == -1) {
      throw new NotFoundException("Nincs ilyen ID-val rendelkező utazás!")
    }

    const defaultTravel = this.travels[defaultTravelID]

    const newTravel: Travel = {
      ...defaultTravel,
      ...travelDetails,
    };
    this.travels[defaultTravelID] = newTravel;
    return newTravel;
  }

  @Delete('travels/:travelid')
  deleteTravel(@Param('travelid') id: string){
    const idNumber = parseInt(id);
    const idx = this.travels.findIndex(travel => travel.id == idNumber);
    if (idx == -1){
      throw new NotFoundException("Nincs ilyen ID-val rendelkező utazás!")
    }
    this.travels.splice(idx,1);
  }


}
