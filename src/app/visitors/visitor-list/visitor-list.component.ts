import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.scss'],
})
export class VisitorListComponent implements OnInit {
  /** variables */
  pasien: any = [];
  loading: boolean = true;

  constructor(private router: Router, private db: AngularFirestore) {}

  ngOnInit(): void {
    this.getAllPasien();
  }

  getAllPasien() {
    this.db
      .collection('pasien')
      .valueChanges()
      .subscribe((result) => {
        this.pasien = [];
        result.map((res: any) => {
          const userid = res.id.toString();
          this.pasien.push({
            uid: res.id,
            id: userid.substr(userid.length - 5),
            nama: res.nama,
            birthdate: moment(res.birthdate, 'DD-MM-YYYY').format(
              'D MMMM YYYY'
            ),
            phone: res.phone,
            gender: res.gender === 'male' ? 'Laki-Laki' : 'Perempuan',
            alamat: res.alamat,
            ktp: res.ktp,
            email: res.email,
          });
        });
        this.loading = false;
        // console.log(this.pasien);
      });
  }

  editPage(id) {
    this.router.navigate([`/visitor/edit/${id}`]);
  }

  backToHome() {
    this.router.navigate([`/`]);
  }

  async deleteAction(id) {
    Swal.fire({
      icon: 'warning',
      title: 'Anda Yakin?',
      text: 'Apa anda yakin ingin menghapus data ini?',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus Sajalah!',
      cancelButtonText: 'Eh, Ga Jadi Deh!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        const deleteRef = this.db.collection('pasien');
        deleteRef
          .doc(id.toString())
          .delete()
          .then(() => {
            Swal.fire({
              icon: 'success',
              text: 'Data pasien telah terhapus!',
              showConfirmButton: false,
            });
            setTimeout(() => {
              Swal.close();
            }, 3000);
          });
      }
    });
  }
}
