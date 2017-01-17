/**
 * Created by praba on 2/11/2016.
 */
Polymer({
  is: "app-homepage",
  ready: function() {
    this.userlabel="Signout"; 
    // alert(sessionStorage.getItem("curr_sess_roleflag")+" "+localStorage.getItem("curr_sess_wardflag"));
    this.loggedusername="Hello! "+sessionStorage.getItem("curr_sess_loggeduser");   

    this.$.intentview.style.visibility='hidden';
    this.$.promotebutton.style.visibility='hidden';
    this.$.intentflow.style.visibility='hidden';
    this.$.recheck.style.visibility='hidden';
    this.$.searchmenu.style.visibility='hidden';
    this.$.dynamicbutton.style.visibility='hidden';
    this.$.flowbutton.style.visibility='hidden';
    this.$.supplybutton.style.visibility='hidden';
    this.$.inproductionbutton.style.visibility='hidden';

    this.page="supplier-page";

    }
});
