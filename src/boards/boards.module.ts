import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    TypeOrmExModule.forCustomRepository([BoardRepository])
    , AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
