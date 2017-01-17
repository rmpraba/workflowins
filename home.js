/**
 * Created by praba on 2/10/2016.
 */

var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var htmlToPdf = require('html-to-pdf');
var fs = require('fs');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Method call to read credential information to establish the database connection
var readcredential = require("./app/scripts/dboperations.js");
readcredential.FnReadCredentials();

var createfile = require("./app/scripts/dboperations.js");
createfile.FnCreateFile(app,express);

//Lodaing static files like elements from app folder
app.use(express.static('app'));

//Receiving get request from index.html to render the home page of the application
app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});

//Receiving post request from login card
app.post('/login-card', urlencodedParser, function (req, res) {
  //Loading JS file to call the login check function
  var logincall = require("./app/scripts/dboperations.js");
  //calling loginchcek function with connection,username and password to validate the user,here defined callback method to get the asynchronous response
  logincall.FnLoginDBCheck("login-card",req.body.username,req.body.password,function(returnval){
    if(returnval!="invalid")
    //Sending positive response(role name) back to the login card if it is valid user
      res.status(200).json({'returnval': returnval});
    else
    //Sending error response
      res.status(200).json({'returnval': "invalid"});
  });
});


//Receiving request to read the logged username
app.post('/usernameread-service', urlencodedParser, function (req, res) {
  console.log(req.query.loggeduserid);
  //Loading JS file to call the login check function
  var usernamereadcall = require("./app/scripts/dboperations.js");
  //calling loginchcek function with connection,username and password to validate the user,here defined callback method to get the asynchronous response
  usernamereadcall.Fnusernameread("usernameread-service",req.query.loggeduserid,function(returnval){
      res.status(200).json(returnval);
  });
});

//Function to update the supplier info req receives from the admin service
app.post("/addsupplier-service",urlencodedParser,function(req,res) {

  response = {
    Supplier_ID: req.query.supplierid,
    Supplier_Name: req.query.suppliername,
    Alias_Name: req.query.aliasname,
    Address1: req.query.address1,
    Address2: req.query.address2,
    Doorno: req.query.doorno,
    Streetno: req.query.streetno,
    Street_Name: req.query.streetname,
    Location: req.query.location,
    City: req.query.city,
    District: req.query.district,
    State: req.query.state,
    Country: req.query.country,
    Pincode: req.query.pincode,
    Phoneno: req.query.phoneno,
    Mobileno: req.query.mobileno,
    Email: req.query.emailid,
    Faxno: req.query.faxno,
    Website: req.query.website,
    Status: 'New'

  };
  var FnAddSuppliercall = require("./app/scripts/dboperations.js");
  FnAddSuppliercall.FnAddSupplier("addsupplier-service", response, function (returnval) {
    res.status(200).json({'returnval': returnval.msg,'id':returnval.id});
  });

});

//Function to add the customer contac info
app.post("/supplieraddcontact-service",urlencodedParser,function(req,res) {
  response = {
    Supplier_ID:req.query.supplierid,
    Designation:req.query.designation,
    Mobile_No:req.query.mobileno,
    Email_ID:req.query.emailid
  };
  var Fnsupplieraddcontactcall = require("./app/scripts/dboperations.js");
  Fnsupplieraddcontactcall.Fnsupplieraddcontact("supplieraddcontact-service",response,function(returnval){
    res.status(200).json({"itemarr":returnval});
  });
});

//Function to add the customer contac info
app.post("/supplierreadcontact-service",urlencodedParser,function(req,res) {
  supplierid = {
    Supplier_ID:req.query.supplierid
  };
  //console.log("In customer read...."+req.query.customerid);
  var Fnsupplierreadcontactcall = require("./app/scripts/dboperations.js");
  Fnsupplierreadcontactcall.Fnsupplierreadcontact("supplierreadcontact-service",supplierid,function(returnval){
    res.status(200).json({"itemarr":returnval});
  });
});

//Function to add the customer contac info
app.post("/suppliertaxadd-service",urlencodedParser,function(req,res) {
  response = {
    Supplier_ID:req.query.supplierid,
    TIN:req.query.tin,
    CST:req.query.cst,
    PAN:req.query.pan,
    TAN:req.query.tan,
    CIN:req.query.cin
  };
  var Fnsuppliertaxaddcall = require("./app/scripts/dboperations.js");
  Fnsuppliertaxaddcall.Fnsuppliertaxadd("suppliertaxadd-service",response,function(returnval){
    res.status(200).json({"returnval":returnval});
  });
});

//Function to add the customer contac info
app.post("/supplierexciseadd-service",urlencodedParser,function(req,res) {
  response = {
    Supplier_ID:req.query.supplierid,
    Reg_No:req.query.regno,
    Ecc_No:req.query.eccno,
    Range:req.query.range,
    Division:req.query.division,
    Commission:req.query.commission,
    Service_Tax:req.query.servicetax
  };
  var Fnsupplierexciseaddcall = require("./app/scripts/dboperations.js");
  Fnsupplierexciseaddcall.Fnsupplierexciseadd("supplierexciseadd-service",response,function(returnval){
    res.status(200).json({"returnval":returnval});
  });
});


//Function to update the supplier info req receives from the admin service
app.post("/addpayment-service",urlencodedParser,function(req,res) {

  response = {
    Supplier_ID:req.query.supplierid,
    Account_Name:req.query.accountname,
    Account_No:req.query.accountno,
    Account_Type:req.query.accounttype,
    Payment_Type:req.query.paymenttype,
    Bank_Name:req.query.bankname,
    Branch:req.query.branch,
    IFSC_Code:req.query.ifsccode,
    MICR_Code:req.query.micrcode,
    Swift_Code:req.query.swiftcode,
    Payment_Term:req.query.paymentterm

  };
  var FnAddPaymentcall = require("./app/scripts/dboperations.js");
  FnAddPaymentcall.FnAddPayment("addpayment-service",response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });
});

//Function to add the customer contac info
app.post("/suppliertaxread-service",urlencodedParser,function(req,res) {
  supplierid = {
    Supplier_ID:req.query.supplierid
  };

  var Fnsuppliertaxreadcall = require("./app/scripts/dboperations.js");
  Fnsuppliertaxreadcall.Fnsuppliertaxread("suppliertaxread-service",supplierid,function(returnval){
    res.status(200).json({"itemarr":returnval});
  });
});

//Function to add the customer contac info
app.post("/supplierexciseread-service",urlencodedParser,function(req,res) {
  supplierid = {
    Supplier_ID:req.query.supplierid
  };
  var Fnsupplierexcisereadcall = require("./app/scripts/dboperations.js");
  Fnsupplierexcisereadcall.Fnsupplierexciseread("supplierexciseread-service",supplierid,function(returnval){
    res.status(200).json({"itemarr":returnval});
  });
});


//Function to update the supplier info req receives from the admin service
app.post("/updatesupplier-service",urlencodedParser,function(req,res) {

  response = {
    Supplier_ID:req.query.supplierid,
    Supplier_Name:req.query.suppliername,
    Alias_Name:req.query.aliasname,
    Address1:req.query.address1,
    Address2:req.query.address2,
    Doorno:req.query.doorno,
    Streetno:req.query.streetno,
    Street_Name:req.query.streetname,
    Location:req.query.location,
    City:req.query.city,
    District:req.query.district,
    State:req.query.state,
    Country:req.query.country,
    Pincode:req.query.pincode,
    Phoneno:req.query.phoneno,
    Mobileno:req.query.mobileno,
    Email:req.query.emailid,
    Faxno:req.query.faxno,
    Website:req.query.website
  };
  //console.log(response);
  var FnUpdateSuppliercall = require("./app/scripts/dboperations.js");
  FnUpdateSuppliercall.FnUpdateSupplier("updateSupplier-service",response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });


});

//Function to update the supplier info req receives from the admin service
app.post("/supplierupdatetax-service",urlencodedParser,function(req,res) {

  response = {
    Supplier_ID:req.query.supplierid,
    TIN:req.query.tin,
    CST:req.query.cst,
    PAN:req.query.pan,
    TAN:req.query.tan,
    CIN:req.query.cin
  };
  //console.log(response);
  var FnSupplierUpdatetaxcall = require("./app/scripts/dboperations.js");
  FnSupplierUpdatetaxcall.FnSupplierUpdatetax("supplierupdatetax-service",response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });

});

//Function to update the supplier info req receives from the admin service
app.post("/supplierupdateexcise-service",urlencodedParser,function(req,res) {
  response = {
    Supplier_ID:req.query.supplierid,
    Reg_No:req.query.regno,
    Ecc_No:req.query.eccno,
    Range:req.query.range,
    Division:req.query.division,
    Commission:req.query.commission,
    Service_Tax:req.query.servicetax
  };
  //console.log(response);
  var FnSupplierUpdateexcisecall = require("./app/scripts/dboperations.js");
  FnSupplierUpdateexcisecall.FnSupplierUpdateexcise("supplierupdateexcise-service",response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });

});

//Function to update the supplier info req receives from the admin service
app.post("/updatepayment-service",urlencodedParser,function(req,res) {
  response = {
    Supplier_ID:req.query.supplierid,
    Account_Name:req.query.accountname,
    Account_No:req.query.accountno,
    Account_Type:req.query.accounttype,
    Payment_Type:req.query.paymenttype,
    Bank_Name:req.query.bankname,
    Branch:req.query.branch,
    IFSC_Code:req.query.ifsccode,
    MICR_Code:req.query.micrcode,
    Swift_Code:req.query.swiftcode,
    Payment_Term:req.query.paymentterm
  };
  //console.log(response);
  //console.log(response);
  var FnUpdatePaymentcall = require("./app/scripts/dboperations.js");
  FnUpdatePaymentcall.FnUpdatePayment("updatepayment-service",response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });

});

//Function to fetch the searched item info using id or name according to the search type
app.post('/readsupplierinfo-service',urlencodedParser, function (req, res) {
  if(req.query.supplierid!="")
  {
    cond={"Supplier_ID":req.query.supplierid}
  }
  if(req.query.suppliername!="")
  {
    cond={"Supplier_Name":req.query.suppliername}
  }
  var items;
  var type;
  var Fnreadsupplierinfocall = require("./app/scripts/dboperations.js");
  Fnreadsupplierinfocall.Fnreadsupplier("readsupplierinfo-service",cond,function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Function to fetch the searched item info using id or name according to the search type
app.post('/readpaymentinfo-service',urlencodedParser, function (req, res) {
  if(req.query.supplierid!="")
  {
    cond={"Supplier_ID":req.query.supplierid}
  }

  var items;
  var type;
  var Fnreadpaymentinfocall = require("./app/scripts/dboperations.js");
  Fnreadpaymentinfocall.Fnreadpayment("readpaymentinfo-service",cond,function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Function to fetch the searched item info using id or name according to the search type
app.post('/readiteminfo-service',urlencodedParser, function (req, res) {
  if(req.query.supplierid!="")
  {
    cond={"Item_Supplier_ID":req.query.supplierid}
  }
  var items;
  var type;
  var Fnreaditeminfocall = require("./app/scripts/dboperations.js");
  Fnreaditeminfocall.Fnreaditeminfo("readiteminfo-service",cond,req.query.supplierid,function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Function for writing item info...req receives from admin service
app.post("/additemsupplier-service",urlencodedParser,function(req,res) {

  response = {
    Item_Supplier_ID:req.query.supplierid,
    Item_ID:req.query.itemid,
    Item_Supplier_price:req.query.price

  };
  //console.log(response);
  var FnAddItemWritecall = require("./app/scripts/dboperations.js");
  FnAddItemWritecall.FnAddItemWriteSupplier("additemsupplier-service",response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });

});

//Function to fetch item type info req receives from admin service
app.post('/additempurchasetype-service',urlencodedParser, function (req, res) {

  var FnAddItemPurchasetypecall = require("./app/scripts/dboperations.js");
  FnAddItemPurchasetypecall.FnAddItemPurchasetype("additempurchasetype-service",function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});
//Function to fetch item type info req receives from admin service
app.post('/additemread-service',urlencodedParser, function (req, res) {

  var FnAddItemReadcall = require("./app/scripts/dboperations.js");
  FnAddItemReadcall.FnAddItemRead("additemread-service",function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});
//Function to fetch item group  info req receives from admin service
app.post('/additemgroupread-service',urlencodedParser, function (req, res) {

  var FnAddItemgroupReadcall = require("./app/scripts/dboperations.js");
  FnAddItemgroupReadcall.FnAddItemgroupRead("additemgroupread-service",function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Function to fetch supplier info req receives from admin service
app.post('/itemsupplierread-service',urlencodedParser, function (req, res) {
  var itemid=req.query.itemid;
  var FnItemsupplierReadcall = require("./app/scripts/dboperations.js");
  FnItemsupplierReadcall.FnItemsupplierRead("itemsupplierread-service",itemid,function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Function to fetch supplier info req receives from admin service
app.post('/containerread-service',urlencodedParser, function (req, res) {

  var FnContainerReadcall = require("./app/scripts/dboperations.js");
  FnContainerReadcall.FnContainerRead("containerread-service",function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Function to fetch supplier info req receives from admin service
app.post('/unitread-service',urlencodedParser, function (req, res) {

  var FnUnitReadcall = require("./app/scripts/dboperations.js");
  FnUnitReadcall.FnUnitRead("unitread-service",function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Function to fetch the searched item info using id or name according to the search type
app.post('/addsearchitem-service',urlencodedParser, function (req, res) {
  if(req.query.itemid!="")
  {
    cond={"Item_ID":req.query.itemid}
  }
  if(req.query.itemname!="")
  {
    cond={"Item_Name":req.query.itemname}
  }
  var items;
  var type;
  var FnAddsearchItemcall = require("./app/scripts/dboperations.js");
  FnAddsearchItemcall.FnAddsearchItem("addsearchitem-service",cond,function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Function to update the item info req receives from the admin service
app.post("/additemupdate-service",urlencodedParser,function(req,res) {
    cond={"Item_ID":req.query.itemid}
  response = {
    //Item_Optional_Supplier_ID:req.query.itemoptionalsupplier,
    //Item_Supplier_ID:req.query.itemsupplier,
    //Purchase_Type_Flag:req.query.itemflag,
    Item_ID:req.query.itemid,
    Item_Name:req.query.itemname,
    Item_Description:req.query.itemdes,
    Container:req.query.container,
    UOM:req.query.quantity,
    Item_Group_ID:req.query.itemgroup,
    Item_Type_ID:req.query.itemtype,
    Store_Location_ID:req.query.storeslocation,
    Item_Purchase_Type_ID:req.query.itemflag

  };
  var FnAddItemUpdatecall = require("./app/scripts/dboperations.js");
  FnAddItemUpdatecall.FnAddItemUpdate("additemupdate-service",cond,response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });

});

//Function for writing item info...req receives from admin service
app.post("/additem-service",urlencodedParser,function(req,res) {
//console.log(req.query.itemid);
  response = {
    //Item_Optional_Supplier_ID:req.query.itemoptionalsupplier,
    //Item_Supplier_ID:req.query.itemsupplier,
    Item_ID:req.query.itemid,
    Item_Name:req.query.itemname,
    Item_Description:req.query.itemdes,
    Container:req.query.container,
    UOM:req.query.quantity,
    Item_Group_ID:req.query.itemgroup,
    Item_Type_ID:req.query.itemtype,
    Store_Location_ID:req.query.storeslocation,
    Item_Purchase_Type_ID:req.query.itemflag
    //Purchase_Type_Flag:req.query.itemflag

  };
  //console.log(response);
  var FnAddItemWritecall = require("./app/scripts/dboperations.js");
  FnAddItemWritecall.FnAddItemWrite("additem-service",response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });

});


//Function for writing item info...req receives from admin service
app.post("/additemsupplier-service",urlencodedParser,function(req,res) {

  response = {
    Item_Supplier_ID:req.query.supplierid,
    Item_ID:req.query.itemid,
    Item_Supplier_price:req.query.price

  };
  //console.log(response);
  var FnAddItemWritecall = require("./app/scripts/dboperations.js");
  FnAddItemWritecall.FnAddItemWriteSupplier("additemsupplier-service",response,function(returnval){
    res.status(200).json({'returnval': returnval});
  });

});

app.post('/deleteitemsupplier-service',urlencodedParser, function (req, res) {
  var itemid=req.query.itemid;
  var supplierid=req.query.supplierid;
  var Fndeleteitemsuppliercall = require("./app/scripts/dboperations.js");
  Fndeleteitemsuppliercall.Fndeleteitemsupplier("deleteitemsupplier-service",itemid,supplierid,function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

app.post('/updateitempricesupplier-service',urlencodedParser, function (req, res) {
  var itemid=req.query.itemid;
  var supplierid=req.query.supplierid;
  var supplierprice=req.query.supplierprice;
  var Fnupdateitempricesuppliercall = require("./app/scripts/dboperations.js");
  Fnupdateitempricesuppliercall.Fnupdateitempricesupplier("updateitempricesupplier-service",itemid,supplierid,supplierprice,function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});



//Function to fetch the searched item info using id or name according to the search type
app.post('/itemstoresread-service',urlencodedParser, function (req, res) {
  var Fnitemstoresreadcall = require("./app/scripts/dboperations.js");
  Fnitemstoresreadcall.Fnitemstoresread("itemstoresread-service",function(returnval){
    res.status(200).json({'itemarr': returnval});
  });
});

//Method to fetch the items
app.post("/itemlist-service",urlencodedParser,function(req,res){
  //console.log('itemlist service...');
  var wardflag=req.query.wardflag;
  var itemid=req.query.itemid;
  //cond={state:req.query.status};
  var FnFetchItemlistcall= require("./app/scripts/dboperations.js");
  FnFetchItemlistcall.FnFetchItemlist("itemlist-service",wardflag,itemid,function(returnval){
      res.status(200).json({'itemarr': returnval});
  });
});


//Node server running port number
app.listen(8085);

