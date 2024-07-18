import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserApiService } from 'src/app/Service/user.service';
import { Users } from 'src/app/Model/user.model';
import { FeedBack } from 'src/app/Model/feedback';

@Component({
    templateUrl: './add.user.component.html',
})

export class AddUserComponent implements OnInit {

    feedback = new FeedBack("", "");
    addForm: FormGroup;
    isLoading: boolean = true;


    constructor(
        private usersService: UserApiService,
        private fb: FormBuilder,
        private actRoute: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {

        localStorage.removeItem('userId');

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        this.addForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),
            Validators.pattern("^[a-zA-Z]+$")]],
            email: ['', [Validators.required, Validators.email]]

        });
    }

    onSubmit() {
        if (window.confirm("Are you sure you want to create this new user?")) {
            this.usersService.addUser(this.addForm.value).subscribe({
                next: (data) => {
                    this.feedback = { feedbackType: 'success', feedbackmsg: 'Person created successfully' };
                    setTimeout(() => this.router.navigate(['/list']), 4000); // Navigate to the list or some other view
                },
                error: (err: any) => {
                    console.log(err);
                    this.isLoading = false;
                    this.feedback = {
                        feedbackType: err.feedbackType,
                        feedbackmsg: err.feedbackmsg,
                    };
                    throw new Error();
                },
                complete: () => {
                    this.isLoading = true;
                },
            });
        } else { }
    }

    get name() {
        return this.addForm.get('name');
    }

    get email() {
        return this.addForm.get('email');
    }
}
