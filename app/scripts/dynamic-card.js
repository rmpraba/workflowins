/**
 * Created by praba on 2/11/2016.
 */

/*JS file for dynamic menu card of securities inward slip page*/
Polymer({is:"dynamic-card",
  ready:function(){
    
        this.url="../../config/suppliermenu.json";
  
  },
  /*which receives the menu response of security menu json file,bind it to the dynamic card*/
  menureadResponse:function(e){
    //Receiving response and Binding menu labels
    this.menus=e.detail.response;
   }

});
