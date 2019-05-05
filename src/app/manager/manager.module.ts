import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReceiptManagementComponent } from './receipt-management/receipt-management.component';

@NgModule({
  declarations: [ManagerHomeComponent, ManagerComponent, UserManagementComponent, ReceiptManagementComponent],
  imports: [CommonModule, ManagerRoutingModule, MaterialModule]
})
export class ManagerModule {}
