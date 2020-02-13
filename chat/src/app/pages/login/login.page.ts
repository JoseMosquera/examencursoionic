import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private charService: ChatService,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['Jose', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
    })
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.charService.setName(this.loginForm.value)
      this.router.navigateByUrl('/chat')
    } else {

    }
  }
}
