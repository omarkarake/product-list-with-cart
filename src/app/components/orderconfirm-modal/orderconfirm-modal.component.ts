import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-orderconfirm-modal',
  templateUrl: './orderconfirm-modal.component.html',
  styleUrl: './orderconfirm-modal.component.css',
})
export class OrderconfirmModalComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
