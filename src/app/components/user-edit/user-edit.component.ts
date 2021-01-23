import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';

export const MODE_CREATE = 'create';
export const MODE_UPDATE = 'update';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit, OnDestroy {

  userForm!: FormGroup;
  mode = MODE_CREATE;
  dataSubscription!: Subscription;
  user?: User;

  constructor(private formBuilder: FormBuilder,
              private  userService: UserService,
              private router: Router,
              private currentRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataSubscription = this.currentRoute.data.subscribe(values => {
      this.mode = values.mode;
    });
    if (this.mode === MODE_UPDATE) {
      const userId = parseFloat(this.currentRoute.snapshot.params.id);
      this.user = this.userService.getUser(userId);
    }
    this.initForm();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  initForm(): void {
    const userHobbiesControls: FormControl[] = [];
    if (this.user?.hobbies) {
      for (const hobby of this.user?.hobbies) {
        const hobbyControl = this.formBuilder.control(hobby, Validators.required);
        userHobbiesControls.push(hobbyControl);
      }
    }
    this.userForm = this.formBuilder.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      drinkPreference: [this.user?.drinkPreference, Validators.required],
      hobbies: this.formBuilder.array(userHobbiesControls)
    });
  }

  onSubmitForm(): void {
    const formValue = this.userForm.value;
    if (this.mode === MODE_CREATE) {
      const newUser = new User(
        0,
        formValue.firstName,
        formValue.lastName,
        formValue.email,
        formValue.drinkPreference,
        formValue.hobbies ? formValue.hobbies : []
      );
      this.userService.addUser(newUser);
    } else if (this.mode === MODE_UPDATE) {
      const userId = this.user?.id ? this.user.id : 0;
      const editedUser = new User(
        userId,
        formValue.firstName,
        formValue.lastName,
        formValue.email,
        formValue.drinkPreference,
        formValue.hobbies ? formValue.hobbies : []
      );
      this.userService.updateUser(editedUser);
    } else {
      console.error('Invalid mode used : ' + this.mode);
    }
    this.router.navigate(['/users']);
  }

  getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby(): void {
    const newHobbyControl = this.formBuilder.control('', Validators.required);
    this.getHobbies().push(newHobbyControl);
  }

  onRemoveHobby(index: number): void {
    this.getHobbies().removeAt(index);
  }
}
