/**
 * Created by praba on 2/20/2016.
 */
Polymer({
  is: "viewtype-card",
  ready:function() {
    this.read=false;
    //this.Label="Create";
    // if (sessionStorage.getItem("loggedrole") == "Security guard"||localStorage.getItem("curr_sess_wardflag")=="2") {
    //   this.$.create.style.visibility = 'visible';
    //   this.$.edit.style.visibility='hidden';
    // }
    // else if(sessionStorage.getItem("curr_sess_roleflag")=="6"){
    //   this.$.create.style.visibility = 'visible';
    //   this.$.edit.style.visibility='hidden';
    // }
    // else {
      this.$.create.style.visibility = 'visible';
      this.$.edit.style.visibility='hidden';
    // }
  },
  FnViewlist:function(){
    this.$.create.style.visibility = 'visible';
    this.$.edit.style.visibility = 'hidden';
  },
  create:function(){

      window.location.href="indexhome.html";
    
  },
  edit:function(){
    //alert(localStorage.getItem("curr_sess_wardflag"));
    // if(localStorage.getItem("curr_sess_wardflag")=="") {
    // document.querySelector('additem-card').FnEnableFields();
    // this.$.edit.style.visibility = 'hidden';
    // }
    // if(localStorage.getItem("curr_sess_wardflag")=="4") {
      localStorage.setItem("curr_sess_addsuppliereditflag","1");
      document.querySelector('addsupplier-card').FnEnableFields();

      this.$.edit.style.visibility = 'hidden';
    // }
    //  if(localStorage.getItem("curr_sess_wardflag")=="6") {
    //   localStorage.setItem("curr_sess_addcustomereditflag","1");
    //   document.querySelector('addcustomer-card').FnEnableFields();
    //   this.$.edit.style.visibility = 'hidden';
    // }
    //    if(localStorage.getItem("curr_sess_wardflag")=="11") {
    //   localStorage.setItem("curr_sess_addusereditflag","1");
    //   document.querySelector('user-info-card').FnEnableFields();
    //   this.$.edit.style.visibility = 'hidden';
    // }
  },
  FnEnableEdit:function(flag){
    if(flag==true) {
      this.$.edit.style.visibility = 'visible';
    }
    else
    this.$.edit.style.visibility = 'hidden';
    //this.Label="Edit";
  },
  FnHideBtns:function(){
    this.$.create.style.visibility = 'hidden';
    this.$.edit.style.visibility = 'hidden';
  }
});
