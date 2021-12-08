/*AJAX FUNCTION TO SUBMIT FORMS*/
function submitForm(frmObj,url,succMsg,loadMsg){
    if(!loadMsg){loadMsg = 'Submiting Request...';}
    if(!succMsg){succMsg = "Success";}
    showLoader(loadMsg);//display the loader preview
        var data = false;
    if(window.FormData){
        data = new FormData(frmObj[0]);
    }
        //data = frmObj.serialize();
        data = new FormData(frmObj[0]);
         let promise = $.ajax({
            url: url,
            data: data ? data:frmObj.serialise(),
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            //mimeType:"multipart/form-data",
          })
            .done(function(msg) {
                console.log(msg);
                if(msg === "ok"){
                    $.notify(succMsg,{className:"success",autoHideDelay:10000,clickToHide:true});
                }else{
                    $.notify(msg,{className:"warning",clickToHide:true,autoHide:false,position:""});
                }
                hideLoader();
            })
            .fail(function(xhr) {
                var err =  "Ooops! an error occured";
                console.log(err+": error code: "+xhr.status+" - "+xhr.statusText);
                $.notify("Error! "+err,{className:"error",clickToHide:true,autoHideDelay:5000});
                hideLoader();
                });
         return promise;
}

//function to login
function login(frmObj,url,callback_url){
    if(!callback_url){callback_url = ''}
    showLoader('Authenticating...');//display the loader preview
        var data = false;
    if(window.FormData){
        data = new FormData(frmObj[0]);
    }
        //data = frmObj.serialize();
        data = new FormData(frmObj[0]);
          return $.ajax({
            url: url,
            data: data ? data:frmObj.serialise(),
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            //mimeType:"multipart/form-data",
            before: function(){
                //$.notify.init();
                $.notify("Authenticating...",{className:"info",clickToHide:true});
                
            }
          })
            .done( function(msg) {
                if(msg != "ok"){
                    $(frmObj).notify(msg,{className:"error",clickToHide:true,autoHide:false,position:'t'});
                }else{
                    if(callback_url != '') {
                        $(frmObj).notify("Authentication Successfull. Redirecting...", {
                            className: "success",
                            clickToHide: true,
                            position: 't l'
                        });
                        document.location.replace(callback_url);
                    }else{
                        $(frmObj).notify("Authentication Successfull.", {
                            className: "success",
                            clickToHide: true,
                            position: 't l'
                        });
                        document.location.reload();
                    }
                }
                hideLoader();
            })
            .fail(function(xhr) {
                var err =  xhr.statusText;
            $.notify("Error! "+xhr.status+" - "+err,{className:"error",clickToHide:true,position:"t"});
            hideLoader();
            });
        
}

/*AJAX FUNCTION TO POPULATE DATA*/
function populateData(data_url,data,display){
    let output = $(display);
    //show the loader icon
    preLoader.show(output);
   return $.ajax({
        type: 'post',
        url: data_url,
        data: data
      
  }).done(function(d){
        output.html(d);
    })
    .fail(function(xhr){
        output.html("Oops! "+xhr.statusText);
    });
}

/*AJAX FUNCTION TO RETURN RESPONSE DATA*/
function returnResponse(data_url,data,responseType){
    if(!requestType){requestType = '';}
    return $.ajax({
        type: 'post',
        url: data_url,
        data: data
      
  }).done(function (response){
      if (responseType === 'json'){return JSON.parse(response);}
      else if(responseType === 'string'){return JSON.stringify(response);}
      else if (responseType === ''){  return response; }
    }).fail(function (xhr) {
        let err =  xhr.statusText;
        $.notify("Error! "+err,{className:"error",clickToHide:true,autoHideDelay:5000});
    });
}

//ajax functio to populate selection with category list
function displayCategory(obj,select,url){
    if(!select){select="";}
    if(!url){url="action/category_list.php";}
    populateData(url,{action:"getlist",select:select},obj);
}
function displaySubCategory(obj,level,select,url){
    if(!select){select="";}
    if(!url){url="action/category_list.php";}
   if(!level){level = "";} populateData(url,{action:"get_sub_list",level:level,select:select},obj);
}
function getStateList(obj,countryCode,select,url){
    if(!select){select="";}
    if(!url){url="action/state_list.php";}
    populateData(url,{action:"get_state_list",ccode:countryCode,select:select},obj);
}
function initDataTable(table,type){
    if(!type){type = 1;}
    setTimeout(function(){
    switch(type){
        case 1:
            $(table).DataTable({
                //autoFill: true,
                responsive: true,
                scroller: false,
                colReorder: true,
                dom: 'Bfrtip',
                buttons: [
                    'excel', 'pdf','print'
                ]
            } );
        break;
        case 2:
        $(table).bootstrapTable();
            break;
            
    }
    },2000);
    
 }

//function to confirm deletion
 function confirm_del(obj,uri,callback){
        var rec = $(obj).attr('data-name');
    var yn = confirm("Do you want to delete "+rec+" record\n Note: Action can not be Undon");
    if(yn){
        showLoader('Attempting to Delete...');
        var id = $(obj).attr('data-id');//get the record id
          $.ajax({
        type: 'post',
        url: uri,
        data: {id:id},
       
        success: function(d) {
            //Display data
            if(d != "ok"){
                $.notify("Error! "+d,{className:"error"});
            }else{
                $.notify("One Item deleted!",{className:"success"});
            }
            hideLoader();
            if(callback){
                callback();
            }
        },
        error: function(xhr,req,error) {
            hideLoader();
            var err =  xhr.responseText;
        $.notify("Error! "+err,{className:"error",clickToHide:true})
        }
      
  });
        //document.location.assign("admin_panel?page=view_seekers&act=del&rec="+id);

    }


}



//function wordCount(){
    // for each "Characters remaining: ###" element found
$('.wordcount').each(function(){
// find and store the count readout and the related textarea/input field
var $count = $('.count',this);
var $input = $(this).next();
// .text() returns a string, multiply by 1 to make it a number (for math)
var maximumCount = $count.text()*1;
// update function is called on keyup, paste and input events
var update = function(){
var before = $count.text()*1;
var now = maximumCount - $input.val().length;
// check to make sure users haven't exceeded their limit
if ( now < 0 ){
var str = $input.val();
$input.val( str.substr(0,maximumCount) );
now = 0;
}
// only alter the DOM if necessary
if ( before != now ){
$count.text( now );
}
}
})
