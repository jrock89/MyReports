// Author: Jesse Rock
// Date: 10/28/2015

$(document).ready(function() {




  $(document).ready(function () {

      // Specify the unique ID of the DOM element where the
      // picker will render.
      initializePeoplePicker('peoplePickerDiv');
  });

  // Render and initialize the client-side People Picker.
  function initializePeoplePicker(peoplePickerElementId) {

      // Create a schema to store picker properties, and set the properties.
      var schema = {};
      schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
      schema['SearchPrincipalSource'] = 15;
      schema['ResolvePrincipalSource'] = 15;
      schema['AllowMultipleValues'] = true;
      schema['MaximumEntitySuggestions'] = 50;
      schema['Width'] = '280px';

      // Render and initialize the picker.
      // Pass the ID of the DOM element that contains the picker, an array of initial
      // PickerEntity objects to set the picker value, and a schema that defines
      // picker properties.
      this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
  }

  // Query the picker for user information.
  function getUserInfo() {

      // Get the people picker object from the page.
      var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;

      // Get information about all users.
      var users = peoplePicker.GetAllUserInfo();
      var userInfo = '';
      for (var i = 0; i < users.length; i++) {
          var user = users[i];
          for (var userProperty in user) {
              userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
          }
      }
      $('#resolvedUsers').html(userInfo);

      // Get user keys.
      var keys = peoplePicker.GetAllUserKeys();
      $('#userKeys').html(keys);

      // Get the first user's ID by using the login name.
      getUserId(users[0].Key);
  }

  // Get the user ID.
  function getUserId(loginName) {
      var context = new SP.ClientContext.get_current();
      this.user = context.get_web().ensureUser(loginName);
      context.load(this.user);
      context.executeQueryAsync(
           Function.createDelegate(null, ensureUserSuccess),
           Function.createDelegate(null, onFail)
      );
  }

  function ensureUserSuccess() {
      $('#userId').html(this.user.get_id());
  }

  function onFail(sender, args) {
      alert('Query failed. Error: ' + args.get_message());
  }








 //  $("#peoplePickerDiv").spPeoplePicker();
 // $("#anotherPeoplePickerDiv").spPeoplePicker();
 //
 //
 //         $("#pp1").click(function(){
 //             alert($("#peoplePickerDiv").getUserInfo());
 //             return false;
 //         });
 //         $("#pp2").click(function(){
 //             alert($("#anotherPeoplePickerDiv").getUserInfo());
 //             return false;
 //         });


  // $("#my_people_picker").spPeoplePicker();
        //      $("#anotherPeoplePickerDiv").spPeoplePicker();
              //
              //
              // $("#pp1").click(function(){
              //     alert($("#peoplePickerDiv").getUserInfo());
              //     return false;
              // });
              // $("#pp2").click(function(){
              //     alert($("#anotherPeoplePickerDiv").getUserInfo());
              //     return false;
              // });


  // window ready hide loader
  $(window).load(function() {
    $('.loader').hide();
  });

  //animate logo
  $('.brand_link').on('mouseover', function(){
    $('.brand_link').attr('src', 'https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/brand.gif');
  });

  // chooose department button on mobile
  $('.mobile_icon_nav_bar').on('click', function(){
    $('.icon_box_nav_bar').slideToggle();
    $('.mobile_icon_nav_bar span').toggleClass('rotate_item');
    $('.the_list').slideUp();
  });

  $(document).on('click', '.cat_choice', function(){
    $(this).find('.the_list').slideToggle();
  });

  $(document).on('mouseleave', '.cat_choice', function(){
    $(this).find('.the_list').slideUp();
  });


  $(document).on('click', '.all_list', function(){
    $('.load_more_reports').addClass('load_more_specific');
    $('.reset_search').hide();
    var theDept = $(this).attr('id');

    var theDeptClass = theDept.replace(/-/g, '');
    var theDeptLower = theDeptClass.toLowerCase();
    var theDeptTitle = theDept.replace(/-/g, ' ');
    console.log(theDeptTitle);

    if(window.innerWidth < 721)
    {
      $('.icon_box_nav_bar').slideToggle();
      $('.mobile_icon_nav_bar span').removeClass('rotate_item');
    }

    $('.all_dept').removeClass('selected_item');
    $('.all_list, .type_choice').removeClass('selected_item');

    $('.load_more_box').hide();
    console.log(theDeptLower);
    $('.cat_choice').removeClass('selected_item');
    $('.'+theDeptLower+'_dept').addClass('selected_item');
    $('.reset_search').hide();
    $('.th_shared_with').show();
    $('.main_wrapper').scrollTop(0);
    $('.my_reports_button, .footer_my h2').text('Loading...');
    $('.gen_info h2').text('My Reports');
    $('.icon_box_box').slideDown(100);
    $('.inner_icon_box, .table-responsive tbody').empty();
    $('.inner_icon_box').html("<div class='loadingThis'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");
    $('.table-responsive').append("<div class='loadingThisList'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");

    setTimeout(function(){
      GetReportsFiltered('1133', theDeptTitle);
    },200);

  });


  function GetReportsFiltered(position, theDeptTitle) {
    $('.load_more_box').show();
    var list = "TestList";
    var method = "GetListItems";
    var id = position;
    var query = "<Query>" +
                "<Where>" +
                  "<And>" +
                  "<Eq>" +
                  "<FieldRef Name='Department'/><Value Type='Text'>"+theDeptTitle+"</Value>" +
                "</Eq>" +
                "<Gt>" +
                "<FieldRef Name='ID'/><Value Type='Number'>"+id+"</Value>" +
              "</Gt>" +
                "</And>" +
                "</Where>" +
                "<OrderBy>" +
                  "<FieldRef Name='Title'/>" +
                "</OrderBy>" +
              "</Query>";

    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Title' />" +
      "<FieldRef Name='Path' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='listItemId' />" +
      "<FieldRef Name='PublishDate' />" +
      "<FieldRef Name='ID' />" +
      "<FieldRef Name='Status' />" +
      "<FieldRef Name='Owner' />" +
      "<FieldRef Name='Recipients' />" +
      "</ViewFields>";
    $().SPServices({
      operation: method,
      async: false,
      listName: list,
      CAMLViewFields: fieldsToRead,
      CAMLQuery: query,
      CAMLRowLimit: "10",
      completefunc: function(xData, Status) {
          $('.load_more_box').show();
        $('.load_more_reports').text('Load More Reports');
        $(xData.responseXML).SPFilterNode("z:row").each(function() {

          var name = ($(this).attr("ows_Title")); //name
          var path = ($(this).attr("ows_Path")); //path
          var department = ($(this).attr("ows_Department")); //department
          var report_type = ($(this).attr("ows_ReportType")); //report type
          var pub_date = ($(this).attr("ows_PublishDate")); //pub date
          var listItemId = ($(this).attr("ows_listItemId")); //listItemId
          var itemID = ($(this).attr("ows_ID")); //listItemId
          var itemStatus = ($(this).attr("ows_Status")); //listItemId
          var owner = ($(this).attr("ows_Owner")); //listItemId
          var itemRecipients = ($(this).attr("ows_Recipients")); //Recipients
          $('.load_more_specific').attr('data-type', report_type);
          $('.load_more_specific').attr('data-department', department);
// console.log(itemRecipients);
          // console.log(owner);
          $('.load_more_reports').attr('id', itemID);
          displayList(name, department, report_type, listItemId, report_type, pub_date, path, itemID, itemStatus, owner, itemRecipients);

        });
      }
    });
  }







    function GetReportsFilteredByType(position, theDeptType) {
      $('.load_more_box').show();
      var list = "TestList";
      var method = "GetListItems";
      var id = position;
      var query = "<Query>" +
                  "<Where>" +
                    "<And>" +
                    "<Eq>" +
                    "<FieldRef Name='ReportType'/><Value Type='Text'>"+theDeptType+"</Value>" +
                  "</Eq>" +
                  "<Gt>" +
                  "<FieldRef Name='ID'/><Value Type='Number'>"+id+"</Value>" +
                "</Gt>" +
                  "</And>" +
                  "</Where>" +
                  "<OrderBy>" +
                    "<FieldRef Name='Title'/>" +
                  "</OrderBy>" +
                "</Query>";

      var fieldsToRead = "<ViewFields>" +
        "<FieldRef Name='Title' />" +
        "<FieldRef Name='Path' />" +
        "<FieldRef Name='Department' />" +
        "<FieldRef Name='ReportType' />" +
        "<FieldRef Name='listItemId' />" +
        "<FieldRef Name='PublishDate' />" +
        "<FieldRef Name='ID' />" +
        "<FieldRef Name='Status' />" +
        "<FieldRef Name='Owner' />" +
        "<FieldRef Name='Recipients' />" +
        "</ViewFields>";
      $().SPServices({
        operation: method,
        async: false,
        listName: list,
        CAMLViewFields: fieldsToRead,
        CAMLQuery: query,
        CAMLRowLimit: "10",
        completefunc: function(xData, Status) {
            $('.load_more_box').show();
          $('.load_more_reports').text('Load More Reports');
          $(xData.responseXML).SPFilterNode("z:row").each(function() {

            var name = ($(this).attr("ows_Title")); //name
            var path = ($(this).attr("ows_Path")); //path
            var department = ($(this).attr("ows_Department")); //department
            var report_type = ($(this).attr("ows_ReportType")); //report type
            var pub_date = ($(this).attr("ows_PublishDate")); //pub date
            var listItemId = ($(this).attr("ows_listItemId")); //listItemId
            var itemID = ($(this).attr("ows_ID")); //listItemId
            var itemStatus = ($(this).attr("ows_Status")); //listItemId
            var owner = ($(this).attr("ows_Owner")); //listItemId
            var itemRecipients = ($(this).attr("ows_Recipients")); //Recipients
            $('.load_more_specific').attr('data-type', report_type);
            $('.load_more_specific').attr('data-department', department);
  // console.log(itemRecipients);
            // console.log(owner);
            $('.load_more_reports').attr('id', itemID);
            displayList(name, department, report_type, listItemId, report_type, pub_date, path, itemID, itemStatus, owner, itemRecipients);

          });
        }
      });
    }




  function countDisplayedReports(){


  }





  $('.inner_rep_req').on('click', function(){
    $('.inner_rep_req span').toggleClass('rotate_item_full');
  });




  $('.cats').hide();
  $('.table-responsive, .report_sheet').hide();
  $('.inner_icon_box').show();
  $('.inner_rep_ico span').toggleClass('rotate_item_full');
  $('.inner_rep_ico').css('background', '#335D27', '!important');
  $('.inner_rep_cat, .inner_rep_gro, .inner_rep_det').css('background', '#63ba49', '!important');

  $('.inner_rep_ico').css('border-bottom', '3px solid #335D27', '!important');
  $('.inner_rep_cat, .inner_rep_gro, .inner_rep_det').css('border-bottom', '3px solid #478635', '!important');






  // icon view button
  $('.inner_rep_ico').on('click', function(){

    if(window.innerWidth < 720){
        $('.gen_info').css('margin-top', '0', '!important');
    }

    $('.gen_info').css('padding', '15px 10px 0px 10px', '!important');
    $('.cats').hide();
    $('.table-responsive, .report_sheet').hide();
    $('.inner_icon_box').show();
    $('.inner_rep_ico span').toggleClass('rotate_item_full');
    $('.inner_rep_ico').css('background', '#335D27', '!important');
    $('.inner_rep_cat, .inner_rep_gro, .inner_rep_det').css('background', '#63ba49', '!important');

    $('.inner_rep_ico').css('border-bottom', '3px solid #335D27', '!important');
    $('.inner_rep_cat, .inner_rep_gro, .inner_rep_det').css('border-bottom', '3px solid #478635', '!important');
  });

  // group view button - sorts by report name
  $('.inner_rep_gro').on('click', function(){

    if(window.innerWidth < 720){
        $('.gen_info').css('margin-top', '45px', '!important');
    }

    $('.gen_info').css('padding', '55px 10px 0px 10px', '!important');
    $('.inner_rep_gro span').toggleClass('rotate_item_full');
    // $("#report_btn_sort").click();
    $('.cats').hide();
    $('.inner_icon_box, .report_sheet').hide();
    $('.table-responsive').show();
    $('.inner_rep_gro').css('background', '#335D27', '!important');
    $('.inner_rep_cat, .inner_rep_det, .inner_rep_ico').css('background', '#63ba49', '!important');

    $('.inner_rep_gro').css('border-bottom', '3px solid #335D27', '!important');
    $('.inner_rep_cat, .inner_rep_det, .inner_rep_ico').css('border-bottom', '3px solid #478635', '!important');
  });

  //report button - open report
  $(document).on('click', '.report_btn', function(){
    theDocument = $(this).attr('id');
    window.open(theDocument, '_blank');

  });

  // force form tags into sharepoint
  $('.input_goes_here').append('<form  onkeypress="return event.keyCode != 13"><input  class="search_input" style="" id="search_input" name="name" type="text" placeholder="Search" class="form-control"><div class="search_input_submit">Submit</div></form>');

  $('.search_button_two').append('<form  onkeypress="return event.keyCode != 13"><input  class="search_input_two" style="" id="search_input_two" name="name" type="text" placeholder="Search" class="form-control"><div class="search_input_submit_two"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></div></form>');

  // attempt to prevent form submision to refresh page
  $('form').submit(function() {
    return false;
  });

  //'Enter' key when in the search input fires search off
  $("#search_input").keyup(function(e) {
    if (event.keyCode == 13) {
      $('#search_input').blur();
      e.preventDefault();
      $(".search_input_submit").click();
      return false;
    }
  });

  //search toggle
  $('.search').on('click', function() {
    $('.search_callout').hide();
    $('.search_input').toggleClass('search_open').focus().val('');
    $('.search_input_submit').toggleClass('search_sub_open');
    $('.overlay_2').toggle();
    $('.share_box, .shared_with_box').hide();
  });



  //share report button icon
  $(document).on('click', '.open_share_dialog', function(){
    var theId = $(this).attr('data-id');
    $('.share_this_one').hide();
    $('.share_overlay, .share_this_one_'+theId).show();

    // $.ajax({
    // 	url: 'https://thegolubcorporation.sharepoint.com/sites/MYReports/_layouts/15/aclinv.aspx?forSharing=1&mbypass=1&List=%7BF1C1A511%2DFB4B%2D4D41%2DB56E%2DB289EF7BC771%7D&obj={F1C1A511-FB4B-4D41-B56E-B289EF7BC771},767,DOCUMENT","groupId":0,"useSimplifiedRoles":true',
    // 	type: 'POST',
    // 	dataType: 'json',
    // 	success: function() {
    // 		console.log('cool');
    // 	}
    // });


    // $('.request_box_inner').hide();
    // var shareTitle = $(this).closest('.this_title_wrap').find('.this_title').text();
    // var theID = $(this).attr('id');
    // $('.share_accepted').hide();
    // $('.share_title').text(shareTitle);
    // $('.overlay_share').fadeIn();
    // $('.share_box, .share_box_inner').fadeIn();
    // $('.share_box_inner').html('<div class="row"><div class="col-md-6 share_info">Enter the full name of the user you wish to share this report with, then hit submit.</div><div class="col-md-6"><form  onkeypress="return event.keyCode != 13"><input  class="share_input" style="" id="share_input" name="emailname" type="text" placeholder="Users Full Name" class="form-control"><div class="share_input_submit" id="' + theID + '">Submit</div></form></div></div>');
  });
  $(document).on('click', '#cancel_report_share, .share_overlay', function(){
    // $('.share_this_one').hide();

    $('.share_this_one, .share_overlay').hide();
  });




  // edit box open
  $(document).on('click', '.right_icon', function(){
    $('.edit_box, .overlay_share').fadeIn();
    var reportID = $(this).closest("div").attr("data-id");
    var reportName = $(this).closest("div").attr("data-title");
    $('.edit_box .owner_input_btn, .edit_box .description_input_btn').attr('data-id', reportID);
    $('.edit_title').text(reportName);
  });

  $(document).on('click', '.owner_input_btn', function(){

    var itemID = $(this).attr('data-id');
    var newOwnerName = $('.edit_owner_input').val();

    newOwnerName = newOwnerName.split(' ');
    newOwnerName = newOwnerName[0].charAt(0).toUpperCase() + newOwnerName[0].slice(1) + ' ' + newOwnerName[1].charAt(0).toUpperCase() + newOwnerName[1].slice(1);


      $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "Update",
            listName: "TestList",
            ID: itemID,
            valuepairs: [["Owner", newOwnerName]],
            completefunc: function(xData, Status) {
              var noSpaceOwnerName = newOwnerName.replace(/\s/g,'');
              console.log(noSpaceOwnerName);
              $('.the_owner_'+itemID).text(newOwnerName);
              $('.user_img_'+itemID+' img').attr('src','https://thegolubcorporation-my.sharepoint.com/User%20Photos/Profile%20Pictures/'+noSpaceOwnerName+'_golub_com_MThumb.jpg');


              $('.sip_'+itemID).attr('href', 'sip:'+noSpaceOwnerName+'@golub.com');

              $('.right_icon_box_'+itemID).hide();


              $('.edit_owner_input').val('');
              $('.owner_input_btn').text('Owner has been updated to '+newOwnerName+'!');
              setTimeout(function(){
                $('.owner_input_btn').text('Update Owner');
                $('.edit_box').hide();
                $('.overlay_share').fadeOut();
              },3000);
            }
        });


  });



  $(document).on('click', '.description_input_btn', function(){

    var itemID = $(this).attr('data-id');
    var description = $('.edit_description_input').val();



      $().SPServices({
            operation: "UpdateListItems",
            async: false,
            batchCmd: "Update",
            listName: "TestList",
            ID: itemID,
            valuepairs: [["Description", description]],
            completefunc: function(xData, Status) {
                $('.edit_description_input').val('');
                $('.description_input_btn').text('Description has been updated to "'+description+'"!');
                setTimeout(function(){
                  $('.description_input_btn').text('Update Description');
                },3000);

              $('#item_desc_' + itemID).text(description);

            }
        });


  });


  //version button icon
  $(document).on('click', '.report_version', function(){

    setTimeout(function(){
      // $('.share_box span, .version_box span, .pdf_preview span, .shared_with_box span').addClass('open_x');
    }, 1500);

    var shareTitle = $(this).closest('.this_title_wrap').find('.this_title').text();
    var theID = $(this).attr('id');
    $('.share_title').text(shareTitle);
    $('.overlay_share').fadeIn();
    $('.version_box').fadeIn();


    var path = $(this).attr('id');
    var department = $(this).attr('data-department');
    console.log(department);
    $('.version_box_inner').empty();

    var versionIcon;
    versionIcon = "https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf_icon.png";
    if(path.indexOf('xlsx') > -1)
    {
      versionIcon = "https://s1-odc-15.cdn.office.net:443/start/sc/1666042226_resources\\favicon_excel.ico";
    }


    var folder = path;
    $().SPServices({
        operation: "GetListItems",
        async: false,
        webURL: "https://thegolubcorporation.sharepoint.com/sites/MYReports/",
        listName: department,
        CAMLViewFields: "<ViewFields Properties='true'>" +
          "<FieldRef Name='ReportDate' />" +
          "</ViewFields>",
        CAMLQueryOptions: "<QueryOptions><Folder>" + folder + "</Folder><ViewAttributes Scope='FilesOnly'></ViewAttributes></QueryOptions>",
        // CAMLRowLimit: "10",
        CAMLQuery: "<Query><Where><Neq><FieldRef Name='ID'/><Value Type='Number'>0</Value></Neq></Where><OrderBy><FieldRef Name='ReportDate' Ascending='False'/></OrderBy></Query>",
        completefunc: function (xData, Status) {

            $(xData.responseXML).SPFilterNode("z:row").each(function () {

                var date = ($(this).attr("ows_ReportDate")); //date

                date = date.split(" ");
                date = date[0].split("-");
                var myYear = date[0];
                var myMonth = date[1];
                var myDay = date[2];
                date = myMonth + '/' + myDay + '/' + myYear;


                var monthNames = [
                  "January", "February", "March",
                  "April", "May", "June", "July",
                  "August", "September", "October",
                  "November", "December"
                ];








                var theDate = new Date(date);
                var weekday = new Array(7);
                weekday[0]=  "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";

                var theDayOfWeek = weekday[theDate.getDay()];



                var day = theDate.getDate();

                var monthIndex = theDate.getMonth();
                var year = theDate.getFullYear();
                // console.log(theDate.getDay());
                var formattedDate = theDayOfWeek + ' ' + monthNames[monthIndex] + ' ' + day + ', ' + year;

                path = "https://thegolubcorporation.sharepoint.com/"+$(this).attr("ows_FileRef").split(';#')[1];

                var name = $('.version_box .share_title').text();



                $('.version_box_inner').append('<div class="row each_version"><div class="col-xs-10">' + formattedDate + '</div><a target="blank" href="' + path + '"><div class="col-xs-2"><img src="'+ versionIcon +'"></div></a></div><br>');

                var calenderViewData = $('.version_calender_view').attr('data-info');

                var pathForInfo = path.replace(/\s/g, '%20');
                console.log(pathForInfo);
                $('.version_calender_view').attr('data-info', calenderViewData + ', ' + monthNames[monthIndex] + ' ' + day + ' ' + pathForInfo)
            });
        }
    });

  buildCalender(curMonth, '', '');


    // $('.share_box_inner').html('<div class="row"><div class="col-md-6 share_info">Enter the full name of the user you wish to share this report with, then hit submit.</div><div class="col-md-6"><form  onkeypress="return event.keyCode != 13"><input  class="share_input" style="" id="share_input" name="emailname" type="text" placeholder="Users Full Name" class="form-control"><div class="share_input_submit" id="' + theID + '">Submit</div></form></div></div>');
  });


  // $(document).on('mouseover', '.each_version col-xs-2', function(){
  //   $('.each_version i').css('text-shadow', '0 0 transparent');
  // });
  // $(document).on('mouseover', '.each_version col-xs-2', function(){
  //   $('.each_version i').css('text-shadow', '0 0 transparent');
  // });

  //share reports buttons
  $(document).on('click', '.share_input_submit', function(){



    var users_name = $('.share_input').val();

    if(users_name != ''){
      // console.log(users_name);
      $('.the_users_name').text(users_name);
      $('.share_accepted').slideDown();
      $('.share_input').val('');
    }else{
      $('.share_input').css('background', 'rgba(240, 0, 0, 0.5)');
      $('.share_input').css('color', '#f2f2f2');
    }





    users_name = users_name.replace(/\s+/g, '_');


    // console.log(users_name);


    var itemStatus;

    var itemID = $(this).attr('id');

    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Title' />" +
      "<FieldRef Name='Path' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='listItemId' />" +
      "<FieldRef Name='PublishDate' />" +
      "<FieldRef Name='ID' />" +
      "<FieldRef Name='Status' />" +
      "</ViewFields>";


    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "TestList",
        ID: itemID,
        CAMLViewFields: fieldsToRead,
        CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID'/><Value Type='Number'>" + itemID + "</Value></Eq></Where></Query>",
        completefunc: function (xData, Status) {
          $(xData.responseXML).SPFilterNode("z:row").each(function() {
            thisID = ($(this).attr("ows_ID"));
            // if(thisID === itemID){
              itemStatus = ($(this).attr("ows_Status"));

            // }


          });
        }
      });


        // console.log(itemStatus);
        itemStatus = itemStatus.toLowerCase();
        // itemStatus = itemStatus.replace(/ /g,"");






        var containes = itemStatus.indexOf(users_name) > -1;
        if (containes === true) {

          itemStatus = itemStatus.replace(users_name + ' ', '');
            // console.log(itemStatus);

          $().SPServices({
                operation: "UpdateListItems",
                async: false,
                batchCmd: "Update",
                listName: "TestList",
                ID: itemID,
                valuepairs: [["Status", itemStatus]],
                completefunc: function(xData, Status) {

                  // console.log('worked');
                  // console.log(itemStatus);

                }
            });

        }else{
          // console.log('did not contain');
        }





  });

  $(document).on('click', '.share_input', function(){
    $('.share_input').css('background', '#fff');
    $('.share_input').css('color', '#000');
  });


  //request report button
  $(document).on('click', '.request_access', function(){



    var first = $().SPServices.SPGetCurrentUser({
                    fieldName: "FirstName",
                    debug: false
                });
    var last = $().SPServices.SPGetCurrentUser({
                   fieldName: "LastName",
                   debug: false
               });

    var user_name = first + "_" + last + " ";
    // console.log(user_name);
    var itemStatus;

    var itemID = $(this).attr('id');

    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Title' />" +
      "<FieldRef Name='Path' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='listItemId' />" +
      "<FieldRef Name='PublishDate' />" +
      "<FieldRef Name='ID' />" +
      "<FieldRef Name='Status' />" +
      "</ViewFields>";


    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "TestList",
        ID: itemID,
        CAMLViewFields: fieldsToRead,
        CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID'/><Value Type='Number'>" + itemID + "</Value></Eq></Where></Query>",
        completefunc: function (xData, Status) {
          $(xData.responseXML).SPFilterNode("z:row").each(function() {
            thisID = ($(this).attr("ows_ID"));
            // if(thisID === itemID){
              itemStatus = ($(this).attr("ows_Status"));
              // console.log(itemStatus);
            // }


          });
        }
      });


        // console.log(itemStatus);
        // console.log(itemID);
        $().SPServices({
              operation: "UpdateListItems",
              async: false,
              batchCmd: "Update",
              listName: "TestList",
              ID: itemID,
              valuepairs: [["Status", user_name + itemStatus]],
              completefunc: function(xData, Status) {
                // console.log("completed");
                itemRequested();

              }
          });
      function itemRequested(){
        $('.' + itemID + '_request').hide();
        $('.' + itemID+ '_sent').show();
      }



  });


  //search and share hide - click faded overlay
  $('.overlay_2, .overlay_share').on('click', function() {
    $('.search_input').removeClass('search_open').focus().val('');
    $('.search_input_submit').removeClass('search_sub_open');
    $('.overlay_2, .overlay_share, .pdf_preview, .edit_box').hide();
    $('.share_box, .shared_with_box, .version_box').hide();
    // $('.share_box span, .version_box span, .pdf_preview span, .shared_with_box span').removeClass('open_x');
    $('.pdf_preview iframe').attr('src', '');
      $('.version_calender_view').attr('data-info','');
  });

  // share button - open share options
  $(document).on('click', '.share_btn', function(){
    $('.overlay_2, .share_box').toggle();
  });
  $(document).on('click', '.reports_shared_with', function(){


    setTimeout(function(){
      // $('.share_box span, .version_box span, .pdf_preview span, .shared_with_box span').addClass('open_x');
      $('.shared_with_box').scrollTop(0);
    }, 200);


    var recipientsTitle = $(this).closest('.this_title_wrap').find('.this_title').text();
    var theRecipients = $(this).attr('data-recipients');
    console.log(theRecipients);

    $('.shared_title').empty();
    $('.shared_title').text('Recipients of ' + recipientsTitle);
    $('.overlay_share, .shared_with_box').toggle();
    $('.shared_box_inner').empty();

    if(typeof theRecipients === 'undefined' || theRecipients === ''){
      $('.shared_title').empty();
      $('.shared_title').text('Recipients of ' + recipientsTitle);
      $('.overlay_share, .shared_with_box').toggle();
      $('.shared_box_inner').empty();
      $('.shared_box_inner').append('<div class="recipient_wrapper col-sm-12" style="color:#000;">This report has no Recipients.</div>');

    }
    else{
      theRecipients = theRecipients.split("#");
      console.log(theRecipients);

      RecipientsLength = theRecipients.length;
      var myDublicateCheck = '';
      for(i = 1;i <= RecipientsLength; i = i + 2){

        theRecipientsName = theRecipients[i].split(',');


        // theRecipientsLink = theRecipients.replace(/\s/g, '');
        // console.log(theRecipientsName[0]);

        var thisContaines = theRecipientsName[0].indexOf('System') > -1;

        // console.log(thisContaines);

        if(thisContaines === false)
        {

          var checkForDups = myDublicateCheck.indexOf(theRecipientsName[0]) > -1;
          if(checkForDups === false){
            myDublicateCheck = myDublicateCheck + ', ' + theRecipientsName[0];
            theRecipientsName = theRecipientsName[1] + ' ' + theRecipientsName[0];
            theRecipientsName = theRecipientsName.replace(";", "");
            var theRecipientsLink = theRecipientsName.replace(/\s/g, '');
            var pChopEmail = theRecipientsLink + '@golub.com';
            $('.shared_box_inner').append('<div class="recipient_wrapper col-sm-12"><div class="inner_recipient row"><div class="col-xs-2"><img src="https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email='+theRecipientsLink+'@golub.com&UA=0&size=HR64x64&sc=1450356241799"></div><div class="col-xs-4"><h1 class="recipient_name">'+theRecipientsName+'</h1></div><div class="col-xs-6"><div class="row the_actions"><div class="col-xs-3"><a href="sip:'+theRecipientsLink+'@golub.com"><i class="fa fa-comment"></i></a></div><div class="col-xs-3"><a href="sip:'+theRecipientsLink+'@golub.com"><i class="fa fa-phone"></i></a></div><div class="col-xs-3"><a href="sip:'+theRecipientsLink+'@golub.com"><i class="fa fa-video-camera"></i></a></div><div class="col-xs-3"><a href="mailto:'+pChopEmail+'"><i class="fa fa-envelope"></i></a></div></div></div></div></div></div>');



          }

        }




      }



  // https://thegolubcorporation-my.sharepoint.com/_layouts/15/me.aspx?p=jesserock%40golub.com&u=175a0f0d-9e07-4c57-a70a-1a6c466b92db&v=profile




    }


    // $('.shared_box_inner').append('<div class="recipient_wrapper col-sm-12"><div class="inner_recipient row"><div class="col-xs-3"><img src="https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=BrianFranko@golub.com&UA=0&size=HR64x64&sc=1450356241799"></div><div class="col-xs-9"><h1 class="recipient_name">Brian Franko</h1></div></div></div></div>');
    // $('.shared_box_inner').append('<div class="recipient_wrapper col-sm-12"><div class="inner_recipient row"><div class="col-xs-3"><img src="https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=NicholasPrusko@golub.com&UA=0&size=HR64x64&sc=1450356241799"></div><div class="col-xs-9"><h1 class="recipient_name">Nicholas Prusko</h1></div></div></div></div>');
    // $('.shared_box_inner').append('<div class="recipient_wrapper col-sm-12"><div class="inner_recipient row"><div class="col-xs-3"><img src="https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=TracyNolan@golub.com&UA=0&size=HR64x64&sc=1450356241799"></div><div class="col-xs-9"><h1 class="recipient_name">Tracy Nolan</h1></div></div></div></div>');
    // $('.shared_box_inner').append('<div class="col-md-6 col-lg-3"><div class="inner_recipient row"><div class="col-sm-3"><img src="https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=JesseRock@golub.com&UA=0&size=HR64x64&sc=1450356241799"></div><div class="col-sm-9"><h1 class="recipient_name"></h1></div></div></div></div>');
  });

  //close share box
  $('.share_box span, .shared_with_box span, .version_box span, .pdf_preview span, .edit_box span').on('click', function() {
    $('.overlay_share, .overlay_2, .edit_box').hide();
    $('.share_box, .shared_with_box, .version_box, .pdf_preview').hide();
    // $('.share_box span, .version_box span, .pdf_preview span, .shared_with_box span').removeClass('open_x');

      $('.pdf_preview iframe').attr('src', '');
      $('.version_calender_view').attr('data-info','');
  });

  //search input - submit
  var search;
  $('.search_input_submit').on('click', function() {
    $('tbody tr').show();
    $('#search_input').blur();
    $('.reset_search').show();
    $('.active_report').show();
    search = $('.search_input').val();
    searchFinal = search.toLowerCase();
    $('.search_input').removeClass('search_open').focus().val('');
    $('.search_input_submit').removeClass('search_sub_open');
    $('.overlay_2').fadeOut();




    var queryText = "<QueryPacket xmlns='urn:Microsoft.Search.Query' Revision='1000'>"
    queryText += "<Query>"
    queryText += "<Context>"
    queryText += "<QueryText language='en-US' type='STRING'>"
    queryText += search;
    queryText += "</QueryText>"
    queryText += "</Context>"
    queryText += "</Query>"
    queryText += "</QueryPacket>";

    var title, url = "";

            $().SPServices({
                operation: "Query",
                queryXml: queryText,
                completefunc: function(xData, Status) {
                    $(xData.responseXML).find("QueryResult").each(function() {
                        //let's see what the response looks like
                        $("#result").text($(this).text());
                    });
                }
            });


    // var item = $('.item_title');
    // var itemCount = item.length;
    //   for (var i = 1; i < itemCount + 1; i++) {
    //     var itemText = $('.active_report_1:nth-child(' + i + ')').text();
    //     var itemTextFinal = itemText.toLowerCase();
    //     var rowContaines = itemTextFinal.indexOf(searchFinal) > -1;
    //     if (rowContaines !== true) {
    //       $('.active_report_1:nth-child(' + i + ')').hide();
    //     }
    //     else {}
    //   }
    // var listCount = $('#reports_table tr').length;
    // for(var i = 2; i < listCount + 1; i++ ){
    //   var checkThis = $('tbody tr:nth(' + i + ')').text();
    //   var checkThisFinal = checkThis.toLowerCase();
    //   var rowContaines = checkThisFinal.indexOf(searchFinal) > -1;
    //   if (rowContaines !== true) {
    //     $('tbody tr:nth(' + i + ')').hide();
    //   }
    // }
    return false;
  });



  //search input - submit MOBILE SUBMIT
  var search;
  $('.search_input_submit_two').on('click', function() {
    $('tbody tr').show();
    $('#search_input_two').blur();
    $('.reset_search').show();
    $('.active_report').show();
    search = $('.search_input_two').val();
    searchFinal = search.toLowerCase();
    $('.search_input_two').focus().val('');
    // $('.search_input_submit_two').removeClass('search_sub_open');


    //icon view
    var item = $('.item_title');
    var itemCount = item.length;
    // console.log(itemCount);
    // var row_count = $('.report_row').length;

      for (var i = 1; i < itemCount + 1; i++) {
        var itemText = $('.active_report_1:nth-child(' + i + ')').text();
        // console.log(itemText);
        var itemTextFinal = itemText.toLowerCase();
        var rowContaines = itemTextFinal.indexOf(searchFinal) > -1;
        if (rowContaines !== true) {
          $('.active_report_1:nth-child(' + i + ')').hide();
        }
        else {}
      }


    //table view detail view
    var listCount = $('#reports_table tr').length;
    for(var i = 2; i < listCount + 1; i++ ){
      var checkThis = $('tbody tr:nth(' + i + ') td:nth(1)').text();
      var checkThisFinal = checkThis.toLowerCase();
      var rowContaines = checkThisFinal.indexOf(searchFinal) > -1;
      if (rowContaines !== true) {
        $('tbody tr:nth(' + i + ')').hide();
      }
    }







    $('nav').removeClass('open_nav');
    $('.menu_options').slideUp();
    $('.menu_active').show();
    $('.menu_close').removeClass('menu_close_open');


    $('.menu_button span').removeClass('rotate_item');
    $('.menu_button').removeClass('active_menu');
    $('.social_contents').slideUp(100);
    $('.social_box span').removeClass('rotate_item');
    $('.social_box').removeClass('active_menu');
    return false;
  });


  //search input - submit
  var search;
  $('.search_input_submit').on('click', function() {
    $('tbody tr').show();
    $('#search_input').blur();
    $('.reset_search').show();
    $('.active_report').show();
    search = $('.search_input').val();
    searchFinal = search.toLowerCase();
    $('.search_input').removeClass('search_open').focus().val('');
    $('.search_input_submit').removeClass('search_sub_open');
    $('.overlay_2').fadeOut();


  var queryText = "<QueryPacket xmlns='urn:Microsoft.Search.Query' Revision='1000'>"
  queryText += "<Query>"
  queryText += "<Range><Count>10</Count></Range>";
  queryText += "<Context>"
  queryText += "<QueryText language='en-US' type='STRING'>";
  queryText += search;
  queryText += "</QueryText>"
  queryText += "</Context>"
  queryText += "</Query>"
  queryText += "</QueryPacket>";




   $().SPServices({
            operation: "Query",
            queryXml: queryText,
            completefunc: function(xData, Status) {
                $(xData.responseXML).find("QueryResult").each(function() {
                  console.log(xData.responseText);
                });
            }
        });





    // var item = $('.item_title');
    // var itemCount = item.length;
    //   for (var i = 1; i < itemCount + 1; i++) {
    //     var itemText = $('.active_report_1:nth-child(' + i + ')').text();
    //     var itemTextFinal = itemText.toLowerCase();
    //     var rowContaines = itemTextFinal.indexOf(searchFinal) > -1;
    //     if (rowContaines !== true) {
    //       $('.active_report_1:nth-child(' + i + ')').hide();
    //     }
    //     else {}
    //   }
    // var listCount = $('#reports_table tr').length;
    // for(var i = 2; i < listCount + 1; i++ ){
    //   var checkThis = $('tbody tr:nth(' + i + ')').text();
    //   var checkThisFinal = checkThis.toLowerCase();
    //   var rowContaines = checkThisFinal.indexOf(searchFinal) > -1;
    //   if (rowContaines !== true) {
    //     $('tbody tr:nth(' + i + ')').hide();
    //   }
    // }
    return false;
  });

  // reset search
  $('.reset_search').on('click', function() {
    $('.active_report').show();
    $('.reset_search').hide();
      $('tbody tr').show();
  });

  // menu button toggle drop down items
  $('.menu_button').on('click', function() {
    $('.sub_1').slideUp();
    $('.menu_button span').toggleClass('rotate_item');
    $('.menu_options li span').removeClass('rotate_item');
    $('.mob_menu_options li span').removeClass('rotate_item');
    $('.menu_options').slideToggle();
    $('.menu_button').toggleClass('active_menu');
    // $('.menu_active').toggle();
    // $('.menu_close').toggleClass('menu_close_open');
    $('.social_contents').slideUp(100);
    $('.social_box span').removeClass('rotate_item');
    $('.social_box').removeClass('active_menu');
  });



  //mobile menu button drop down items
  $('.mob_menu_button').on('click', function() {
    $('nav').toggleClass('open_nav');
    // $('.mob_menu_contents').slideToggle();
    // $('.overlay_3').toggle();
    // $('.mob_menu_options li span').removeClass('rotate_item');
    // $('.sub_1').slideUp();
    $('.menu_active').toggle();
    $('.menu_close').toggleClass('menu_close_open');
  });

  //sub menu button
  $('.sub_1_link').on('click', function() {
    $('.sub_1').slideToggle();
    $('.menu_options li span').toggleClass('rotate_item');
    $('.mob_menu_options li span').toggleClass('rotate_item');
  });

  //close sub menu drop down when mouse leaves the menu
  $('nav').on('mouseleave', function() {
    $('.sub_1').slideUp();
    $('.menu_options li span').removeClass('rotate_item');
    $('.mob_menu_options li span').removeClass('rotate_item');
  });

  //highlight active departments
  $('.active_dept').on('mouseout', function() {
    $('.active_dept .item_img').removeClass('img_shrink');
    $('.active_dept .item_title').removeClass('title_grow');
  });

  //links box/button drop down links on click
  $('.social_box').on('click', function() {

    $('.social_contents').slideToggle(100);
    $('.social_box span').toggleClass('rotate_item');
    $('.social_box').toggleClass('active_menu');
    $('.sub_1').slideUp();
    $('.menu_options li span, .menu_button span').removeClass('rotate_item');
    $('.mob_menu_options li span').removeClass('rotate_item');
    $('.menu_options').slideUp();
    $('.menu_button').removeClass('active_menu');
    $('.menu_active').show();
    $('.menu_close').removeClass('menu_close_open');
  });

  //hide links drop down
  $('.social_contents span').on('click', function() {
    $('.social_contents').slideUp(100);
  });

  $('.my_reports_button, .footer_my').on('click', function(){
    $('.load_more_reports').show();
    $('.load_more_reports_catalog').hide();
    $('.load_more_reports').removeClass('load_more_specific');
    $('.reset_search').hide();
    $('.th_shared_with').show();
    $('.main_wrapper').scrollTop(0);
    $('.my_reports_button, .footer_my h2').text('Loading...');
    $('.gen_info h2').text('My Reports');
    $('.icon_box_box').slideDown(100);
    $('.inner_icon_box, .table-responsive tbody').empty();
    $('.inner_icon_box').html("<div class='loadingThis'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");
    $('.table-responsive').append("<div class='loadingThisList'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");
    $('.merchandising_dept, .operations_dept').removeClass('selected_item');
    setTimeout(function(){
      GetReports();
    }, 150);
  });

  $(document).on('click','.all_dept', function(){
      $('.load_more_box').hide();
    $('.all_dept').addClass('selected_item');
    $('.reset_search').hide();
    $('.th_shared_with').show();
    $('.main_wrapper').scrollTop(0);
    $('.my_reports_button, .footer_my h2').text('Loading...');
    $('.gen_info h2').text('My Reports');
    $('.icon_box_box').slideDown(100);
    $('.inner_icon_box, .table-responsive tbody').empty();
    $('.inner_icon_box').html("<div class='loadingThis'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");
    $('.table-responsive').append("<div class='loadingThisList'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");
    $('.merchandising_dept, .operations_dept').removeClass('selected_item');
    setTimeout(function(){
      GetReports();
    }, 150);
  });
  // sp services begin (get list)




  //get reports function / sp services call
  GetDepartments();
  function GetDepartments() {
    var list = "TestList";
    var method = "GetListItems";
    var query;
    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Title' />" +
      "<FieldRef Name='Path' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='listItemId' />" +
      "<FieldRef Name='PublishDate' />" +
      "<FieldRef Name='ID' />" +
      "</ViewFields>";
    $().SPServices({
      operation: method,
      async: false,
      listName: list,
      CAMLViewFields: fieldsToRead,
      CAMLQuery: query,
      completefunc: function(xData, Status) {
        var numOfDepartments = 0;
        var departmentRepeat = 'nothing';
        var typeRepeat = 'nothing';

        $(xData.responseXML).SPFilterNode("z:row").each(function() {

          var title = ($(this).attr("ows_Department")); //dept
          var report_type = ($(this).attr("ows_ReportType")); //report type



          try{
          var titleContaines = departmentRepeat.indexOf(title) > -1;

          lowercaseTitle = title.toLowerCase();
          // console.log(lowercaseTitle);
          if(titleContaines === true){

            lowercaseTitle = lowercaseTitle.replace(/\s/g, '');
            uppercaseTitle = title.replace(/\s/g, '');
          }
          else{
            numOfDepartments ++;
            // console.log(report_type + ' ' + title + ' ' + numOfDepartments);

            lowercaseTitle = lowercaseTitle.replace(/\s/g, '-');
            uppercaseTitle = title.replace(/\s/g, '-');

            // UNREACHABLE CLASS TO DIM OUT AN OPTION

            $('.icon_box_nav_bar .row').append('<div class="cat_choice ' + lowercaseTitle + '_dept">' + title + '</div>');
            $('.menu_options').append('<li class="active_dept_link ' + lowercaseTitle + '">' + title + '</li>');
            $('.footer_catalog').append('<p class="active_dept_link ' + lowercaseTitle + '">' + title + '</p>');

            $('.' + lowercaseTitle + '_dept').append("<div class='" + lowercaseTitle + "_list the_list'><ul><li id='" + uppercaseTitle + "' class='" + lowercaseTitle + "_all all_list'>All</li></ul></div>");
          }


                    // console.log(typeRepeat);
                    // console.log(report_type);
          var typeContaines = typeRepeat.indexOf(report_type) > -1;
          if(typeContaines === true){

          }
          else{
              // console.log('in');
            var typeClass = report_type;
            typeClass = typeClass.replace(/\s/g, '');

            $('.' + lowercaseTitle + '_list ul').append("<li class='type_choice " + typeClass + "_list_item'>" + report_type + "</li>");
          }

          typeRepeat = typeRepeat + ' ' + report_type;

          departmentRepeat = departmentRepeat + ' ' + title;
        }
        catch(err){}
        });
        // console.log(numOfDepartments);

        $('.icon_box_nav_bar .row').append('<div class="all_dept selected_item">All</div>');

        var departmentCount = numOfDepartments;
        if(numOfDepartments % 6 === 0 || numOfDepartments % 3 === 0){
          $('.cat_choice').addClass('col-sm-4');
          $('.cat_choice').addClass('col-lg-2');
          $('.all_dept').addClass('col-sm-4');
          $('.all_dept').addClass('col-lg-2');
        }
        else{
          $('.cat_choice').addClass('col-sm-4');
          $('.all_dept').addClass('col-sm-4');
        }
      }
    });





  }



$(document).on('mouseover', '.report_img img, .report_img object', function(){
  var theNewPath = $(this).closest('.this_title_wrap').find('.report_img').attr('id');
  theNewPath = theNewPath + "#toolbar=0&navpanes=0&scrollbar=0";
  $('.pdf_preview iframe').attr('src', theNewPath);
  $(this).closest('.this_title_wrap').find('.pdf_preview').show();
});

$(document).on('mouseleave', '.report_img img, .report_img object', function(){
  $('.pdf_preview').hide();
});






  $(document).on('mouseover', '.reports_description', function(){
    $(this).closest('.active_report').find('.desc_float').toggle();
  });

  $(document).on('mouseleave', '.reports_description', function(){
    $(this).closest('.active_report').find('.desc_float').hide();
  });


  $('.load_more_reports').on('click', function(){
    var position = $(this).attr('id');
    // console.log(position);
    $('.load_more_reports').text('Loading...');
    setTimeout(function(){
      if($('.load_more_reports').hasClass("load_more_specific") === false){


      GetReports(position);
    }
    }, 100);

  });



  $(document).on('click','.load_more_specific', function(){
    var theDept = $(this).attr('data-department');
    var theType = $(this).attr('data-type');
    console.log(theType);
    console.log(theDept);

    $('.load_more_specific').text('Loading...');
    setTimeout(function(){
      if($('.load_more_reports').hasClass("load_more_specific") === true){
        getMoreReportsFiltered(theDept, theType);

      }
    }, 100);


  });

  function getMoreReportsFiltered(theDept, theType){
    $('.load_more_box').show();
    var list = "TestList";
    var method = "GetListItems";
    var query = "<Query>" +
                "<Where>" +
                  "<And>" +
                    "<Eq>" +
                    "<FieldRef Name='Department'/><Value Type='Text'>"+theDept+"</Value></Eq>" +
                    "<Eq>" +
                    "<FieldRef Name='ReportType'/><Value Type='Text'>"+theType+"</Value></Eq>" +
                    "</And>" +
                //   "<Gt>" +
                //   "<FieldRef Name='ID'/><Value Type='Number'>"+id+"</Value>" +
                // "</Gt>" +
                "</Where>" +
                "<OrderBy>" +
                  "<FieldRef Name='Form_x0020_Groups'/>" +
                "</OrderBy>" +
              "</Query>";

    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Title' />" +
      "<FieldRef Name='Path' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='listItemId' />" +
      "<FieldRef Name='PublishDate' />" +
      "<FieldRef Name='ID' />" +
      "<FieldRef Name='Status' />" +
      "<FieldRef Name='Owner' />" +
      "<FieldRef Name='Recipients' />" +
      "<FieldRef Name='Description' />" +
      "</ViewFields>";
    $().SPServices({
      operation: method,
      async: false,
      listName: list,
      CAMLViewFields: fieldsToRead,
      CAMLQuery: query,
      CAMLRowLimit: "10",
      completefunc: function(xData, Status) {
          $('.load_more_box').show();
        $('.load_more_reports').text('Load More Reports');
        $(xData.responseXML).SPFilterNode("z:row").each(function() {

          var name = ($(this).attr("ows_Title")); //name
          var path = ($(this).attr("ows_Path")); //path
          var department = ($(this).attr("ows_Department")); //department
          var report_type = ($(this).attr("ows_ReportType")); //report type
          var pub_date = ($(this).attr("ows_PublishDate")); //pub date
          var listItemId = ($(this).attr("ows_listItemId")); //listItemId
          var itemID = ($(this).attr("ows_ID")); //listItemId
          var itemStatus = ($(this).attr("ows_Status")); //listItemId
          var owner = ($(this).attr("ows_Owner")); //listItemId
          var itemRecipients = ($(this).attr("ows_Recipients")); //Recipients
          var itemDescription = ($(this).attr("ows_Description")); //description
          $('.load_more_reports').attr('id', itemID);
          $('.load_more_reports').attr('data-type', report_type);
          $('.load_more_reports').attr('data-department', department);

          displayList(name, department, report_type, listItemId, report_type, pub_date, path, itemID, itemStatus, owner, itemRecipients, itemDescription);

        });
      }
    });
  }










  //get reports list callback
  GetReports('1133');
  //get reports function / sp services call
  function GetReports(position) {
    $('.load_more_box').show();
    var list = "TestList";
    var method = "GetListItems";
    var id = position;
    // console.log(id);d
    var query = "<Query>" +
                "<Where>" +
                  "<Gt>" +
                  "<FieldRef Name='ID'/><Value Type='Number'>"+id+"</Value>" +
                "</Gt>" +
                "</Where>" +
                "<OrderBy>" +
                  "<FieldRef Name='Form_x0020_Groups'/>" +
                "</OrderBy>" +
              "</Query>";

    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Title' />" +
      "<FieldRef Name='Path' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='listItemId' />" +
      "<FieldRef Name='PublishDate' />" +
      "<FieldRef Name='ID' />" +
      "<FieldRef Name='Status' />" +
      "<FieldRef Name='Owner' />" +
      "<FieldRef Name='Recipients' />" +
      "<FieldRef Name='Description' />" +
      "</ViewFields>";
    $().SPServices({
      operation: method,
      async: false,
      listName: list,
      CAMLViewFields: fieldsToRead,
      CAMLQuery: query,
      // viewName: "QueryView",
      CAMLRowLimit: "10",
      completefunc: function(xData, Status) {
          $('.load_more_box').show();
        $('.load_more_reports').text('Load More Reports');
        $(xData.responseXML).SPFilterNode("z:row").each(function() {

          var name = ($(this).attr("ows_Title")); //name
          var path = ($(this).attr("ows_Path")); //path
          var department = ($(this).attr("ows_Department")); //department
          var report_type = ($(this).attr("ows_ReportType")); //report type
          var pub_date = ($(this).attr("ows_PublishDate")); //pub date
          var listItemId = ($(this).attr("ows_listItemId")); //listItemId
          var itemID = ($(this).attr("ows_ID")); //listItemId
          var itemStatus = ($(this).attr("ows_Status")); //listItemId
          var owner = ($(this).attr("ows_Owner")); //listItemId
          var itemRecipients = ($(this).attr("ows_Recipients")); //Recipients
          var itemDescription = ($(this).attr("ows_Description")); //description
          // console.log(itemDescription);
          // console.log(itemRecipients);
          // console.log(owner);
          $('.load_more_reports').attr('id', itemID);
          $('.load_more_reports').attr('data-type', report_type);
          $('.load_more_reports').attr('data-department', department);
          displayList(name, department, report_type, listItemId, report_type, pub_date, path, itemID, itemStatus, owner, itemRecipients, itemDescription);

        });
      }
    });
  }

  function displayList(name, department, report_type, listItemId, report_type, pub_date, path, itemID, itemStatus, owner, itemRecipients, itemDescription) {


    if(typeof itemDescription === 'undefined' || itemDescription === ''){
      itemDescription = "No description provided, contact owner to update description.";
    }
    // console.log(itemDescription);

    var thePath = path;
    var folder = path;
    $().SPServices({
        operation: "GetListItems",
        async: false,
        webURL: "https://thegolubcorporation.sharepoint.com/sites/MYReports/",
        listName: department,
        CAMLViewFields: "<ViewFields Properties='True' />",
        CAMLQueryOptions: "<QueryOptions><Folder>" + folder + "</Folder><ViewAttributes Scope='FilesOnly'></ViewAttributes></QueryOptions>",
        CAMLRowLimit: "1",
        CAMLQuery: "<Query><Where><Neq><FieldRef Name='ID'/><Value Type='Number'>0</Value></Neq></Where><OrderBy><FieldRef Name='ReportDate' Ascending='False'/></OrderBy></Query>",
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function () {
                path = "https://thegolubcorporation.sharepoint.com/"+$(this).attr("ows_FileRef").split(';#')[1];
                var name = $(this).attr("ows_FileLeafRef").split(';#')[1];
                name = name.split('.')[0];
            });
        }
    });

    // var str = path;
    // var lastThree = str.substr(str.length - 3);
    // lastThree = lastThree.toLowerCase();
    var reportImg;
    reportImg = "https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf_icon.png";
    if(path.indexOf('xlsx') > -1)
    {
      path = path + "?d=w6588b1b59ce14bc2bfb2d2050a09a479";
      reportImg = "https://s1-odc-15.cdn.office.net:443/start/sc/1666042226_resources\\favicon_excel.ico";
    }


    var pictureName = owner.replace(/\s/g, '').toLowerCase();
    var ownersName = owner;
    var myPicture = 'https://thegolubcorporation-my.sharepoint.com/User%20Photos/Profile%20Pictures/' + pictureName + '_golub_com_MThumb.jpg';
    var theUsersLink = pictureName;

    var pChopEmail = pictureName + '@pricechopper.com';
    var golubEmail = pictureName + '@golub.com';


    $('.table-responsive tbody').append('<tr class="this_title_wrap"><td class="report_img report_img_list"  id="' + path + '" style="text-align:center;"><img src="'+reportImg+'" alt="pdf" /></td><td class="this_title"><a href="' + path + '" target="blank"><div class="reports_open"><div>' + name + '</div></div></a></td><td><div class="report_version report_version_list" id="' + thePath + '" data-department="' + department + '"><a href="#" data-toggle="tooltip" title="History"><i class="fa fa-folder-o"></i></a></div></td><td><a href="sip:'+theUsersLink+'@golub.com"><span class="the_owner">' + owner + '</span></a></td><td class="list_department">' + department + '</td><td>' + itemDescription + '</td><td class=""><div class="reports_share" id="' + itemID + '"><div class="open_share_dialog" data-id="'+itemID+'">Share</div></div></td><td><div class="reports_shared_with" id="' + owner + '" data-recipients="' + itemRecipients + '"><div>Recipients</div></div></td></tr>');

    $('.report_row').append('<div class="col-lg-15 main_select active_report active_report_1 report_1"><div class="icon_box right_icon_box_'+ itemID + '" data-id="'+ itemID + '" data-title="' + name + '"></div><div class=""><div class="item_title this_title_wrap" data-type="' + department + '"><div class="report_owner publish_content row"><div class="col-xs-3"><div class="reports_user_img publish_box user_img_'+ itemID + '"><img src="' + myPicture + '"></div></div><div class="col-xs-9"><div class="owner_p row"><p><span class="the_owner the_owner_'+ itemID + '">' + ownersName + '</span></p></div><div class="row the_actions"><div class="col-xs-3"><a class="sip_'+ itemID + '" href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-comment"></i></a></div><div class="col-xs-3"><a class="sip_'+ itemID + '" href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-phone"></i></a></div><div class="col-xs-3"><a class="sip_'+ itemID + '" href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-video-camera"></i></a></div><div class="col-xs-3"><a href="mailto:'+pChopEmail+'"><i class="fa fa-envelope"></i></a></div></div></div></div><p class="report_name this_title">' + name + '</p><div class="report_version" id="' + thePath + '" data-department="' + department + '"><a href="#" data-toggle="tooltip" title="History"><i class="fa fa-folder-o"></i></a></div><div class="report_img" id="' + path + '"><img src="'+reportImg+'" alt="pdf" /><br><i>Hover for preview.</i><div class="pdf_preview"><iframe src="" download></iframe></div></div><div><p class="report_dep">' + department + '</p><p class="report_desc">' + report_type + '</p></div><a href="' + path + '" target="blank"><div class="reports_open"><div><i class="left_icon fa fa-folder-open"></i> Open</div></div></a><div class="reports_description"><div class="desc_float"><div class="arrow-bottom"></div><p id="item_desc_'+itemID+'">'+itemDescription+'</p></div><div><i class="left_icon fa fa-commenting"></i> Description</div></div><div class="reports_share" id="' + itemID + '"><div class="open_share_dialog" data-id="'+itemID+'"><span class="left_icon glyphicon glyphicon-share" aria-hidden="true"></span> Share</div></div><div class="reports_shared_with" id="' + owner + '" data-recipients="' + itemRecipients + '"><div><i class="left_icon fa fa-users"></i> Recipients</div></div></div></div></div>');

    // itemRecipients = itemRecipients.replace(/#/g, '').replace(/;/g, '').replace(/[0-9]/g, '');
    itemRecipients = itemRecipients.replace(/;/g, '');
    itemRecipients = itemRecipients.split("#");

    // console.log(itemRecipients);
  var theseRecipients = '';


// https://thegolubcorporation-my.sharepoint.com/_layouts/15/me.aspx?u=40f8b45f-ee26-4d80-b23a-d5088bb9bd50&p=jesserock%40golub.com&v=work
    $('body').prepend('<div class="share_this_one share_this_one_'+itemID+'"><h2 class="share_this_one_h2">Share \''+name+'\'</h2><p class="share_this_one_p"><i class="left_icon fa fa-users"></i> Shared with <span class="theseRecipients theseRecipients_'+itemID+'"></span></p><h1 class="share_this_one_h1">Invite People</h1><input type="text" style="padding:10px;width:100%;" placeholder="Enter names or email addresses.."><div id="my_people_picker"></div><br><br><select style="padding:10px;width:100%;"><option>Can edit</option><option>Can view</option></select><br><br><textarea placeholder="Include a personal message with this invitation (optional)." style="padding:10px;width:100%;"></textarea><br><br><div id="cancel_report_share">Cancel</div><div id="share_report">Share</div> <div id="peoplePickerDiv"></div><div><br/><input type="button" value="Get User Info" onclick="getUserInfo()"></input><br/><h1>User info:</h1><p id="resolvedUsers"></p><h1>User keys:</h1><p id="userKeys"></p> <h1>User ID:</h1><p id="userId"></p></div></div>');

    for(var i = 1;i < itemRecipients.length ;i = i + 2){
      // var theseRecipients = itemRecipients[i].split(',');
      var linkName = itemRecipients[i];
      linkName = linkName.split(", ");
      linkName = linkName[1] + linkName[0];
      $('.theseRecipients_'+itemID).append('<a href="https://thegolubcorporation-my.sharepoint.com/_layouts/15/me.aspx?u=40f8b45f-ee26-4d80-b23a-d5088bb9bd50&p='+linkName+'%40golub.com&v=work" target="blank"><div class="theseRecipientsWrap">[' + itemRecipients[i] + ']</div></a>');
      // theseRecipients = theseRecipients + ' | '+ itemRecipients[i];
    }
// <div class="arrow-bottom"></div>
    var first = $().SPServices.SPGetCurrentUser({
                    fieldName: "FirstName",
                    debug: false
                });
    var last = $().SPServices.SPGetCurrentUser({
                   fieldName: "LastName",
                   debug: false
               });

    var checkName = first + ' ' + last;
    checkName = checkName.toUpperCase();
    //
    // console.log(ownersName.toUpperCase());
    // console.log(checkName);
    if(ownersName.toUpperCase() === checkName){
      $('.right_icon_box_' + itemID).html('<i class="right_icon fa fa-edit"></i>');
    }


    $(document).ready(function()
        {
            // $("#reports_table").tablesorter();

            $('.my_reports_button, .footer_my h2').text('My Reports');
            $('.loadingThis, .loadingThisList').hide();
            $('nav').removeClass('open_nav');
            $('.menu_options').slideUp();
            $('.menu_active').show();
            $('.menu_close').removeClass('menu_close_open');
            $('.menu_button span').removeClass('rotate_item');
            $('.menu_button').removeClass('active_menu');
            $('.social_contents').slideUp(100);
            $('.social_box span').removeClass('rotate_item');
            $('.social_box').removeClass('active_menu');
            // countDisplayedReports();
        }
    );


  }
  // sp services end




  $('.load_more_reports_catalog').on('click', function(){
    var position = $(this).attr('id');
    $('.load_more_reports_catalog').text('Loading...');
    var thisDepartment = $(this).attr('data-department');
    setTimeout(function(){


      GetReportsUnfiltered(position, thisDepartment);
    }, 100);

  });


  function GetReportsUnfiltered(position, thisDepartment) {

    var myCounter = 0;

    var deptCounter = 0;

    var list = "TestList";
    var method = "GetListItems";
      var id = position;
    // console.log(thisDepartment);
    var query = "<Query>" +
                "<Where>" +
                  "<And>" +
                  "<Eq>" +
                  "<FieldRef Name='Department'/><Value Type='Text'>"+thisDepartment+"</Value>" +
                "</Eq>" +
                "<Gt>" +
                "<FieldRef Name='ID'/><Value Type='Number'>"+id+"</Value>" +
              "</Gt>" +
                "</And>" +
                "</Where>" +

                "<OrderBy>" +
                  "<FieldRef Name='Title'/>" +
                "</OrderBy>" +
              "</Query>";


    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Title' />" +
      "<FieldRef Name='Path' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='listItemId' />" +
      "<FieldRef Name='PublishDate' />" +
      "<FieldRef Name='Status' />" +
      "<FieldRef Name='ID' />" +
      "<FieldRef Name='Owner' />" +
      "<FieldRef Name='Description' />" +
      "</ViewFields>";
    $().SPServices({
      operation: method,
      async: true,
      listName: list,
      CAMLViewFields: fieldsToRead,
      CAMLQuery: query,
      // viewName: "QueryView",
      CAMLRowLimit: "10",
      completefunc: function(xData, Status) {
        $('.load_more_reports_catalog').text('Load More Reports');
        $(xData.responseXML).SPFilterNode("z:row").each(function() {
          var name = ($(this).attr("ows_Title")); //name
          var department = ($(this).attr("ows_Department")); //Department
          var report_type = ($(this).attr("ows_ReportType")); //report type
          var path = ($(this).attr("ows_Path")); //created
          var pub_date = ($(this).attr("ows_PublishDate")); //pub date
          var status = ($(this).attr("ows_Status")); //pub date
          var itemID = ($(this).attr("ows_ID")); //pub date
          var owner = ($(this).attr("ows_Owner")); //pub date
          var itemDescription = ($(this).attr("ows_Description"));

          $('.load_more_reports').attr('data-type', report_type);
          $('.load_more_reports').attr('data-department', department);

$('.load_more_reports_catalog').attr('id', itemID);
$('.load_more_reports_catalog').attr('data-department', department);


                      var checkIt = department.replace(/\s/g, '');
                      checkIt = checkIt.toLowerCase();
                      // console.log(checkIt);
                      // console.log(thisDepartment);
                      if(checkIt === thisDepartment){
                        deptCounter++;
                      }
          var listItemId = ($(this).attr("ows_listItemId")); //listItemId
          myCounter++;
          displayListUnfiltered(name, department, report_type, listItemId, report_type, status, itemID, path, owner, thisDepartment);
  console.log(myCounter);
          if(myCounter >= 12){
              $('.load_more_reports_catalog').show();
          }
        });



        // if(deptCounter === 0)
        // {
        //   GetReportsUnfiltered();
        //   return;
        // }

      }
    });
  }



  function displayListUnfiltered(name, department, report_type, listItemId, report_type, status, itemID, path, owner, thisDepartment, itemDescription) {



    if(typeof itemDescription === 'undefined' || itemDescription === ''){
      itemDescription = "No description provided, contact owner to update description.";
    }

    var checkThisDept = department.toLowerCase();
    checkThisDept = checkThisDept.replace(/\s/g, '');
    thisDepartment = thisDepartment.toLowerCase();
      thisDepartment = thisDepartment.replace(/\s/g, '');
    console.log(checkThisDept);
    console.log(thisDepartment);
    if(checkThisDept === thisDepartment)
    {
        // var str = path;
        // var lastThree = str.substr(str.length - 3);
        // lastThree = lastThree.toLowerCase();



        var reportImg;
        reportImg = "https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf_icon.png";
        if(path.indexOf('xlsx') > -1)
        {
          path = path + "?d=w6588b1b59ce14bc2bfb2d2050a09a479";
          reportImg = "https://s1-odc-15.cdn.office.net:443/start/sc/1666042226_resources\\favicon_excel.ico";
        }

          var pictureName = owner.replace(/\s/g, '').toLowerCase();
          var ownersName = owner;
          var myPicture = 'https://thegolubcorporation-my.sharepoint.com/User%20Photos/Profile%20Pictures/' + pictureName + '_golub_com_MThumb.jpg';



          var theUsersLink = pictureName;

          var pChopEmail = pictureName + '@pricechopper.com';
          var golubEmail = pictureName + '@golub.com';





          $('.table-responsive tbody').append('<tr class="this_title_wrap"><td class="pdf_td" style="text-align:center;"><img src="'+reportImg+'" alt="pdf" /></td><td class="this_title" id="">' + name + '</td><td>' + owner + '</td><td class="list_department">' + department + '</td><td>' + itemDescription + '</td><td class=""><div class="reports_request"><div class="request_wrap"><div class="request_sent ' + itemID + '_sent">Request Sent!</div><div id= "' + itemID + '" class="request_access ' + itemID + '_request"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></td></tr>');



          // $('.table-responsive tbody').append('<tr class="this_title_wrap"><td class="report_img report_img_list"  id="' + path + '" style="text-align:center;"><img src="'+reportImg+'" alt="pdf" /></td><td class="this_title"><a href="' + path + '" target="blank"><div class="reports_open"><div>' + name + '</div></div></a></td><td><div class="report_version report_version_list" id="' + thePath + '" data-department="' + department + '"><a href="#" data-toggle="tooltip" title="History"><i class="fa fa-folder-o"></i></a></div></td><td><a href="sip:'+theUsersLink+'@golub.com"><span class="the_owner">' + owner + '</span></a></td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class=""><div class="reports_share" id="' + itemID + '"><div class="open_share_dialog" data-id="'+itemID+'">Share</div></div></td><td><div class="reports_shared_with" id="' + owner + '" data-recipients="' + itemRecipients + '"><div>Recipients</div></div></td></tr>');



            $('.report_row').append('<div class="col-lg-15 main_select active_report active_report_1 report_1"><div class="icon_box right_icon_box_'+ itemID + '" data-id="'+ itemID + '" data-title="' + name + '"></div><div class=""><div class="item_title this_title_wrap" data-type="' + department + '"><div class="report_owner publish_content row"><div class="col-xs-3"><div class="reports_user_img publish_box"><img src="' + myPicture + '"></div></div><div class="col-xs-9"><div class="owner_p row"><p><span class="the_owner">' + ownersName + '</span></p></div><div class="row the_actions"><div class="col-xs-3"><a href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-comment"></i></a></div><div class="col-xs-3"><a href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-phone"></i></a></div><div class="col-xs-3"><a href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-video-camera"></i></a></div><div class="col-xs-3"><a href="mailto:'+pChopEmail+'"><i class="fa fa-envelope"></i></a></div></div></div></div><p class="report_name this_title">' + name + '</p><p class="report_dep">' + department + '</p><div class="desc_float"><div class="arrow-bottom"></div><p id="item_desc_'+itemID+'">'+itemDescription+'</p></div><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><div><p class="report_desc">' + report_type + '</p></div></a><div class="reports_description"><div class="desc_float"><div class="arrow-bottom"></div><p>Here is a test description for this report.  This reports is about this for this department and created by this person. TEST DATA</p></div><div><i class="left_icon fa fa-commenting"></i> Description </div></div><div class="reports_request"><div class="request_wrap"><div class="request_sent ' + itemID + '_sent">Request Sent!</div><div id= "' + itemID + '" class="request_access ' + itemID + '_request"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></div></div></div>');

            var first = $().SPServices.SPGetCurrentUser({
                            fieldName: "FirstName",
                            debug: false
                        });
            var last = $().SPServices.SPGetCurrentUser({
                           fieldName: "LastName",
                           debug: false
                       });

            var checkName = first + ' ' + last;
            checkName = checkName.toUpperCase();

            console.log(ownersName.toUpperCase());
            console.log(checkName);
            if(ownersName.toUpperCase() === checkName){
              $('.right_icon_box_' + itemID).html('<i class="right_icon fa fa-edit"></i>');
            }



            var user_name = first + "_" + last;
            // console.log(user_name);
            // console.log(status);
            var statusContaines = status.indexOf(user_name) > -1;
            // console.log(statusContaines);
            if(statusContaines === true){
              $('.' + itemID + '_request').hide();
              $('.' + itemID + '_sent').show();

            }else{
              $('.' + itemID + '_request').show();
              $('.' + itemID + '_sent').hide();

            }
        $(document).ready(function()
        {
            // $("#reports_table").tablesorter();
            var newTitle = thisDepartment.charAt(0).toUpperCase() + thisDepartment.slice(1);
            $('.' + thisDepartment).text(newTitle);
            $('nav').removeClass('open_nav');
            $('.menu_options').slideUp();
            $('.menu_active').show();
            $('.menu_close').removeClass('menu_close_open');
            $('.loadingThis, .loadingThisList').hide();


            $('.menu_button span').removeClass('rotate_item');
            $('.menu_button').removeClass('active_menu');
            $('.social_contents').slideUp(100);
            $('.social_box span').removeClass('rotate_item');
            $('.social_box').removeClass('active_menu');
            // countDisplayedReports();
        }
        );
    }
    // $('.load_more_reports_catalog').show();
  }
  //Reports catalog build
  $('.active_dept_link').on('click', function(){
      $('.load_more_reports').hide();
      $('.load_more_reports_catalog').show();

    $('.reset_search').hide();
    $('.th_shared_with').hide();
    $('.main_wrapper').scrollTop(0);
    $('.icon_box_box').slideUp(100);
    $(this).removeClass('active_dept_link');
    var thisDepartment = $(this).attr('class');
    var newTitle = thisDepartment.charAt(0).toUpperCase() + thisDepartment.slice(1);
    newTitle = newTitle.replace(/-/g, ' ');
    newTitle = newTitle.split(" ");

    if(typeof newTitle[1] === 'undefined')
    {
        newTitle = newTitle[0];
    }else{
        newTitle = newTitle[0] + ' ' + newTitle[1].charAt(0).toUpperCase() + newTitle[1].slice(1);
    }


    console.log(thisDepartment);
    console.log(newTitle);
    $('.gen_info h2').text(newTitle);
    $('.' + thisDepartment).text('Loading...');
    $('.inner_icon_box, .table-responsive tbody').empty();
    $('.inner_icon_box').html("<div class='loadingThis'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");
    $('.table-responsive').append("<div class='loadingThisList'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");

    setTimeout(function(){

      GetReportsUnfiltered('1133', newTitle);



    }, 150);
  });


// following code for scroll buttons on mobile list view
  $('.scroll_down').on({
      'mousedown touchstart': function () {
          $(".main_wrapper").animate({
              scrollTop: $(".main_wrapper")[0].scrollHeight
          }, 2000);
      },
      'mouseup touchend': function () {
          $(".main_wrapper").stop(true);
      }
  });
  $('.scroll_right').on({
      'mousedown touchstart': function () {
        var leftPos = $('.table-responsive').scrollLeft();
          $(".table-responsive").animate({
              scrollLeft: leftPos + 200}, 300);
      },
      'mouseup touchend': function () {
          $(".table-responsive").stop(true);
      }
  });
  $('.scroll_up').on({
      'mousedown touchstart': function () {
              $(".main_wrapper").animate({scrollTop: 0}, 2000);
      },
      'mouseup touchend': function () {
          $(".main_wrapper").stop(true);
      }
  });
  $('.scroll_left').on({
      'mousedown touchstart': function () {
        var leftPos = $('.table-responsive').scrollLeft();
          $(".table-responsive").animate({
              scrollLeft: leftPos - 200}, 300);
      },
      'mouseup touchend': function () {
          $(".table-responsive").stop(true);
      }
  });

  //click to sort table search callout
  $('.table_top').on('click', function(){
    $('.search_callout').show();

  });

  //hide search callout
  $('.search_callout, .reports_share, .reports_open, nav, .rep_cat, .icon_box_box, .reports_request, .request_sent').on({
    'mouseenter click': function () {
      $('.search_callout').hide();
    }
  });

  $('.version_calender_view').on('click', function(){
    $('.version_box_inner').hide();
    $('.version_box_inner_2').show();
    $('.version_calender_view').addClass('version_selected');
    $('.version_list_view').removeClass('version_selected');

    // buildCalender(curMonth, monthNames[monthIndex], day);
  });
  $('.version_list_view').on('click', function(){
    $('.version_box_inner').show();
    $('.version_box_inner_2').hide();
    $('.version_calender_view').removeClass('version_selected');
    $('.version_list_view').addClass('version_selected');
  });









  var curDate = (new Date()).getDate();
  var curMonth = (new Date()).getMonth();
  var curYear = (new Date()).getFullYear();
  var startDay = (new Date(curYear, curMonth, 1)).getDay();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var noofdays = ["31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
  var prevMonth = noofdays[curMonth - 1];





  $('.cal-back').on('click', function(){
    $('.all-date ul').empty();
    curMonth = curMonth - 1;
    if(curMonth === 12){
      curMonth = 0;
      curYear = curYear + 1;
    }
    if(curMonth === -1){
      curMonth = 11;
      curYear = curYear - 1;
    }
      buildCalender(curMonth, '', '');
  });
  $('.cal-forward').on('click', function(){
    $('.all-date ul').empty();
    curMonth = curMonth + 1;
    if(curMonth === 12){
      curMonth = 0;
      curYear = curYear + 1;
    }
    if(curMonth === -1){
      curMonth = 11;
      curYear = curYear - 1;
    }
      buildCalender(curMonth, '', '');
  });



  function buildCalender(curMonth, theMonth, theDay){

    jQuery('.all-date ul').empty();

    var myCalenderData = $('.version_calender_view').attr('data-info');
    myCalenderData = myCalenderData.split(',');
    // console.log(myCalenderData);





    if (curMonth == 11) {
      prevMonth = noofdays[0]
    } else if (curMonth == 0) {
      prevMonth = noofdays[11]
    };
    var totalDays = noofdays[curMonth];
    var counter = 0;
    var precounter = prevMonth - (startDay - 1);
    var rightbox = 6;
    var flag = true;

    jQuery('.curr-month b').text(months[curMonth] + ' ' + curYear);

    for (var i = 0; i < 42; i++) {
      if (i >= startDay) {
        counter++;
        if (counter > totalDays) {
          counter = 1;
          flag = false;
        }
        if (flag == true) {
          jQuery('.all-date ul').append('<li class="monthdate" data-day="' + counter + '">' + counter + '</li>');
        } else {
          jQuery('.all-date ul').append('<li style="opacity:.8">' + counter + '</li>');
        }
      } else {
        jQuery('.all-date ul').append('<li style="opacity:.8">' + precounter + '</li>');
        precounter++;
      }

      if (i == rightbox) {
        jQuery(jQuery('.all-date ul li')[rightbox]).addClass("b-right");
        rightbox = rightbox + 7;
      }

      if (i > 34) {
        jQuery(jQuery('.all-date ul li')[i]).addClass("b-bottom");
      }

      if ((jQuery(jQuery('.all-date ul li')[i]).text() == curDate) && (jQuery(jQuery('.all-date ul li')[i]).css('opacity') == 1)) {
        jQuery(jQuery('.all-date ul li')[i]).css({
          "background-color": "rgb(37, 31, 33)",
          "color": "#fff"
        });
      }
    }


    // if(theMonth === months[curMonth]){

      var calenderInfoLength = myCalenderData.length;
      for(var i = 0; i < calenderInfoLength;i++){

        var newCalenderData = myCalenderData[i].split(' ');
        // console.log(newCalenderData);
        var calenderMonth = newCalenderData[1];
        var calenderDay = newCalenderData[2];
        var calenderURL = newCalenderData[3];

        // console.log(calenderMonth);
        // console.log(months[curMonth]);


        var calenderImg;
        calenderImg = "https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf_icon.png";
        // if(calenderURL.indexOf('xlsx') > -1)
        // {
        //
        //   calenderImg = "https://s1-odc-15.cdn.office.net:443/start/sc/1666042226_resources\\favicon_excel.ico";
        // }

        if(calenderMonth === months[curMonth]){
          console.log('yep');
          $('li[data-day="'+ calenderDay +'"]').append('<br><a href="'+calenderURL+'" target="blank"><img src="'+calenderImg+'"></a>');
        }
      }


    // }


  }













    function GetReportsBySubCats(position, thisDepartment) {

      var deptCounter = 0;

      var list = "TestList";
      var method = "GetListItems";
        var id = position;
      // console.log(thisDepartment);
      var query = "<Query>" +
                  "<Where>" +
                    "<And>" +
                    "<Eq>" +
                    "<FieldRef Name='Department'/><Value Type='Text'>"+thisDepartment+"</Value>" +
                  "</Eq>" +
                  "<Gt>" +
                  "<FieldRef Name='ID'/><Value Type='Number'>"+id+"</Value>" +
                "</Gt>" +
                  "</And>" +
                  "</Where>" +

                  "<OrderBy>" +
                    "<FieldRef Name='Title'/>" +
                  "</OrderBy>" +
                "</Query>";


      var fieldsToRead = "<ViewFields>" +
        "<FieldRef Name='Title' />" +
        "<FieldRef Name='Path' />" +
        "<FieldRef Name='Department' />" +
        "<FieldRef Name='ReportType' />" +
        "<FieldRef Name='listItemId' />" +
        "<FieldRef Name='PublishDate' />" +
        "<FieldRef Name='Status' />" +
        "<FieldRef Name='ID' />" +
        "<FieldRef Name='Owner' />" +
        "</ViewFields>";
      $().SPServices({
        operation: method,
        async: true,
        listName: list,
        CAMLViewFields: fieldsToRead,
        CAMLQuery: query,
        CAMLRowLimit: "10",
        completefunc: function(xData, Status) {
          $('.load_more_reports_catalog').text('Load More Reports');
          $(xData.responseXML).SPFilterNode("z:row").each(function() {
            var name = ($(this).attr("ows_Title")); //name
            var department = ($(this).attr("ows_Department")); //Department
            var report_type = ($(this).attr("ows_ReportType")); //report type
            var path = ($(this).attr("ows_Path")); //created
            var pub_date = ($(this).attr("ows_PublishDate")); //pub date
            var status = ($(this).attr("ows_Status")); //pub date
            var itemID = ($(this).attr("ows_ID")); //pub date
            var owner = ($(this).attr("ows_Owner")); //pub date
  $('.load_more_reports_catalog').attr('id', itemID);
  $('.load_more_reports_catalog').attr('data-department', department);


                        var checkIt = department.replace(/\s/g, '');
                        checkIt = checkIt.toLowerCase();
                        // console.log(checkIt);
                        // console.log(thisDepartment);
                        if(checkIt === thisDepartment){
                          deptCounter++;
                        }
            var listItemId = ($(this).attr("ows_listItemId")); //listItemId
            displayListUnfiltered(name, department, report_type, listItemId, report_type, status, itemID, path, owner, thisDepartment);
          });



          // if(deptCounter === 0)
          // {
          //   GetReportsUnfiltered();
          //   return;
          // }

        }
      });
    }



    function displayReportsBySubCat(name, department, report_type, listItemId, report_type, status, itemID, path, owner, thisDepartment) {

      var checkThisDept = department.toLowerCase();
      checkThisDept = checkThisDept.replace(/\s/g, '');
      thisDepartment = thisDepartment.toLowerCase();
        thisDepartment = thisDepartment.replace(/\s/g, '');
      console.log(checkThisDept);
      console.log(thisDepartment);
      if(checkThisDept === thisDepartment)
      {
          // var str = path;
          // var lastThree = str.substr(str.length - 3);
          // lastThree = lastThree.toLowerCase();


            var pictureName = owner.replace(/\s/g, '').toLowerCase();
            var ownersName = owner;
            var myPicture = 'https://thegolubcorporation-my.sharepoint.com/User%20Photos/Profile%20Pictures/' + pictureName + '_golub_com_MThumb.jpg';



            var theUsersLink = pictureName;

            var pChopEmail = pictureName + '@pricechopper.com';
            var golubEmail = pictureName + '@golub.com';





            $('.table-responsive tbody').append('<tr class="this_title_wrap"><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></td><td class="this_title" id="">' + name + '</td><td>' + owner + '</td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class=""><div class="reports_request"><div class="request_wrap"><div class="request_sent ' + itemID + '_sent">Request Sent!</div><div id= "' + itemID + '" class="request_access ' + itemID + '_request"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></td></tr>');



              $('.report_row').append('<div class="col-lg-15 main_select active_report active_report_1 report_1"><div class=""><div class="item_title this_title_wrap" data-type="' + department + '"><div class="report_owner publish_content row"><div class="col-xs-3"><div class="reports_user_img publish_box"><img src="' + myPicture + '"></div></div><div class="col-xs-9"><div class="owner_p row"><p><span class="the_owner">' + ownersName + '</span></p></div><div class="row the_actions"><div class="col-xs-3"><a href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-comment"></i></a></div><div class="col-xs-3"><a href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-phone"></i></a></div><div class="col-xs-3"><a href="sip:'+theUsersLink+'@golub.com"><i class="fa fa-video-camera"></i></a></div><div class="col-xs-3"><a href="mailto:'+pChopEmail+'"><i class="fa fa-envelope"></i></a></div></div></div></div><p class="report_name this_title">' + name + '</p><p class="report_dep">' + department + '</p><div class="desc_float"><div class="arrow-bottom"></div><p>Here is a test description for this report.  This reports is about this for this department and created by this person. TEST DATA</p></div><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><div><p class="report_desc">' + report_type + '</p></div></a><div class="reports_request"><div class="request_wrap"><div class="request_sent ' + itemID + '_sent">Request Sent!</div><div id= "' + itemID + '" class="request_access ' + itemID + '_request"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></div></div></div>');

              var first = $().SPServices.SPGetCurrentUser({
                              fieldName: "FirstName",
                              debug: false
                          });
              var last = $().SPServices.SPGetCurrentUser({
                             fieldName: "LastName",
                             debug: false
                         });

              var checkName = first + ' ' + last;
              checkName = checkName.toUpperCase();

              console.log(ownersName.toUpperCase());
              console.log(checkName);
              if(ownersName.toUpperCase() === checkName){
                $('.right_icon_box_' + itemID).html('<i class="right_icon fa fa-edit"></i>');
              }

              var user_name = first + "_" + last;
              // console.log(user_name);
              // console.log(status);
              var statusContaines = status.indexOf(user_name) > -1;
              // console.log(statusContaines);
              if(statusContaines === true){
                $('.' + itemID + '_request').hide();
                $('.' + itemID + '_sent').show();

              }else{
                $('.' + itemID + '_request').show();
                $('.' + itemID + '_sent').hide();

              }
          $(document).ready(function()
          {
              // $("#reports_table").tablesorter();
              var newTitle = thisDepartment.charAt(0).toUpperCase() + thisDepartment.slice(1);
              $('.' + thisDepartment).text(newTitle);
              $('nav').removeClass('open_nav');
              $('.menu_options').slideUp();
              $('.menu_active').show();
              $('.menu_close').removeClass('menu_close_open');
              $('.loadingThis, .loadingThisList').hide();


              $('.menu_button span').removeClass('rotate_item');
              $('.menu_button').removeClass('active_menu');
              $('.social_contents').slideUp(100);
              $('.social_box span').removeClass('rotate_item');
              $('.social_box').removeClass('active_menu');
              // countDisplayedReports();
          }
          );
      }
      $('.load_more_reports_catalog').show();
    }




















    $(document).on('click', '.type_choice', function(){





$('.load_more_reports').addClass('load_more_specific');






      $('.reset_search').hide();
      var theDept = $(this).text();
      var theDeptClass = theDept.replace(/-/g, '');
      var theDeptLower = theDeptClass.toLowerCase();
      var theDeptType = theDept.replace(/-/g, ' ');
      console.log(theDeptType);

      if(window.innerWidth < 721)
      {
        $('.icon_box_nav_bar').slideToggle();
        $('.mobile_icon_nav_bar span').removeClass('rotate_item');
      }

      $('.all_dept').removeClass('selected_item');
      $('.all_list, .type_choice').removeClass('selected_item');

      $('.load_more_box').hide();
      console.log(theDeptLower);
      $('.cat_choice').removeClass('selected_item');
      $('.' + theDeptLower + '_list_item').toggleClass('selected_item');
      $('.reset_search').hide();
      $('.th_shared_with').show();
      $('.main_wrapper').scrollTop(0);
      $('.my_reports_button, .footer_my h2').text('Loading...');
      $('.gen_info h2').text('My Reports');
      $('.icon_box_box').slideDown(100);
      $('.inner_icon_box, .table-responsive tbody').empty();
      $('.inner_icon_box').html("<div class='loadingThis'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");
      $('.table-responsive').append("<div class='loadingThisList'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");



      setTimeout(function(){
        GetReportsFilteredByType('1133', theDeptType);
      },200);








    });














});
