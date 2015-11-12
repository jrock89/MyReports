// Author: Jesse Rock
// Date: 10/28/2015

$(document).ready(function() {

  $(window).load(function() {
    $('.loader').hide();
  });

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
  $('title').text("My Reports | " + today);

  $('.inner_rep_cat').on('click', function(){
    $('.cats').toggle();
    $('.table-responsive').hide();
      $('.inner_icon_box').hide();
    $('.inner_rep_cat span').toggleClass('rotate_item_full');

  });


  $('.inner_rep_det').on('click', function(){
    $('.cats').hide();
      $('.inner_icon_box').hide();
    $('.table-responsive').toggle();
    $('.inner_rep_det span').toggleClass('rotate_item_full');

  });




  $('.inner_rep_ico').on('click', function(){
    $('.cats').hide();
    $('.table-responsive').hide();
    $('.inner_icon_box').toggle();
    $('.inner_rep_ico span').toggleClass('rotate_item_full');

  });


  $(document).on('click', '.share_btn', function(){
    $('.overlay_2, .share_box').toggle();
  });

  $('.input_goes_here').append('<form  onkeypress="return event.keyCode != 13"><input  class="search_input" style="" id="search_input" name="name" type="text" placeholder="Search" class="form-control"><div class="search_input_submit">Submit</div></form>');
  $('form').submit(function() {
    return false;
  });
  $("#search_input").keyup(function(e) {
    if (event.keyCode == 13) {
      $('#search_input').blur();
      e.preventDefault();
      $(".search_input_submit").click();
      return false;
    }
  });
  $('.search, .overlay_2, .share_box span').on('click', function() {
    $('.search_input').removeClass('search_open').focus().val('');
    $('.search_input_submit').removeClass('search_sub_open');
    $('.overlay_2').toggle();
    $('.share_box').hide();
  });

  //search input
  var search;
  $('.search_input_submit').on('click', function() {
    $('#search_input').blur();
    $('.reset_search').show();
    $('.active_report').show();
    search = $('.search_input').val();
    searchFinal = search.toLowerCase();
    $('.search_input').removeClass('search_open').focus().val('');
    $('.search_input_submit').removeClass('search_sub_open');
    $('.overlay_2').fadeOut();
    var item = $('.item_title');
    var itemCount = item.length;
    var row_count = $('.report_row').length;

    for (var i = 1; i < row_count; i++) {

      for (var j = 1; j < itemCount; j++) {

        var itemText = $('.active_report_' + i + ':nth-child(' + j + ')').text();
        console.log(itemText);
        // var itemType = $('.active_report_' + i +':nth-child(' + j + ') .item_title').attr('data-type');
        // console.log(itemType);
        //
        // if(typeof variable_here === 'undefined'){
        //     break;
        // }
        // var itemTypeFinal = itemType.toLowerCase();
        var itemTextFinal = itemText.toLowerCase();
        var rowContaines = itemTextFinal.indexOf(searchFinal) > -1;
        // var rowContainesType = itemTypeFinal.indexOf(searchFinal) > -1;
        if (rowContaines !== true) {
          $('.active_report_' + i + ':nth-child(' + j + ')').hide();
        }
        // else if(rowContainesType !== true){
        //   $('.active_report_' + i +':nth-child(' + j + ')').hide();
        //
        // }
        else {}
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
        // var itemType = $('.active_report_' + i +':nth-child(' + j + ') .item_title').attr('data-type');
        // console.log(itemType);
        //
        // if(typeof variable_here === 'undefined'){
        //     break;
        // }
        // var itemTypeFinal = itemType.toLowerCase();
        var itemTextFinal = itemText.toLowerCase();
        var rowContaines = itemTextFinal.indexOf(searchFinal) > -1;
        // var rowContainesType = itemTypeFinal.indexOf(searchFinal) > -1;
        if (rowContaines !== true) {
          $('.active_report_' + i + ':nth-child(' + j + ')').hide();
        }
        // else if(rowContainesType !== true){
        //   $('.active_report_' + i +':nth-child(' + j + ')').hide();
        //
        // }
        else {}
      }
    }
    return false;
  });

  $('.reset_search').on('click', function() {
    $('.active_report').show();
    $('.reset_search').hide();
  });

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

  $('.mob_menu_button').on('click', function() {
    $('.mob_menu_contents').slideToggle();
    $('.overlay_3').toggle();
    $('.mob_menu_options li span').removeClass('rotate_item');
    $('.sub_1').slideUp();
    $('.menu_active').toggle();
    $('.menu_close').toggleClass('menu_close_open');
  });

  $('.sub_1_link').on('click', function() {
    $('.sub_1').slideToggle();
    $('.menu_options li span').toggleClass('rotate_item');
    $('.mob_menu_options li span').toggleClass('rotate_item');
  });

  $('nav').on('mouseleave', function() {
    $('.sub_1').slideUp();
    $('.menu_options li span').removeClass('rotate_item');
    $('.mob_menu_options li span').removeClass('rotate_item');
  });

  $('.active_dept').on('mouseout', function() {
    $('.active_dept .item_img').removeClass('img_shrink');
    $('.active_dept .item_title').removeClass('title_grow');
  });

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

  $('.social_contents span').on('click', function() {

    $('.social_contents').slideUp(100);
  });




$(document).on('click', '.report_btn', function(){
  theCSV = $(this).attr('id');
  console.log(theCSV);
  // window.location.href = theCSV;


  $.ajax({
      url: theCSV,
      type:'get',
      // dataType:'jsonp',
      success:function(data){
          alert(data);
      }
  })

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


    $('.table-responsive tbody').append('<tr><td><img src="https://thegolubcorporation.sharepoint.com/sites/MYReports/SiteAssets/MyReports/assets/brandgreen.png" alt="" /></td><td class="report_btn" id="' + attachmentFileUrls + '">' + name + '</td><td>' + report_type + '</td><td class="share_btn">Share</td></tr>');

    var row_1_count = $('.' + department + '_report_row_1 .report_1').length;
    var row_2_count = $('.' + department + '_report_row_2 .report_2').length;
    var row_3_count = $('.' + department + '_report_row_3 .report_3').length;
    var row_4_count = $('.' + department + '_report_row_4 .report_4').length;

    if (row_1_count < 4) {
      $('.' + department + '_report_row_1').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_1 report_1"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '">' + name + '</div></div></a></div>');
    } else if (row_2_count < 4) {
      $('.' + department + '_report_row_2').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_2 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '">' + name + '</div></div></a></div>');
    } else if (row_3_count < 4) {
      $('.' + department + '_report_row_2').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_3 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '">' + name + '</div></div></a></div>');
    } else if (row_3_count < 4) {
      $('.' + department + '_report_row_3').append('<div class="col-sm-6 col-md-3 main_select active_report active_report_4 report_2"><a href="' + attachmentFileUrls + '" target="blank"><div class=""><div class="item_title" data-type="' + report_type + '">' + name + '</div></div></a></div>');
    }
  }
  // sp services end



});



// $('input, select, textarea').on('focus blur', function(event) {
//   $('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1));
// });
