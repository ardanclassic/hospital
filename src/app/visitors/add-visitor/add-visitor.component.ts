import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'visitor-add',
  styleUrls: ['./add-visitor.component.scss'],
  templateUrl: './add-visitor.component.html',
})
export class AddVisitorComponent implements OnInit {
  formField: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private router: Router
  ) {}

  get f() {
    return this.formField.controls;
  }

  ngOnInit(): void {
    const datepattern =
      /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/i;
    this.formField = this.formBuilder.group({
      nama: ['', [Validators.required, Validators.maxLength(100)]],
      ktp: ['', [Validators.required, Validators.maxLength(50)]],
      alamat: ['', [Validators.required]],
      nationality: ['wni', [Validators.required]],
      gender: ['male', [Validators.required]],
      birthdate: ['', [Validators.required, Validators.pattern(datepattern)]],
      phone: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /** prevent user for typing input other than number */
  onlyNumber(e) {
    if (e.keyCode < 48 || e.keyCode > 57) return false;
  }

  addPatient(data) {
    this.submitted = true;
    if (this.formField.invalid) {
      console.log('invalid form data');
      return;
    } else {
      const uid = new Date().valueOf();
      const finalData = {
        id: uid,
        ...data,
      };
      console.log(finalData);

      /** create data to firebase */
      const pasienRef = this.db.collection('pasien');
      pasienRef
        .doc(uid.toString())
        .set(finalData)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Sukses',
            text: 'Data pasien telah terdaftar!',
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          setTimeout(() => {
            Swal.close();
            this.router.navigate(['/']);
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
