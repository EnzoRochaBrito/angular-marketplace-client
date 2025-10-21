import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  show    = signal<boolean>(false)
  modalId = signal<string>('')

  toggle(id: string) {
    this.show.update(b => !b)
    this.modalId.set(id)
  }

  close() {
    this.show.set(false)
    this.modalId.set('')
  }
}
