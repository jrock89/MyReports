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

  // enterprice report catalog button
  $('.inner_rep_cat').on('click', function(){
    $('.cats').show();
    $('.table-responsive, .report_sheet').hide();
    $('.inner_icon_box').hide();
    $('.inner_rep_cat span').toggleClass('rotate_item_full');
    $('.inner_rep_cat').css('background', '#335D27', '!important');
    $('.inner_rep_gro, .inner_rep_ico, .inner_rep_det').css('background', '#63ba49', '!important');

    $('.inner_rep_cat').css('border-bottom', '3px solid #335D27', '!important');
    $('.inner_rep_gro, .inner_rep_ico, .inner_rep_det').css('border-bottom', '3px solid #478635', '!important');
  });

  // detail view button
  $('.inner_rep_det, .submit_dps').on('click', function(){
    $('.cats').hide();
    $('.inner_icon_box, .report_sheet').hide();
    $('.table-responsive').show();
    $('.inner_rep_det span').toggleClass('rotate_item_full');
    $('.inner_rep_det').css('background', '#335D27', '!important');
    $('.inner_rep_cat, .inner_rep_ico, .inner_rep_gro').css('background', '#63ba49', '!important');

    $('.inner_rep_det').css('border-bottom', '3px solid #335D27', '!important');
    $('.inner_rep_cat, .inner_rep_ico, .inner_rep_gro').css('border-bottom', '3px solid #478635', '!important');
  });

  //merchandising department button
  $('.merch_dpt').on('click', function(){
    $('.merch_dpt').toggleClass('selected_item');
    $('.operations_dpt').removeClass('selected_item');
    $('tbody tr').show();
    $('.active_report').show();

    if($('.merch_dpt').hasClass('selected_item') === false)
    {
      $('tbody tr').show();
      $('.active_report').show();
    }else {
      var merchItems = "Merchandising";
      var listCount = $('#reports_table tr').length;
      for(var i = 2; i < listCount + 1; i++ ){
        var checkThis = $('tbody tr:nth(' + i + ') td:nth(1)').text();
        var rowContaines = checkThis.indexOf(merchItems) > -1;
        if (rowContaines !== true) {
          $('tbody tr:nth(' + i + ')').hide();
        }
      }

      var item = $('.active_report');
      var itemCount = item.length + 1;
      console.log(itemCount);

        for (var i = 1; i < itemCount; i++) {
          var itemText = $('.active_report:nth-child(' + i + ')').text();
          console.log(itemText);
          var itemTextFinal = itemText;
          var rowContaines = itemTextFinal.indexOf(merchItems) > -1;
          if (rowContaines !== true) {
            $('.active_report:nth-child(' + i + ')').hide();
          }
          else {}
        }

    }
     //
    //  var merchSize = $('.active_report:visible').size();
     //
    //  $('.inner_icon_box').css('column-count', merchSize);

  });

  //operations button
  $('.operations_dpt').on('click', function(){
    $('.operations_dpt').toggleClass('selected_item');
    $('.merch_dpt').removeClass('selected_item');

    $('tbody tr').show();
    $('.active_report').show();

    if($('.operations_dpt').hasClass('selected_item') === false)
    {
      $('tbody tr').show();
      $('.active_report').show();
    }else {
      var opItems = "Operations";
      var listCount = $('#reports_table tr').length;
      for(var i = 2; i < listCount + 1; i++ ){
        var checkThis = $('tbody tr:nth(' + i + ') td:nth(2)').text();
        var rowContaines = checkThis.indexOf(opItems) > -1;
        if (rowContaines !== true) {
          $('tbody tr:nth(' + i + ')').hide();
        }
      }


      var item = $('.active_report');
      var itemCount = item.length + 1;
      console.log(itemCount);

        for (var i = 1; i < itemCount; i++) {
          var itemText = $('.active_report:nth-child(' + i + ') .report_dep').text();
          console.log(itemText);
          var itemTextFinal = itemText;
          var rowContaines = itemTextFinal.indexOf(opItems) > -1;
          if (rowContaines !== true) {
            $('.active_report:nth-child(' + i + ')').hide();
          }
          else {}
        }



    }
  });


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
    theCSV = $(this).attr('id');
    console.log(theCSV);
    // window.location.href = theCSV;
    $.ajax({
        url: theCSV,
        type:'get',
        success:function(data){
            $('.report_sheet').html(data);
        }
    })
    $('.cats').hide();
    $('.table-responsive').hide();
    $('.inner_icon_box').hide();
    $('.report_sheet').show();
  });

  // force form tags into sharepoint
  $('.input_goes_here').append('<form  onkeypress="return event.keyCode != 13"><input  class="search_input" style="" id="search_input" name="name" type="text" placeholder="Search" class="form-control"><div class="search_input_submit">Submit</div></form>');

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
    $('.search_input').toggleClass('search_open').focus().val('');
    $('.search_input_submit').toggleClass('search_sub_open');
    $('.overlay_2').toggle();
    $('.share_box').hide();
  });

  //share report button
  $(document).on('click', '.reports_share', function(){
    $('.request_box_inner').hide();
    var shareTitle = $(this).closest('.item_title').find('.report_name').text();
    $('.share_title').text(shareTitle);
    $('.overlay_share').fadeIn();
    $('.share_box, .share_box_inner').fadeIn();
    $('.share_box_inner').html('<div class="row"><div class="col-md-6 share_info">Enter the email address of the user you wish to share this report with, then hit submit.</div><div class="col-md-6"><form  onkeypress="return event.keyCode != 13"><input  class="share_input" style="" id="share_input" name="emailname" type="email" placeholder="Email Address" class="form-control"><div class="share_input_submit">Submit</div></form></div></div>');
  });

  //share report button
  $(document).on('click', '.reports_request', function(){
    $('.share_box_inner').hide();
    var shareTitle = $(this).closest('.item_title').find('.report_name').text();
    $('.share_title').text(shareTitle);
    $('.overlay_share').fadeIn();
    $('.share_box, .request_box_inner').fadeIn();
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
    var row_count = $('.report_row').length;
    for (var i = 1; i < row_count; i++) {
      for (var j = 1; j < itemCount; j++) {
        var itemText = $('.active_report_' + i + ':nth-child(' + j + ')').text();
        console.log(itemText);
        var itemTextFinal = itemText.toLowerCase();
        var rowContaines = itemTextFinal.indexOf(searchFinal) > -1;
        if (rowContaines !== true) {
          $('.active_report_' + i + ':nth-child(' + j + ')').hide();
        }
        else {}
      }
    }

    //table view detail view
    var listCount = $('#reports_table tr').length;
    for(var i = 2; i < listCount + 1; i++ ){
      var checkThis = $('tbody tr:nth(' + i + ') td:nth(1)').text();
      var rowContaines = checkThis.indexOf(searchFinal) > -1;
      if (rowContaines !== true) {
        $('tbody tr:nth(' + i + ')').hide();
      }
    }
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
        console.log(itemText);
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

  // $('.show_bar').on('click', function(){
  //   $('.rep_cat').toggle();
  // });

  //mobile menu button drop down items
  $('.mob_menu_button').on('click', function() {
    $('.mob_menu_contents').slideToggle();
    $('.overlay_3').toggle();
    $('.mob_menu_options li span').removeClass('rotate_item');
    $('.sub_1').slideUp();
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

  $('.my_reports_button').on('click', function(){
    $('.icon_box_box').slideDown();
    $('.inner_icon_box, .table-responsive tbody').empty();
    GetReports();
  });
  // sp services begin (get list)
  //get reports list callback
  GetReports();
  //get reports function / sp services call
  function GetReports() {
    var list = "MyReports";
    var method = "GetListItems";
    var query;
    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Name' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='Created' />" +
      "<FieldRef Name='PublishedDate' />" +
      "<FieldRef Name='Version' />" +
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
          var department = ($(this).attr("ows_department")); //department
          var report_type = ($(this).attr("ows_ReportType")); //report type
          var created = ($(this).attr("ows_Created")); //created
          var pub_date = ($(this).attr("ows_PublishDate")); //pub date
          var modified = ($(this).attr("ows_Modified")); //modified
          var created_by = ($(this).attr("ows_Author")); //created by
          var modified_by = ($(this).attr("ows_Editor")); //modified by
          var listItemId = ($(this).attr("ows_listItemId")); //listItemId

          displayList(name, department, report_type, listItemId, report_type);
        });
      }
    });
  }

  function displayList(name, department, report_type, listItemId, report_type) {
    //get attachments
    var list = "MyReports";
    var method = "GetAttachmentCollection";
    var attachmentFileUrls = [];
    $().SPServices({
      operation: method,
      async: false,
      listName: list,
      ID: listItemId,
      completefunc: function(xData, Status) {
        $(xData.responseXML).find("Attachment").each(function() {
          var url = $(this).text();
          attachmentFileUrls.push(url);
          console.log(attachmentFileUrls);
        });
      }
    });

    //build table- detail view
    // https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png



    var str = attachmentFileUrls[0];
    var lastThree = str.substr(str.length - 3);
    lastThree = lastThree.toLowerCase();
    // alert(lastThree);

    if(lastThree === "csv")
    {
      $('.table-responsive tbody').append('<tr><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></td><td class="report_btn" id="' + attachmentFileUrls + '">' + name + '</td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class="share_btn">Share</td></tr>');

    }
    else if(lastThree === "pdf")
    {
      $('.table-responsive tbody').append('<tr><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></td><td class="report_btn" id="' + attachmentFileUrls + '">' + name + '</td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class="share_btn">Share</td></tr>');

    }


    if(lastThree === "csv")
    {
      //build grid - icon view


        $('.report_row').append('<div class="main_select active_report active_report_1 report_1"><div class=""><div class="item_title" data-type="' + department + '"><p class="report_name">' + name + '</p><p class="report_dep">' + department + '</p><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></div><div><p class="report_desc">' + report_type + '</p></div><a href="' + attachmentFileUrls + '" target="blank"><div class="reports_open"><div>Open</div></div></a><div class="reports_share"><div><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Share</div></div></div></div></div>');

    }
    else if(lastThree === "pdf")
    {
      //build grid - icon view
// col-sm-6 col-md-3


        $('.report_row').append('<div class="main_select active_report active_report_1 report_1"><div class=""><div class="item_title" data-type="' + department + '"><p class="report_name">' + name + '</p><p class="report_dep">' + department + '</p><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><div><p class="report_desc">' + report_type + '</p></div><a href="' + attachmentFileUrls + '" target="blank"><div class="reports_open"><div>Open</div></div></a><div class="reports_share"><div><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Share</div></div></div></div></div>');

    }



    $(document).ready(function()
        {
            $("#reports_table").tablesorter();
        }
    );


  }
  // sp services end














$('.active_dept_link').on('click', function(){
  $('.icon_box_box').slideUp();
  $(this).removeClass('active_dept_link');
  var thisDepartment = $(this).attr('class');

  $('.inner_icon_box, .table-responsive tbody').empty();

  GetReportsUnfiltered();
  function GetReportsUnfiltered() {
    var list = "MyReports";
    var method = "GetListItems";
    var query;
    var fieldsToRead = "<ViewFields>" +
      "<FieldRef Name='Name' />" +
      "<FieldRef Name='Department' />" +
      "<FieldRef Name='ReportType' />" +
      "<FieldRef Name='Created' />" +
      "<FieldRef Name='PublishedDate' />" +
      "<FieldRef Name='Version' />" +
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
          var department = ($(this).attr("ows_department")); //department
          var report_type = ($(this).attr("ows_ReportType")); //report type
          var created = ($(this).attr("ows_Created")); //created
          var pub_date = ($(this).attr("ows_PublishDate")); //pub date
          var modified = ($(this).attr("ows_Modified")); //modified
          var created_by = ($(this).attr("ows_Author")); //created by
          var modified_by = ($(this).attr("ows_Editor")); //modified by
          var listItemId = ($(this).attr("ows_listItemId")); //listItemId

          displayListUnfiltered(name, department, report_type, listItemId, report_type);
        });
      }
    });
  }







  function displayListUnfiltered(name, department, report_type, listItemId, report_type) {


    //get attachments
    var list = "MyReports";
    var method = "GetAttachmentCollection";
    var attachmentFileUrls = [];
    $().SPServices({
      operation: method,
      async: false,
      listName: list,
      ID: listItemId,
      completefunc: function(xData, Status) {
        $(xData.responseXML).find("Attachment").each(function() {
          var url = $(this).text();
          attachmentFileUrls.push(url);
          console.log(attachmentFileUrls);
        });
      }
    });

    //build table- detail view
    // https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png
    var checkThisDept = department.toLowerCase();

    if(checkThisDept === thisDepartment)
    {


          var str = attachmentFileUrls[0];
          var lastThree = str.substr(str.length - 3);
          lastThree = lastThree.toLowerCase();
          // alert(lastThree);

          if(lastThree === "csv")
          {
            $('.table-responsive tbody').append('<tr><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></td><td class="report_btn" id="">' + name + '</td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class="share_btn">Request Access</td></tr>');

          }
          else if(lastThree === "pdf")
          {
            $('.table-responsive tbody').append('<tr><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></td><td class="report_btn" id="">' + name + '</td><td class="list_department">' + department + '</td><td>' + report_type + '</td><td class="share_btn">Request Access</td></tr>');

          }


          if(lastThree === "csv")
          {
            //build grid - icon view


              $('.report_row').append('<div class="main_select active_report active_report_1 report_1"><div class=""><div class="item_title" data-type="' + department + '"><p class="report_name">' + name + '</p><p class="report_dep">' + department + '</p><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></div><div><p class="report_desc">' + report_type + '</p></div></a><div class="reports_request"><div><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></div></div>');

          }
          else if(lastThree === "pdf")
          {
            //build grid - icon view
        // col-sm-6 col-md-3


              $('.report_row').append('<div class="main_select active_report active_report_1 report_1"><div class=""><div class="item_title" data-type="' + department + '"><p class="report_name">' + name + '</p><p class="report_dep">' + department + '</p><div class="report_img"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><div><p class="report_desc">' + report_type + '</p></div></a><div class="reports_request"><div><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Request Access</div></div></div></div></div>');

          }



          $(document).ready(function()
              {
                  $("#reports_table").tablesorter();
              }
          );


        }


    }



});










});
