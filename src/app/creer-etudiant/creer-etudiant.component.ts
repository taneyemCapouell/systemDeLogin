import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-etudiant',
  templateUrl: './creer-etudiant.component.html',
  styleUrls: ['./creer-etudiant.component.css']
})
export class CreerEtudiantComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  address: string = "";
  phone = "";
  currentid = "";
  constructor(private http: HttpClient,private router: Router) {
    this.getAllStudent();
  }
  ngOnInit(): void {
  }
  getAllStudent() {
    this.http.get("http://localhost:3000/users")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
      });
  }

  register() {
    // this.isLogin = false;
    // alert("hi");
    let bodyData = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "address": this.address,
      "phone": this.phone,
    };
    this.http.post("http://localhost:3000/users", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("User Registered Successfully");
      this.getAllStudent();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }


  setUpdate(data: any) {
    this.firstName = data.firstName,
      this.lastName = data.lastName,
      this.email = data.email,
      this.address = data.address,
      this.phone = data.phone,
      this.currentid = data.id;

  }

  UpdateRecords() {
    let bodyData =
    {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "address": this.address,
      "phone": this.phone
    };

    this.http.put("http://localhost:3000/users" + "/" + this.currentid, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("User  Updated");
      this.getAllStudent();
    });
  }

  save() {
    if (this.currentid == '') {
      this.register();
    }
    else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:3000/users" + "/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("User Deleted");
      this.getAllStudent();
    });
  }
}
