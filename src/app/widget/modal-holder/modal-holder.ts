import { Component, Input, OnDestroy } from '@angular/core';
import { ModalService } from '../../service/modal/modal';

@Component({
  selector: 'modal-holder',
  imports: [],
  templateUrl: './modal-holder.html',
  styleUrl: './modal-holder.css'
})
export class ModalHolder implements OnDestroy {
  @Input({ required: true }) modalId!: string

  constructor(readonly modalService: ModalService) { }

  ngOnDestroy() {
    this.modalService.close()
  }
}
