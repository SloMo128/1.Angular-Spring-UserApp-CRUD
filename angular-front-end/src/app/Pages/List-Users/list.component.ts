import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../Service/user.service';
import { Users } from '../../Model/user.model';
import { FeedBack } from '../../Model/feedback';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListUsersComponent implements OnInit {

  users: Users[] = []
  feedback = new FeedBack("", "");
  isLoading: boolean = false;

  constructor(
    private userService: UserApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.users = [];
    this.userService.getUsers().subscribe({
      next: (data: Users[]) => {
        if (data.length !== 0) {
          this.users = data;
        };
        this.isLoading = true;
      },
      error: (err: any) => {
        this.isLoading = false;
        console.log(err);
        this.feedback = {
          feedbackType: err.feedbackType,
          feedbackmsg: err.feedbackmsg,
        };
        console.log(JSON.stringify(this.feedback));
        throw new Error();
      },
      complete: () => {
        this.isLoading = true;
        this.feedback = { feedbackType: 'success', feedbackmsg: 'loaded' };
      },
    });
  }

  deleteUser(id: string, index) {
    if (window.confirm("Are you sure you want to delete this product?")) {
        this.userService.deleteUser(id).subscribe({
            next: (data) => {
                this.users.splice(index, 1);
            },
            error: (err: any) => {
                this.isLoading = false;
                console.log(err);
                this.feedback = {
                    feedbackType: err.feedbackType,
                    feedbackmsg: err.feedbackmsg,
                };
                throw new Error();
            }
        });
    }
}

  saveDataAndNavigate(id: string) {
    localStorage.setItem('userId', id);
    this.router.navigate(['/editUser/']);
  }
}
