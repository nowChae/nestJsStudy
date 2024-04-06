import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards') // localhost:3000/boards
export class BoardsController {
    constructor(private boardService : BoardsService){}
     
    @Get('/') // localhost:3000/boards/ <-- 
    getAllBoard() :Board[]{ // 모든 게시글을 가져옴
        return this.boardService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto 
    ):Board{
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id : string):Board{
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id : string): void{
        this.boardService.deleteBoard(id); 
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id : string,
        @Body('status', BoardStatusValidationPipe) status : BoardStatus 
    ):Board{ 
        return this.boardService.updateBoardStatus(id, status); 
    }
}