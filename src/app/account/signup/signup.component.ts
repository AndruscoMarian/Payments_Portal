import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'signup-component',
    templateUrl: './signup.component.html',
    styleUrls:['./signup.component.css']
})

export class SignupComponent implements OnInit{

    signupForm!: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            first_name: [
                {value: "", disabled:false},
                [Validators.required, Validators.minLength(3)]
              ],
            last_name: [
                '', 
                [Validators.required, Validators.minLength(3)]
              ],
            email: [
                '', 
                [Validators.required, Validators.email]
              ],
            role: [
                '', 
                [Validators.required, Validators.maxLength(25)]
              ],
            passwordGroup: this.fb.group({
                password: [
                  '', 
                  [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
                ],
                confirm_password: [
                  '', 
                  [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
                ],
              }),
        })
    }

    save():void {
        console.log(this.signupForm.value)
    }

}