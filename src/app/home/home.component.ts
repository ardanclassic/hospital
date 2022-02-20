import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /** variables */
  date: string = '';
  time: string = '';
  dataAntrian: any = [];
  totalAntrian: number;
  antrianDisabled: boolean = true;

  constructor(private router: Router, private db: AngularFirestore) {}

  // https://www.bezkoder.com/angular-10-firestore-crud-angularfire/

  ngOnInit() {
    this.date = moment().format('D MMMM YYYY');
    this.time = moment().format('HH:mm A');
    this.getAll();
  }

  createAntrian() {
    const pasienRef = this.db.collection('antrian');
    const pasien = {
      id: `${new Date().valueOf()}#A-${this.totalAntrian + 1}`,
      antrian: `A-${this.totalAntrian + 1}`,
      date: this.date,
      time: this.time,
    };
    pasienRef.doc(`${pasien.id}`).set({ ...pasien });
  }

  getAll() {
    this.db
      .collection('antrian')
      .valueChanges()
      .subscribe((result) => {
        // console.log('result: ', result);
        if (result.length > 0) {
          this.dataAntrian = result;
          this.totalAntrian = result.length;
        } else {
          this.dataAntrian = [];
          this.totalAntrian = 0;
        }
        this.antrianDisabled = false;
      });
  }

  dataContent(data) {
    const content = `<div class="popup-antrian">
      <div class="head">RS SLS</div>
      <div class="divider"></div>
      <div class="content">
        <div class="info">
          <p>Nomor Antrian Anda:</p>
          <h1>${data.antrian}</h1>
          <p>Mohon Menunggu</p>
        </div>
        <div class="barcode">
          <img src="../../assets/img/barcode.png" alt="barcode" />
        </div>
        <div class="date">
          <p>${data.date}</p>
          <p>${data.time}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="footer">
        <p>Budayakan antri untuk kenyamanan bersama.</p>
        <p>Terima kasih atas kunjungan anda!</p>
      </div>
    </div>`;

    return content;
  }

  showQueue() {
    if (!this.antrianDisabled) {
      const data = {
        antrian: `A-${this.totalAntrian + 1}`,
        date: this.date,
        time: this.time,
      };
      Swal.fire({
        icon: 'success',
        html: this.dataContent(data),
        showConfirmButton: false,
      });
      this.createAntrian();
    }
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }

  resetAntrian() {
    this.antrianDisabled = true;
    const deleteRef = this.db.collection('antrian');
    this.dataAntrian.forEach((el) => {
      deleteRef.doc(el.id).delete();
    });
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        text: 'Berhasil reset data antrian',
        showConfirmButton: false,
      });
      this.getAll();
    }, 1000);
  }
}
