import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  url: any;
  submitted: Boolean = false;
  filedata: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private Toastr: ToastrService) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        image: ['', Validators.required],
        username: ['', [Validators.required, Validators.pattern(/^[A-Za-z\d\.\_\-\+]{3,64}\@([A-Za-z\d]+)\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/)]],
        // tslint:disable-next-line: max-line-length
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]]
      });
    }
    get f() { return this.registerForm.controls; }
  
    // tslint:disable-next-line: deprecation
    onSubmit() {
      this.submitted = true;
  
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        return;
      } else {
  
        const fd = new FormData();
        fd.append('firstname', this.registerForm.value.firstname);
        fd.append('lastname', this.registerForm.value.lastname);
        fd.append('username', this.registerForm.value.username);
        fd.append('password', this.registerForm.value.password);
        fd.append('image', this.filedata);
  
        this.userService.insertuser(fd)
          .subscribe((data) => {
            if (data['status'] === 200) {
              this.Toastr.success('Sucess');
              this.router.navigate(['login']);
            } else {
              this.Toastr.error(data['message']);
            }
          });
      }
    }

    onSelectFile(e) {
      console.log(e);
      if (e.target.files[0].name.match(/\.(gif|jpg)$/)) {
        this.filedata = e.target.files[0];
        // tslint:disable-next-line: prefer-const
        let reader = new FileReader();
        reader.readAsDataURL(this.filedata);

        reader.onload = (event) => {
          this.url = reader.result;
        };
      } else {
        this.Toastr.error('Only Image is Allow');
      }
    }

}
