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
    $('.merch_dpt .item_title').toggleClass('selected_item');
    $('.operations_dpt .item_title').removeClass('selected_item');
    $('tbody tr').show();
    $('.active_report').show();

    if($('.merch_dpt .item_title').hasClass('selected_item') === false)
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
      var item = $('.item_title');
      var itemCount = item.length;
      var row_count = $('.report_row').length;
      for (var i = 1; i < row_count; i++) {
        for (var j = 1; j < itemCount; j++) {
          var itemText = $('.active_report_' + i + ':nth-child(' + j + ')').text();
          console.log(itemText);
          var itemTextFinal = itemText;
          var rowContaines = itemTextFinal.indexOf(merchItems) > -1;
          if (rowContaines !== true) {
            $('.active_report_' + i + ':nth-child(' + j + ')').hide();
          }
          else {}
        }
      }
    }


  });

  //operations button
  $('.operations_dpt').on('click', function(){
    $('.operations_dpt .item_title').toggleClass('selected_item');
    $('.merch_dpt .item_title').removeClass('selected_item');

    $('tbody tr').show();
    $('.active_report').show();

    if($('.operations_dpt .item_title').hasClass('selected_item') === false)
    {
      $('tbody tr').show();
      $('.active_report').show();
    }else {
      var opItems = "Operations";
      var listCount = $('#reports_table tr').length;
      for(var i = 2; i < listCount + 1; i++ ){
        var checkThis = $('tbody tr:nth(' + i + ') td:nth(1)').text();
        var rowContaines = checkThis.indexOf(opItems) > -1;
        if (rowContaines !== true) {
          $('tbody tr:nth(' + i + ')').hide();
        }
      }
      var item = $('.item_title');
      var itemCount = item.length;
      var row_count = $('.report_row').length;
      for (var i = 1; i < row_count; i++) {
        for (var j = 1; j < itemCount; j++) {
          var itemText = $('.active_report_' + i + ':nth-child(' + j + ')').text();
          console.log(itemText);
          var itemTextFinal = itemText;
          var rowContaines = itemTextFinal.indexOf(opItems) > -1;
          if (rowContaines !== true) {
            $('.active_report_' + i + ':nth-child(' + j + ')').hide();
          }
          else {}
        }
      }
    }
  });


  $('.inner_rep_req').on('click', function(){
    $('.inner_rep_req span').toggleClass('rotate_item_full');
  });

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
    $("#report_btn_sort").click();
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

  //search and share hide - click faded overlay
  $('.overlay_2').on('click', function() {
    $('.search_input').removeClass('search_open').focus().val('');
    $('.search_input_submit').removeClass('search_sub_open');
    $('.overlay_2').hide();
    $('.share_box').hide();
  });

  // share button - open share options
  $(document).on('click', '.share_btn', function(){
    $('.overlay_2, .share_box').toggle();
  });

  //close share box
  $('.share_box span').on('click', function() {
    $('.overlay_2').hide();
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
    $('.menu_options li span').removeClass('rotate_item');
    $('.mob_menu_options li span').removeClass('rotate_item');
    $('.menu_options').slideToggle();
    $('.menu_button').toggleClass('active_menu');
    $('.menu_active').toggle();
    $('.menu_close').toggleClass('menu_close_open');
    $('.social_contents').slideUp(100);
    $('.social_box span').removeClass('rotate_item');
    $('.social_box').removeClass('active_menu');
  });

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
    $('.menu_options li span').removeClass('rotate_item');
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
      $('.table-responsive tbody').append('<tr><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></td><td class="report_btn" id="' + attachmentFileUrls + '">' + name + '</td><td>' + report_type + '</td><td class="share_btn">Share</td></tr>');

    }
    else if(lastThree === "pdf")
    {
      $('.table-responsive tbody').append('<tr><td style="text-align:center;"><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></td><td class="report_btn" id="' + attachmentFileUrls + '">' + name + '</td><td>' + report_type + '</td><td class="share_btn">Share</td></tr>');

    }


    var row_1_count = $('.' + department + '_report_row_1 .report_1').length;
    var row_2_count = $('.' + department + '_report_row_2 .report_2').length;
    var row_3_count = $('.' + department + '_report_row_3 .report_3').length;
    var row_4_count = $('.' + department + '_report_row_4 .report_4').length;
    if(lastThree === "csv")
    {
      //build grid - icon view

      if (row_1_count < 4) {
        $('.' + department + '_report_row_1').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_1 report_1"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '"><div><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></div><br>' + name + '</div></div></a></div>');
      } else if (row_2_count < 4) {
        $('.' + department + '_report_row_2').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_2 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '"><div><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></div><br>' + name + '</div></div></a></div>');
      } else if (row_3_count < 4) {
        $('.' + department + '_report_row_2').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_3 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '"><div><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></div><br>' + name + '</div></div></a></div>');
      } else if (row_3_count < 4) {
        $('.' + department + '_report_row_3').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_4 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '"><div><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/csv.png" alt="csv" /></div><br>' + name + '</div></div></a></div>');
      }
    }
    else if(lastThree === "pdf")
    {
      //build grid - icon view

      if (row_1_count < 4) {
        $('.' + department + '_report_row_1').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_1 report_1"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '"><div><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><br>' + name + '</div></div></a></div>');
      } else if (row_2_count < 4) {
        $('.' + department + '_report_row_2').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_2 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '"><div><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><br>' + name + '</div></div></a></div>');
      } else if (row_3_count < 4) {
        $('.' + department + '_report_row_2').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_3 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '"><div><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><br>' + name + '</div></div></a></div>');
      } else if (row_3_count < 4) {
        $('.' + department + '_report_row_3').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_4 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '"><div><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/pdf.png" alt="pdf" /></div><br>' + name + '</div></div></a></div>');
      }
    }



    $(document).ready(function()
        {
            $("#reports_table").tablesorter();
        }
    );


  }
  // sp services end
});
