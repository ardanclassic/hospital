import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'edit-visitor',
  templateUrl: './edit-visitor.component.html',
  styleUrls: ['./edit-visitor.component.scss'],
})
export class EditVisitorComponent implements OnInit {
  formField: FormGroup;
  submitted = false;
  userID: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get f() {
    return this.formField.controls;
  }

  ngOnInit(): void {
    this.userID = this.activatedRoute.snapshot.url[2].path;
    this.formInit();
    this.getPasienDetail();
  }

  formInit() {
    this.formField = this.formBuilder.group({
      nama: [''],
      ktp: [''],
      alamat: [''],
      nationality: ['wni'],
      gender: [''],
      birthdate: [''],
      phone: [''],
      email: [''],
    });
  }

  /** prevent user for typing input other than number */
  onlyNumber(e) {
    if (e.keyCode < 48 || e.keyCode > 57) return false;
  }

  getPasienDetail() {
    const pasienRef = this.db.collection('pasien').doc(this.userID);
    pasienRef.get().subscribe((res) => {
      const user: any = res.data();
      const datepattern = /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/i;
      this.formField = this.formBuilder.group({
        nama: [user.nama, [Validators.required, Validators.maxLength(100)]],
        ktp: [user.ktp, [Validators.required, Validators.maxLength(50)]],
        alamat: [user.alamat, [Validators.required]],
        nationality: ['wni', [Validators.required]],
        gender: [user.gender, [Validators.required]],
        birthdate: [
          user.birthdate,
          [Validators.required, Validators.pattern(datepattern)],
        ],
        phone: [user.phone, [Validators.required, Validators.maxLength(30)]],
        email: [user.email, [Validators.required, Validators.email]],
      });
    });
  }

  editPatient(data) {
    this.submitted = true;
    if (this.formField.invalid) {
      console.log('invalid form data');
      return;
    } else {
      const uid = this.userID;
      const finalData = {
        id: parseInt(uid),
        ...data,
      };
      // console.log(finalData);

      /** create data to firebase */
      const pasienRef = this.db.collection('pasien');
      pasienRef
        .doc(uid.toString())
        .set(finalData)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Sukses',
            text: 'Berhasil edit data pasien!',
            showConfirmButton: false,
          });
          this.submitted = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  back() {
    this.router.navigate(['/visitor/list']);
  }
}
