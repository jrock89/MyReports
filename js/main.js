// Author: Jesse Rock
// Date: 10/28/2015

$(document).ready(function() {

  // window ready hide loader
  $(window).load(function() {
    $('.loader').hide();
  });

  // grab todays date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = mm + '/' + dd + '/' + yyyy;
  //build title with todays date
  $('title').text("My Reports | " + today);


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

  $(document).on('click', '.all_dept', function(){
    $('.cat_choice, .type_choice, .all_list').removeClass('selected_item');
    $('.all_dept').addClass('selected_item');
    $('tbody tr, .active_report').show();

    if(window.innerWidth < 721)
    {
      $('.icon_box_nav_bar').slideToggle();
      $('.mobile_icon_nav_bar span').removeClass('rotate_item');
    }

    countDisplayedReports();
  });

  //list items
  $(document).on('click', '.type_choice', function(){
    var theDept = $(this).text();
    theDeptClass = theDept.replace(/\s/g, '');
    var theDeptLower = theDeptClass;
    // console.log(theDeptLower);

    if(window.innerWidth < 721)
    {
      $('.icon_box_nav_bar').slideToggle();
      $('.mobile_icon_nav_bar span').removeClass('rotate_item');
    }

    $('.all_dept').removeClass('selected_item');
    $('.type_choice, .all_list').removeClass('selected_item');
    $('.' + theDeptLower + '_list_item').toggleClass('selected_item');

    $('tbody tr, .active_report').show();
    if($('.' + theDeptLower + '_list_item').hasClass('selected_item') === false)
    {
      $('tbody tr, .active_report').show();
    }else {
      var theItems = theDept;
      // console.log(theItems);
      var listCount = $('#reports_table tr').length;
      for(var i = 2; i < listCount + 1; i++ ){
        var checkThis = $('tbody tr:nth(' + i + ') td:nth(3)').text();
        // console.log(checkThis);
        var rowContaines = checkThis.indexOf(theItems) > -1;
        // console.log(rowContaines);
        if (rowContaines !== true) {
          $('tbody tr:nth(' + i + ')').hide();
        }
      }

      var item = $('.active_report');
      var itemCount = item.length + 1;
      // console.log(itemCount);
        for (var i = 1; i < itemCount; i++) {
          var itemText = $('.active_report:nth-child(' + i + ') .report_desc').text();
          // console.log(itemText);
          var itemTextFinal = itemText;
          var rowContaines = itemTextFinal.indexOf(theItems) > -1;
          if (rowContaines !== true) {
            $('.active_report:nth-child(' + i + ')').hide();
          }
          else {}
        }
    }


     //
    //  var merchSize = $('.active_report:visible').size();


    countDisplayedReports();

  });






  //merchandising department button
  $(document).on('click', '.all_list', function(){
    var theDept = $(this).attr('id');
    theDeptClass = theDept.replace(/\s/g, '');
    var theDeptLower = theDeptClass.toLowerCase();

    // console.log(theDept);

    if(window.innerWidth < 721)
    {
      $('.icon_box_nav_bar').slideToggle();
      $('.mobile_icon_nav_bar span').removeClass('rotate_item');
    }

    $('.all_dept').removeClass('selected_item');
    $('.all_list, .type_choice').removeClass('selected_item');
    $('.' + theDeptLower + '_all').toggleClass('selected_item');

    $('tbody tr, .active_report').show();
    if($('.' + theDeptLower + '_all').hasClass('selected_item') === false)
    {
      $('tbody tr, .active_report').show();
    }else {
      var theItems = theDept;
      var listCount = $('#reports_table tr').length;
      for(var i = 2; i < listCount + 1; i++ ){
        var checkThis = $('tbody tr:nth(' + i + ')').text();
        var rowContaines = checkThis.indexOf(theItems) > -1;
        if (rowContaines !== true) {
          $('tbody tr:nth(' + i + ')').hide();
        }
      }
      var item = $('.active_report');
      var itemCount = item.length + 1;
      // console.log(itemCount);
        for (var i = 1; i < itemCount; i++) {
          var itemText = $('.active_report:nth-child(' + i + ')').text();
          // console.log(itemText);
          var itemTextFinal = itemText;
          // console.log(itemTextFinal);
          // console.log(theItems);
          var rowContaines = itemTextFinal.indexOf(theItems) > -1;
          if (rowContaines !== true) {
            $('.active_report:nth-child(' + i + ')').hide();
          }
          else {}
        }
    }
     //
    //  var merchSize = $('.active_report:visible').size();


    countDisplayedReports();

  });




  function countDisplayedReports(){

    //count number of visible reports
    var reportsCount = $('.active_report:visible').size();
    // console.log(reportsCount);

    var windowWidth = window.innerWidth;;

    //if window width greater than 1200
    if(windowWidth > 1200)
    {
      //if mod 4 = 0
      if(reportsCount % 4 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '4', '!important');
      }else if(reportsCount % 3 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '3', '!important');
      }else if(reportsCount % 2 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '2', '!important');
      }else if(reportsCount % 1 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '1', '!important');
      }

    }else if(windowWidth < 1200){


      //if mod 4 = 0
      if(reportsCount % 4 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '4', '!important');
      }else if(reportsCount % 3 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '3', '!important');
      }else if(reportsCount % 2 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '2', '!important');
      }else if(reportsCount % 1 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '1', '!important');
      }

    }else if(windowWidth < 800){
      if(reportsCount % 2 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '2', '!important');
      }else if(reportsCount % 1 === 0){
        $('.inner_icon_box').css('-webkit-column-count', '1', '!important');
      }

    }else{
      $('.inner_icon_box').css('-webkit-column-count', '1', '!important');
    }

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
    // console.log(theDocument);
    // window.location.href = theDocument;
    window.open(theDocument, '_blank');
    // $.ajax({
    //     url: theCSV,
    //     type:'get',
    //     success:function(data){
    //         $('.report_sheet').html(data);
    //     }
    // })
    // $('.cats').hide();
    // $('.table-responsive').hide();
    // $('.inner_icon_box').hide();
    // $('.report_sheet').show();
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
    $('.share_box').hide();
  });

  //share report button icon
  $(document).on('click', '.reports_share', function(){
    $('.request_box_inner').hide();
    var shareTitle = $(this).closest('.this_title_wrap').find('.this_title').text();
    var theID = $(this).attr('id');
    $('.share_accepted').hide();
    $('.share_title').text(shareTitle);
    $('.overlay_share').fadeIn();
    $('.share_box, .share_box_inner').fadeIn();
    $('.share_box_inner').html('<div class="row"><div class="col-md-6 share_info">Enter the full name of the user you wish to share this report with, then hit submit.</div><div class="col-md-6"><form  onkeypress="return event.keyCode != 13"><input  class="share_input" style="" id="share_input" name="emailname" type="text" placeholder="Users Full Name" class="form-control"><div class="share_input_submit" id="' + theID + '">Submit</div></form></div></div>');
  });


  //share reports buttons
  $(document).on('click', '.share_input_submit', function(){



    var users_name = $('.share_input').val();

    if(users_name != ''){
      console.log(users_name);
      $('.the_users_name').text(users_name);
      $('.share_accepted').slideDown();
      $('.share_input').val('');
    }else{
      $('.share_input').css('background', 'rgba(240, 0, 0, 0.5)');
      $('.share_input').css('color', '#f2f2f2');
    }





    users_name = users_name.replace(/\s+/g, '_');


    console.log(users_name);


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


        console.log(itemStatus);
        itemStatus = itemStatus.toLowerCase();
        // itemStatus = itemStatus.replace(/ /g,"");






        var containes = itemStatus.indexOf(users_name) > -1;
        if (containes === true) {

          itemStatus = itemStatus.replace(users_name + ' ', '');
            console.log(itemStatus);

          $().SPServices({
                operation: "UpdateListItems",
                async: false,
                batchCmd: "Update",
                listName: "TestList",
                ID: itemID,
                valuepairs: [["Status", itemStatus]],
                completefunc: function(xData, Status) {

                  console.log('worked');
                  console.log(itemStatus);

                }
            });

        }else{
          console.log('did not contain');
        }





  });

  $(document).on('click', '.share_input', function(){
    $('.share_input').css('background', '#fff');
    $('.share_input').css('color', '#000');
  });


  //request report button
  $(document).on('click', '.request_access', function(){
    // $('.share_box_inner').hide();
    // var shareTitle = $(this).closest('.item_title').find('.report_name').text();
    // $('.share_title').text(shareTitle);
    // $('.overlay_share').fadeIn();
    // $('.share_box, .request_box_inner').fadeIn();
    // console.log('test');

    var first = $().SPServices.SPGetCurrentUser({
                    fieldName: "FirstName",
                    debug: false
                });
    var last = $().SPServices.SPGetCurrentUser({
                   fieldName: "LastName",
                   debug: false
               });

    var user_name = first + "_" + last + " ";
    console.log(user_name);
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
              console.log(itemStatus);
            // }


          });
        }
      });


        console.log(itemStatus);
        console.log(itemID);
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
    $('.overlay_2, .overlay_share').hide();
    $('.share_box').hide();
  });

  // share button - open share options
  $(document).on('click', '.share_btn', function(){
    $('.overlay_2, .share_box').toggle();
  });

  //close share box
  $('.share_box span').on('click', function() {
    $('.overlay_share, .overlay_2').hide();
    $('.share_box').hide();
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
      var checkThis = $('tbody tr:nth(' + i + ')').text();
      var checkThisFinal = checkThis.toLowerCase();
      var rowContaines = checkThisFinal.indexOf(searchFinal) > -1;
      if (rowContaines !== true) {
        $('tbody tr:nth(' + i + ')').hide();
      }
    }
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



  //mobile search input
  var search;
  $('.mob_search_input_submit').on('click', function() {
    $('#search_input').blur();
    $('.reset_search').show();
    $('.active_report').show();
    search = $('.mob_search_input').val();
    searchFinal = search.toLowerCase();
    $('.mob_search_input').removeClass('search_open').focus().val('');
    var item = $('.item_title');
    var itemCount = item.length;
    var row_count = $('.report_row').length;
    for (var i = 1; i < row_count; i++) {
      for (var j = 1; j < itemCount; j++) {
        var itemText = $('.active_report_' + i + ':nth-child(' + j + ')').text();
        // console.log(itemText);
        var itemTextFinal = itemText.toLowerCase();
        var rowContaines = itemTextFinal.indexOf(searchFinal) > -1;
        if (rowContaines !== true) {
          $('.active_report_' + i + ':nth-child(' + j + ')').hide();
        }
        else {}
      }
    }
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






          if(departmentRepeat === title){

          }
          else{
            numOfDepartments ++;
            // console.log(report_type + ' ' + title + ' ' + numOfDepartments);
            lowercaseTitle = title.toLowerCase();
            lowercaseTitle = lowercaseTitle.replace(/\s/g, '');
            uppercaseTitle = title.replace(/\s/g, '');

            // UNREACHABLE CLASS TO DIM OUT AN OPTION

            $('.icon_box_nav_bar .row').append('<div class="cat_choice ' + lowercaseTitle + '_dept">' + title + '</div>');
            $('.menu_options').append('<li class="active_dept_link ' + lowercaseTitle + '">' + title + '</li>');
            $('.footer_catalog').append('<p class="active_dept_link ' + lowercaseTitle + '">' + title + '</p>');

            $('.' + lowercaseTitle + '_dept').append("<div class='" + lowercaseTitle + "_list the_list'><ul><li id='" + uppercaseTitle + "' class='" + lowercaseTitle + "_all all_list'>All</li></ul></div>");
          }


          if(typeRepeat === report_type){

          }
          else{
            var typeClass = report_type;
            typeClass = typeClass.replace(/\s/g, '');

            $('.' + lowercaseTitle + '_list ul').append("<li class='type_choice " + typeClass + "_list_item'>" + report_type + "</li>");
          }

          typeRepeat = report_type;

          departmentRepeat = title;
        });

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



  //get reports list callback
  GetReports();
  //get reports function / sp services call
  function GetReports() {
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
      "<FieldRef Name='Status' />" +
      "</ViewFields>";
    $().SPServices({
      operation: method,
      async: false,
      listName: list,
      CAMLViewFields: fieldsToRead,
      CAMLQuery: query,
      completefunc: function(xData, Status) {
        $(xData.responseXML).SPFilterNode("z:row").each(function() {

          var name = ($(this).attr("ows_Title")); //name
          var path = ($(this).attr("ows_Path")); //path
          var department = ($(this).attr("ows_Department")); //department
          var report_type = ($(this).attr("ows_ReportType")); //report type
          var pub_date = ($(this).attr("ows_PublishDate")); //pub date
          var listItemId = ($(this).attr("ows_listItemId")); //listItemId
          var itemID = ($(this).attr("ows_ID")); //listItemId
          var itemStatus = ($(this).attr("ows_Status")); //listItemId

          displayList(name, department, report_type, listItemId, report_type, pub_date, path, itemID, itemStatus);
        });
      }
    });
  }

  function displayList(name, department, report_type, listItemId, report_type, pub_date, path, itemID, itemStatus) {



    var folder = path;
    $().SPServices({
        operation: "GetListItems",
        async: false,
        webURL: "https://thegolubcorporation.sharepoint.com/sites/MYReports/",
        listName: "Documents",
        CAMLViewFields: "<ViewFields Properties='True' />",
        CAMLQueryOptions: "<QueryOptions><Folder>" + folder + "</Folder><ViewAttributes Scope='RecursiveAll'></ViewAttributes></QueryOptions>",
        CAMLRowLimit: "1",
        CAMLQuery: "<Query><Where><Neq><FieldRef Name='ID'/><Value Type='Number'>0</Value></Neq></Where><OrderBy><FieldRef Name='ReportDate'/></OrderBy></Query>",
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function () {
                path = "https://thegolubcorporation.sharepoint.com/"+$(this).attr("ows_FileRef").split(';#')[1];
                var name = $(this).attr("ows_FileLeafRef").split(';#')[1];
                name = name.split('.')[0];
                // console.log(path);
            });
        }
    });

    //build table- detail view
    // https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png



    var str = path;
    var lastThree = str.substr(str.length - 3);
    lastThree = lastThree.toLowerCase();
    console.log(lastThree);

    // path = path.substring(path.indexOf(" ") + 1);
    // path = "https://thegolubcorporation.sharepoint.com/" + path;


    if(lastThree === "csv")
    {
      $('.table-responsive tbody').append('<tr class="this_title_wrap"><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="pdf" /></td><td class="this_title"><a href="' + path + '" target="blank"><div class="reports_open"><div>' + name + '</div></div></a></td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class=""><div class="reports_share" id="' + itemID + '"><div><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Share</div></div></td></tr>');

    }
    else if(lastThree === "pdf")
    {
      $('.table-responsive tbody').append('<tr class="this_title_wrap"><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></td><td class="this_title"><a href="' + path + '" target="blank"><div class="reports_open"><div>' + name + '</div></div></a></td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class=""><div class="reports_share" id="' + itemID + '"><div><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Share</div></div></td></tr>');

    }


    if(lastThree === "csv")
    {
      //build grid - icon view


        $('.report_row').append('<div class="main_select active_report active_report_1 report_1"><div class=""><div class="item_title this_title_wrap" data-type="' + department + '"><p class="report_name this_title">' + name + '</p><p class="report_dep">' + department + '</p><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="pdf" /></div><div><p class="report_desc">' + report_type + '</p></div><a href="' + path + '" target="blank"><div class="reports_open"><div>Open</div></div></a><div class="reports_share"><div><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Share</div></div></div></div></div>');

    }
    else if(lastThree === "pdf")
    {
      //build grid - icon view
// col-sm-6 col-md-3


        $('.report_row').append('<div class="main_select active_report active_report_1 report_1"><div class=""><div class="item_title this_title_wrap" data-type="' + department + '"><p class="report_name this_title">' + name + '</p><p class="report_dep">' + department + '</p><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><div><p class="report_desc">' + report_type + '</p></div><a href="' + path + '" target="blank"><div class="reports_open"><div>Open</div></div></a><div class="reports_share" id="' + itemID + '"><div><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Share</div></div></div></div></div>');

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
            countDisplayedReports();
        }
    );


  }
  // sp services end

  //Reports catalog build
  $('.active_dept_link').on('click', function(){
    $('.main_wrapper').scrollTop(0);
    $('.icon_box_box').slideUp(100);
    $(this).removeClass('active_dept_link');
    var thisDepartment = $(this).attr('class');
    var newTitle = thisDepartment.charAt(0).toUpperCase() + thisDepartment.slice(1);
    $('.gen_info h2').text(newTitle);
    $('.' + thisDepartment).text('Loading...');
    $('.inner_icon_box, .table-responsive tbody').empty();
    $('.inner_icon_box').html("<div class='loadingThis'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");
    $('.table-responsive').append("<div class='loadingThisList'>Loading...<br><i style='opacity:0.1;'>Gathering Reports</i></div>");

    setTimeout(function(){
      GetReportsUnfiltered();
      function GetReportsUnfiltered() {
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
          "<FieldRef Name='Status' />" +
          "<FieldRef Name='ID' />" +
          "</ViewFields>";
        $().SPServices({
          operation: method,
          async: true,
          listName: list,
          CAMLViewFields: fieldsToRead,
          CAMLQuery: query,
          completefunc: function(xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function() {
              var name = ($(this).attr("ows_Title")); //name
              var department = ($(this).attr("ows_Department")); //Department
              var report_type = ($(this).attr("ows_ReportType")); //report type
              var path = ($(this).attr("ows_Path")); //created
              var pub_date = ($(this).attr("ows_PublishDate")); //pub date
              var status = ($(this).attr("ows_Status")); //pub date
              var itemID = ($(this).attr("ows_ID")); //pub date

              var listItemId = ($(this).attr("ows_listItemId")); //listItemId
              displayListUnfiltered(name, department, report_type, listItemId, report_type, status, itemID, path);
            });
          }
        });
      }

      function displayListUnfiltered(name, department, report_type, listItemId, report_type, status, itemID, path) {
        //get attachments
        // var list = "TestList";
        // var method = "GetAttachmentCollection";
        // var attachmentFileUrls = [];
        // $().SPServices({
        //   operation: method,
        //   async: false,
        //   listName: list,
        //   ID: listItemId,
        //   completefunc: function(xData, Status) {
        //     $(xData.responseXML).find("Attachment").each(function() {
        //       var url = $(this).text();
        //       attachmentFileUrls.push(url);
        //       console.log(attachmentFileUrls);
        //     });
        //   }
        // });

        //build table- detail view
        // https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png
        var checkThisDept = department.toLowerCase();
        checkThisDept = checkThisDept.replace(/\s/g, '');
        // console.log(checkThisDept + ' ' + thisDepartment);
        if(checkThisDept === thisDepartment)
        {
            // var str = path;
            // var lastThree = str.substr(str.length - 3);
            // lastThree = lastThree.toLowerCase();
            // console.log(lastThree);
            // if(lastThree === "csv")
            // {
            //   $('.table-responsive tbody').append('<tr><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></td><td class="report_btn" id="">' + name + '</td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class="share_btn">Request Access</td></tr>');
            // }
            // else if(lastThree === "pdf")
            // {
              $('.table-responsive tbody').append('<tr class="this_title_wrap"><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></td><td class="this_title" id="">' + name + '</td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class=""><div class="reports_request"><div class="request_wrap"><div class="request_sent ' + itemID + '_sent">Request Sent!</div><div id= "' + itemID + '" class="request_access ' + itemID + '_request"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></td></tr>');
            // }
            // if(lastThree === "csv")
            // {
            //   //build grid - icon view
            //     $('.report_row').append('<div class="main_select active_report active_report_1 report_1"><div class=""><div class="item_title" data-type="' + department + '"><p class="report_name">' + name + '</p><p class="report_dep">' + department + '</p><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></div><div><p class="report_desc">' + report_type + '</p></div></a><div class="reports_request"><div class="request_wrap"><div class="request_sent">Request Sent!</div><div class="request_access"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></div></div></div>');
            // }
            // else if(lastThree === "pdf")
            // {
              //build grid - icon view
                $('.report_row').append('<div class="main_select active_report active_report_1 report_1"><div class=""><div class="item_title this_title_wrap" data-type="' + department + '"><p class="report_name this_title">' + name + '</p><p class="report_dep">' + department + '</p><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><div><p class="report_desc">' + report_type + '</p></div></a><div class="reports_request"><div class="request_wrap"><div class="request_sent ' + itemID + '_sent">Request Sent!</div><div id= "' + itemID + '" class="request_access ' + itemID + '_request"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></div></div></div>');

                var first = $().SPServices.SPGetCurrentUser({
                                fieldName: "FirstName",
                                debug: false
                            });
                var last = $().SPServices.SPGetCurrentUser({
                               fieldName: "LastName",
                               debug: false
                           });

                var user_name = first + "_" + last;
                console.log(user_name);
                console.log(status);
                var statusContaines = status.indexOf(user_name) > -1;
                console.log(statusContaines);
                if(statusContaines === true){
                  $('.' + itemID + '_request').hide();
                  $('.' + itemID + '_sent').show();

                }else{
                  $('.' + itemID + '_request').show();
                  $('.' + itemID + '_sent').hide();

                }
            // }
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
                countDisplayedReports();
            }
            );
        }
      }
    }, 150);
  });




  // var $wrapper = $('.table-responsive');
  //
  // function startScrolling()
  // {
  //     var leftPos = $wrapper.scrollLeft();
  //     $wrapper.animate({scrollLeft: leftPos + 200}, 800);
  // }
  //
  // function stopScrolling()
  // {
  //   console.log('test');
  //     // stop increasing scroll position
  //     $wrapper.stop();
  // }
  //
  // $('.scroll_right').mousedown(startScrolling).mouseup(stopScrolling);

// scroll down
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






  $('.table_top').on('click', function(){
    $('.search_callout').show();

    // setTimeout( function(){
    //   $('.search_callout').fadeOut();
    // }, 4000)
  });

  $('.search_callout, .reports_share, .reports_open, nav, .rep_cat, .icon_box_box, .reports_request, .request_sent').on({
    'mouseenter click': function () {
      $('.search_callout').hide();
    }

  });


});
