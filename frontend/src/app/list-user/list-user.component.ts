import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
// import {$} from 'jquery';


declare var $: any;


function _window(): any {
  // return the global native browser window object
  return window;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};

  deleteId: any;
  disableId: any;
  imgUrl: any = 'http://localhost:1801/images/';

  constructor(
    public zone: NgZone,
    private router: Router,
    private userservice: UserService,
    private Toastr: ToastrService) { }

  ngOnInit() {
    // this.main();
    _window().my = _window().my || {};
    _window().my.notimgmt = _window().my.notimgmt || {};
    _window().my.notimgmt.editUser = this.editUser.bind(this);
    _window().my.notimgmt.deleteUser = this.deleteUser.bind(this);
    _window().my.notimgmt.disableUser = this.disableUser.bind(this);

    if (typeof (_window().isScriptLoadednotimgmt) === 'undefined') {
      _window().isScriptLoadednotimgmt = false;
    }
  }

  ngAfterViewInit() {
    const that = this;

// tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('#m_modal_6').hide();
      $(document).on('click', '.close', function (e) {
        $('#m_modal_6').hide();
      });
      $(document).on('click', '.btn-secondary', function (e) {
        $('#m_modal_6').hide();
      });
      $(document).on('click', '.btn-primary', function (e) {
        $('#m_modal_6').hide();
      });
      $('#m_modal_5').hide();
      $(document).on('click', '.close', function (e) {
        $('#m_modal_5').hide();
      });
      $(document).on('click', '.btn-secondary', function (e) {
        $('#m_modal_5').hide();
      });
      $(document).on('click', '.btn-primary', function (e) {
        $('#m_modal_5').hide();
      });

      $('#usertable').DataTable({
        serverSide: true,
        ajax: {
          'url': 'http://localhost:1801/api/user/allUser',
          'type': 'POST',
          'beforeSend': function (request) {
            // console.log('jhfhdgfh');
            const localdata = localStorage.getItem('token');
            request.setRequestHeader('Authorization', localdata);
          },
          'dataFilter': function (data) {
            // console.log('llllllllllllllllllllllllllll');
            console.log('Data', data);
            var json = $.parseJSON(data);
            console.log('Data1', data);
            if (json['status'] === 200) {

              json.recordsTotal = json.data.totalDocs;
              json.recordsFiltered = json.data.totalDocs;
              json.data = json.data.docs;
            }

            return JSON.stringify(json);
          }
        },
        columns: [
          {
            title: 'FirstName',
            data: 'firstname'
          },
          {
            title: 'LastName',
            data: 'lastname'
          },
          {
            title: 'E-Mail',
            data: 'username'
          }
        ],
        columnDefs: [
          {
            targets: 3,
            title: 'Image',
            orderable: !1,
            render: function (a, e, t, n) {
              return '<img style="height : 30px ; width :40px;" src="' + that.imgUrl + t.image + '">';
            }
          },
          {
            targets: 4,
            title: 'Actions',
            orderable: !1,
            render: function (a, e, t, n) {
              var id = (t._id);
              return '\n<button class="btn btn-danger" data-id="' + id + '" data-toggle="modal" data-target="#m_modal_6" title="Delete" onclick="window.my.notimgmt.deleteUser(this)">Delete</button><button data-id="' + id + '" class="btn btn-primary" onclick="window.my.notimgmt.editUser(this)" style="margin-left: 20px;">Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-warning" data-id="' + id + '" data-toggle="modal"  data-target="#m_modal_5" title="Disable" onclick="window.my.notimgmt.disableUser(this)">Disable</button>'
            }
          }
        ],
        lengthMenu: [5, 10, 15, 20]
      });

    });


  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  deleteUser(e) {
    $('#m_modal_6').show();
    this.deleteId = $(e).data('id');
  }

  deleteSure() {

    this.userservice.deleteUser(this.deleteId).subscribe((data) => {

      if (data['status'] === 200) {
        this.Toastr.success('Record Deleted SuccessFully');
        this.deleteId = '';

        let table: any = $('#usertable');
        var auditorTable = table.DataTable();
        auditorTable.ajax.reload();

      } else {
        this.Toastr.error(data['message']);
      }
    });
  }

  editUser(e) {
    $(e).data('id');
    localStorage.removeItem('Editid');
    localStorage.setItem('Editid', $(e).data('id').toString());
    this.zone.run(() => { this.router.navigate(['user-edit']); });
    // this.router.navigate(['edit-user']);
  }

  disableUser(e) {
    $('#m_modal_5').show();
    this.disableId = $(e).data('id');
    console.log('ddddd', this.disableId);
  }

  disableSure() {
    this.userservice.disableUser(this.disableId).subscribe((data) => {

      if (data['status'] === 200) {
        this.Toastr.success('User Disable SuccessFully');
        this.disableId = '';

        let table: any = $('#usertable');
        var auditorTable = table.DataTable();
        auditorTable.ajax.reload();

      } else if (data['status'] === 200 && data['disable'] === true) {
        this.Toastr.error('User already Disable');
      } else {
        this.Toastr.error(data['message']);
      }
    });
  }

}
