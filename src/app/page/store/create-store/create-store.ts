import { Component } from '@angular/core';
import { StandartPage } from '../../../template/standart-page/standart-page';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInput } from '../../../widget/custom-input/custom-input';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../service/store/store';
import { CreateStoreDto } from '../../../utils/types/store.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-store',
  imports: [StandartPage, ReactiveFormsModule, CustomInput, CommonModule],
  templateUrl: './create-store.html',
  styleUrl: './create-store.css'
})
export class CreateStorePage {

  constructor(private storeService: StoreService, private router: Router) { }

  createStoreFormErr = {
    nameErr: {
      required: 'Nome é obrigatório',
      minlength: 'Mínimo de 4 caractéres'
    }
  }

  createStoreForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(4)])
  })

  createStore() {
    const createStoreDto: CreateStoreDto = {
      name: this.createStoreForm.controls.name.value!
    }

    const createStoreSubscription = this.storeService.createStore(createStoreDto).subscribe({
      next: (v) => {
        if (!v.body) return;
        const { storeId } = v.body
        this.router.navigate(['/store', storeId])
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        createStoreSubscription.unsubscribe()
      }
    })
  }
}
