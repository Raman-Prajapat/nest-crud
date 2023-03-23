import { Module } from '@nestjs/common';
import { OuterController } from './outer.controller';
import { OuterService } from './outer.service';

@Module({
  controllers: [OuterController],
  providers: [OuterService],
})
export class OuterModule {}
