import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';

@Module({
    providers: [HistoryService],
    imports: [],
    exports: [HistoryService],
})
export class HistoryModule {}
