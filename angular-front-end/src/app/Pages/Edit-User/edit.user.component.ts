import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserApiService } from 'src/app/Service/user.service';
import { Users } from 'src/app/Model/user.model';
import { FeedBack } from 'src/app/Model/feedback';

@Component({
    templateUrl: './edit.user.component.html',
})

export class EditUserComponent implements OnInit {

    editForm: FormGroup;
    users: Users[] = []
    feedback = new FeedBack("", "");
    data: string;
    isLoading: boolean = true;

    constructor(
        private usersService: UserApiService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        this.data = localStorage.getItem('userId');
        if (!this.data) {
            alert("Something wrong!");
            this.router.navigate(['']);
            return;
        }

        this.editForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),
            Validators.pattern("^[a-zA-Z]+$")]],
            email: ['', [Validators.required, Validators.email]]

        });

        this.loadForm(this.data);
    }

    loadForm(id: string) {
        this.usersService.getEditUsers(id).subscribe({
            next: (data: Users) => {
              console.log(data);
                this.editForm.setValue({
                    name: data.name,
                    email: data.email
                })  
                // this.localStorageService.setItem('employees', this.editForm.value);
            },
            error: (err: any) => {
                console.log(err);
                this.isLoading = false;
                this.feedback = {
                    feedbackType: err.feedbackType,
                    feedbackmsg: err.feedbackmsg,
                };
              },
              complete: () => {},
        })
    }

    onSubmit() {
        this.usersService.updateUser(this.data , this.editForm.value).subscribe({
          next: (data) => {
            this.feedback = { feedbackType: 'success', feedbackmsg: 'Person updated successfully!' };
            setTimeout(() => this.router.navigate(['/list']), 4000);
    
            localStorage.removeItem('userId');
          },
          error: (err: any) => {
            console.log(err);
            this.isLoading = false;
            this.feedback = {
                feedbackType: err.feedbackType,
                feedbackmsg: err.feedbackmsg,
            };
          },
          complete: () => {
          },
        });
      }

    get name() {
        return this.editForm.get('name');
    }

    get email() {
        return this.editForm.get('email');
    }
}
