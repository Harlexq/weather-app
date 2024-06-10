import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './current/current.component';
import { DailyComponent } from './daily/daily.component';
import { WeeklyComponent } from './weekly/weekly.component';

@NgModule({
  declarations: [CurrentComponent, DailyComponent, WeeklyComponent],
  imports: [CommonModule],
  exports: [CurrentComponent, DailyComponent, WeeklyComponent],
})
export class TabsModule {}
