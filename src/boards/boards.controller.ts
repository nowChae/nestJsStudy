import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards') // localhost:3000/boards
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController');
    constructor(private boardService : BoardsService){}
   
    @Get()
    getAllBoard(
        @GetUser() user : User
    ):Promise<Board[]>{
        this.logger.verbose(`user ${user.username}'s all boards`)
        return this.boardService.getAllBoards(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto : CreateBoardDto,
        @GetUser() user : User
    ) : Promise<Board>{
        this.logger.verbose(`User ${user.username} creating a new board.
        payload : ${JSON.stringify(createBoardDto)}`)
        return this.boardService.createBoard(createBoardDto, user);
    }


    @Get('/:id')
    getBoardById(@Param('id') id : number):Promise<Board>{
        return this.boardService.getBoardById(id); 
    }
    
    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id : number,
        @GetUser() user : User
    ): Promise<void> {
        return this.boardService.deleteBoard(id, user);  
    }
    
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id : number,
        @Body('status', BoardStatusValidationPipe) status : BoardStatus 
    ):Promise<Board>{ 
        return this.boardService.updateBoardStatus(id, status); 
    }
}
