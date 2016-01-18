$( document ).ready(function() {

var method = "GetListItems";

//The display name of the list we are reading data from
var list = "MainMenuList";

var fieldsToRead =     "<ViewFields>" +
						"<FieldRef Name='Title' />" +
						"<FieldRef Name='DisplayOrder' />" +
						"<FieldRef Name='Link' />" +
					"</ViewFields>";

var query = "<Query><Where><Neq><FieldRef Name='DisplayOrder' /><Value Type='Number'>0</Value></Neq></Where>" +
			"<OrderBy><FieldRef Name='DisplayOrder' /></OrderBy></Query>"

	//alert("query = " + query);

	// arrays that contain menu descriptions and links
	var descriptions = [];
	var displayOrder = [];
	var URLs = [];
	var iLength = 0;
	var iPtr = 0; // this is the current position in the sharepoint list (descriptions, URLs, displayorder)

	// needed for building menu
	var column = 1;
	var row = 0;

	$().SPServices({
			operation: method,
			async: false,
			// webURL: "https://thegolubcorporation.sharepoint.com/sites/NewGolub2015/Policies/",
			webURL: "https://thegolubcorporation.sharepoint.com/sites/NewGolub2015/_layouts/15/viewlsts.aspx",
			listName: list,
			CAMLQuery: query,
			CAMLViewFields: fieldsToRead,
			completefunc: function (xData, Status) {
			//$(xData.responseXML).find("z\\:row, row").each(function() {
			  $(xData.responseXML).SPFilterNode("z:row").each(function() {
				// Loop through and add
					var name = ($(this).attr("ows_Title"));
					var order = ($(this).attr("ows_DisplayOrder"));
					var shPt_URL = ($(this).attr("ows_Link"));
					var URL = "#";
					if (shPt_URL != undefined)  // if there is an actual sharepoint URL in the list, the 1st element is URL
						URL = (shPt_URL).split(",")[0];

					descriptions.push(name);
					displayOrder.push(order);
					URLs.push(URL);

				});
			}
	});


function GetParent(myId)
{
	var ulParent;
	// if list item Id's 4.0, 4.e
	// myId = 4.e = department

	var i = myId.lastIndexOf(".");
	if (i < 0) // didn't find "."
		ulParent = $("#ulMainMenu");
	else
	{
		var csParentId;
		var csTemp = myId.substring(0,i);
		var csNewTemp = ReplaceDots(csTemp, "_");
		csParentId = "#" + "ul_" + csNewTemp; // unrecognized expression with quotes // '"' + "#" + "ul" + csTemp + '"';

		ulParent = $(csParentId);
	}
	return ulParent;
}

function GetMyListId(myId, myPrefix)
{
	// ul's with a "." in the id aren't able to form list -- get a weird <ul id="1.a" \> instead of <ul id="1.a">
	// var csId = "ul" + myId;
	var csId = ""; // need to initialize  strings if you += down below, otherwise get "undefined" as part of name
	csId = myPrefix + ReplaceDots(myId,"_");

	return csId;
}

function ReplaceDots(myId,thisChar)
{
	var csId;
	var j;

	var csId = ""; // need to initialize  strings if you += down below, otherwise get "undefined" as part of name

	for(j=0; j<myId.length; j++)
	{
		if (myId.charAt(j) == ".")
			csId += thisChar;
		else
			csId += myId.charAt(j);
	}

	return csId;
}

function AddListItems(descriptions, URLs, displayOrder, k)
{

	//  this associates multiple css rules, "nav", "navbar-nav", and "this-nav" to the element
	//var liMainMenu = $('<ul></ul>').addClass("nav navbar-nav this-nav");

	var ulParent = GetParent(displayOrder[k]);

	// if the list item doesn't have a parent, don't create the list item, or child lists...
	if (ulParent) // 1. create list item and LINK then 2. determine if the list item contains a child list
	{
		depth = GetDepth(displayOrder[k]);

		var liCell;
		var aCell;

		if (depth == 1)
		{
			// create a Cell
			liCell = $('<li></li>').attr("role","presentation");
			liCell.addClass("dropdown");
			liCell.attr("id",GetMyListId(displayOrder[k],"li_"));

			// create a tag
			aCell = $('<a></a>').addClass("dropdown-toggle");
			aCell.attr("data-toggle","dropdown");
			aCell.attr("style","text-decoration:none;color:#fff !important");
			aCell.attr("role","button");
			aCell.attr("aria-expanded","false");

		}
		else
		{
			liCell = $('<li></li>');
			liCell.attr("id",GetMyListId(displayOrder[k],"li_"));

			aCell = $('<a></a>');
			aCell.attr("style","text-decoration:none;color:#fff !important");
		}

		//liCell.attr("id",GetMyListId(displayOrder[k],"li_")); wth
		aCell.attr("href",URLs[k]);
		aCell.text(descriptions[k]);  	// give the link a name
		liCell.append(aCell);			// Append Link to the Cell
		ulParent.append(liCell);		// Append Cell to it's Parent
		liCell.addClass("level" + depth);

		// determine if list item has a child list...
		// add a ul under this list item
		if ( ((k+1) < descriptions.length) && (IsSubMenu(displayOrder[k],displayOrder[k+1])) )
		{
			// adjust the class of the container cell created above
			if (depth > 1) // set class for style
				liCell.addClass("dropdown-submenu");


			// Create Child Menu
			// create an unordered list
			var ulChildList = $('<ul></ul>');
			// Need Id's for lists in order to get parents
			ulChildList.attr("id",GetMyListId(displayOrder[k],"ul_")); // ul4, ul4.e = "departments" - this is the only list item that has additional menus under it

			ulChildList.addClass("dropdown-menu");
			if (depth == 1)
			{
				ulChildList.attr("role","menu");
			}

			ulChildList.addClass("level" + (depth+1));

			// append ul to it's Parent - the Cell we created above
			liCell.append(ulChildList);

		}
	}

	if ( (k+1) < displayOrder.length) AddListItems(descriptions, URLs, displayOrder, ++k);

}

function GetDepth(csCurrent)
{
	var iCurrent = csCurrent.split(".");
	var lenCurrent = iCurrent.length;
	var depth = lenCurrent;

	return depth;
}



function IsSubMenu(csCurrent, csNext)
{
	var bIsSubMenu = false;

	if ( (GetDepth(csCurrent)+ 1) == GetDepth(csNext) )
		bIsSubMenu = true;

	// if there are a different number of "." in csCurrent and csNext,
	// then there is a new menu
	return bIsSubMenu;
}

function AddSearchBox()
{

	var liSearchBox = $('<li></li>').addClass("dropdown");
	$("#ulMainMenu").append(liSearchBox);

	liSearchBox.attr("role","presentation");

	var div = $('<div></div>').attr("data-name","SearchBox");
	liSearchBox.append(div);

	var string = '<div class="ms-webpart-chrome ms-webpart-chrome-fullWidth "><div webpartid="00000000-0000-0000-0000-000000000000" haspers="true" id="WebPart" width="100%" class="ms-WPBody noindex " onlyformepart="true" allowdelete="false" style=""><div componentid="ctl00_ctl03_csr" id="ctl00_ctl03_csr"><div id="SearchBox" name="Control"><div class="ms-srch-sb ms-srch-sb-border" id="ctl00_ctl03_csr_sboxdiv"><input type="text" placeholder="Search..." maxlength="2048" accesskey="S" title="Search..." id="ctl00_ctl03_csr_sbox" autocomplete="off" autocorrect="off" onkeypress="EnsureScriptFunc(\'Search.ClientControls.js\', \'Srch.U\', function() {if (Srch.U.isEnterKey(String.fromCharCode(event.keyCode))) {$find(\'ctl00_ctl03_csr\').search($get(\'ctl00_ctl03_csr_sbox\').value);return Srch.U.cancelEvent(event);}})" onkeydown="EnsureScriptFunc(\'Search.ClientControls.js\', \'Srch.U\', function() {var ctl = $find(\'ctl00_ctl03_csr\');ctl.activateDefaultQuerySuggestionBehavior();})" onfocus="EnsureScriptFunc(\'Search.ClientControls.js\', \'Srch.U\', function() {var ctl = $find(\'ctl00_ctl03_csr\');ctl.hidePrompt();ctl.setBorder(true);})" onblur="EnsureScriptFunc(\'Search.ClientControls.js\', \'Srch.U\', function() {var ctl = $find(\'ctl00_ctl03_csr\'); if (ctl){ ctl.showPrompt(); ctl.setBorder(false);}})" class="ms-textSmall ms-srch-sb-prompt ms-helperText" /><a title="Search" class="ms-srch-sb-searchLink" id="ctl00_ctl03_csr_SearchLink" onclick="EnsureScriptFunc(\'Search.ClientControls.js\', \'Srch.U\', function() {$find(\'ctl00_ctl03_csr\').search($get(\'ctl00_ctl03_csr_sbox\').value);})" href="javascript: {}"><img src="https://thegolubcorporation.sharepoint.com/_layouts/15/images/searchresultui.png?rev=40#ThemeKey=searchresultui" class="ms-srch-sb-searchImg" id="searchImg" alt="Search" /></a></div></div></div><noscript><div id="ctl00_ctl03_noscript">It looks like your browser does not have JavaScript enabled. Please turn on JavaScript and try again.</div></noscript><div id="ctl00_ctl03" style="border-color:Red;border-style:None;"></div><div class="ms-clear"></div></div></div>';
	div.append(string);

	// MLS 9/10/15 This is the code for the search box
	// <li role="presentation" class="dropdown">
    //     <div data-name="SearchBox">
    //         <!--CS: Start Search Box Snippet-->
    //         <!--SPM:<%@Register Tagprefix="SearchWC" Namespace="Microsoft.Office.Server.Search.WebControls" Assembly="Microsoft.Office.Server.Search, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>-->
    //         <!--MS:<SearchWC:SearchBoxScriptWebPart UseSiteCollectionSettings="true" runat="server" BorderColor="Red" BorderStyle="None" EmitStyleReference="False" ServerInitialRender="True" ShowQuerySuggestions="False" TryInplaceQuery="False" UseSharedSettings="True" ChromeType="None">-->
    //             <!--PS: Start of READ-ONLY PREVIEW (do not modify)--><div class="ms-webpart-chrome ms-webpart-chrome-fullWidth "><div webpartid="00000000-0000-0000-0000-000000000000" haspers="true" id="WebPart" width="100%" class="ms-WPBody noindex " onlyformepart="true" allowdelete="false" style=""><div componentid="ctl00_ctl03_csr" id="ctl00_ctl03_csr"><div id="SearchBox" name="Control"><div class="ms-srch-sb ms-srch-sb-border" id="ctl00_ctl03_csr_sboxdiv"><input type="text" value="Search..." maxlength="2048" accesskey="S" title="Search..." id="ctl00_ctl03_csr_sbox" autocomplete="off" autocorrect="off" onkeypress="EnsureScriptFunc('Search.ClientControls.js', 'Srch.U', function() {if (Srch.U.isEnterKey(String.fromCharCode(event.keyCode))) {$find('ctl00_ctl03_csr').search($get('ctl00_ctl03_csr_sbox').value);return Srch.U.cancelEvent(event);}})" onkeydown="EnsureScriptFunc('Search.ClientControls.js', 'Srch.U', function() {var ctl = $find('ctl00_ctl03_csr');ctl.activateDefaultQuerySuggestionBehavior();})" onfocus="EnsureScriptFunc('Search.ClientControls.js', 'Srch.U', function() {var ctl = $find('ctl00_ctl03_csr');ctl.hidePrompt();ctl.setBorder(true);})" onblur="EnsureScriptFunc('Search.ClientControls.js', 'Srch.U', function() {var ctl = $find('ctl00_ctl03_csr'); if (ctl){ ctl.showPrompt(); ctl.setBorder(false);}})" class="ms-textSmall ms-srch-sb-prompt ms-helperText" /><a title="Search" class="ms-srch-sb-searchLink" id="ctl00_ctl03_csr_SearchLink" onclick="EnsureScriptFunc('Search.ClientControls.js', 'Srch.U', function() {$find('ctl00_ctl03_csr').search($get('ctl00_ctl03_csr_sbox').value);})" href="javascript: {}"><img src="https://thegolubcorporation.sharepoint.com/_layouts/15/images/searchresultui.png?rev=40#ThemeKey=searchresultui" class="ms-srch-sb-searchImg" id="searchImg" alt="Search" /></a></div></div></div><noscript><div id="ctl00_ctl03_noscript">It looks like your browser does not have JavaScript enabled. Please turn on JavaScript and try again.</div></noscript><div id="ctl00_ctl03" style="border-color:Red;border-style:None;"></div><div class="ms-clear"></div></div></div><!--PE: End of READ-ONLY PREVIEW-->
    //         <!--ME:</SearchWC:SearchBoxScriptWebPart>-->
    //         <!--CE: End Search Box Snippet-->
    //     </div>
    // </li>

}

function CreateMainMenu(descriptions, links, order)
{

	iPtr = 0;
	AddListItems(descriptions, links, order, iPtr);

	// add the search box to end of ulMainMenu.
	AddSearchBox();
}


	CreateMainMenu(descriptions, URLs, displayOrder);
	$('ul.level3').hide();
	$('ul.level4').hide();


});
/* These methods were used to troubleshoot an issue I had with hover events
// They weren't getting instantiated because they were missing a function wrapper.
// Nick figured it out. Every event handler needs to be wrapped in
//  $(function() {// put in here})
$('#li_3').hover(function(){
	$('#ul_3').show();
});

$('#li_4').hover(function(){
	$('#ul_4').show();
});


$(function() {
$('#li_4_e').hover(function() {
	$('#ul_4_e').show();
});
});

$(function() {
$('#li_4_e_1').hover(function() {
	$('#ul_4_e_1').show();
});
});
*/


/* This event handler triggers a hover event for every list item. We only want to
// have a hover event for list items with submenus, so that we can show the submenus
$(function() {
$('#ulMainMenu li').hover(function() {

	var myClass;
	var liCell;
	var ulChildList

	liCell = $(this);
	ulChildList = $(liCell > 'ul.level2');

	if (this.hasClass("level2")) ulChildList = $(liCell > 'ul.level3');
	else if (this.hasClass("level3")) ulChildList = $(liCell > 'ul.level4');

	ulChildList.show();
},
function () {

		// On Exit, Do this...

});
});
*/

// I don't want to trigger this event for all li.level2 elements -
// I only want to trigger a hover event list items containing child lists...
// hence the reason why the next 2 functions were written.
//
/*
$(function() {
$('#ulMainMenu li.level2').hover(function () {
						//alert("break here");
                        var ulChild = $(this > 'ul.level3');
						if (ulChild) ulChild.show();
                        //$('ul.level4').hide();
},
function () {

	// On Exit, Do this...
	var ulChild = $(this > 'ul.level3');
	if (ulChild) ulChild.hide();

});
});
*/

// The next 2 hover events only get triggered when there is a dropdown-submenu (class)
// on the list item. So not on every list item

// This method uses id's which I assigned to them while building the menus.
// This method builds the id of the child list and shows the child list.
$(function () {
        $('#ulMainMenu li.dropdown-submenu').hover(function () {
            if ($(window).width() > 767) {
                var myId;
                myId = this.id;
                var myChildId = "#" + myId.replace("li", "ul");
                var myChild = $(myChildId);

                if (myChild) myChild.show();
            }
        },
        function () {

            // On Exit, Do this...
            if ($(window).width() > 767) {
                var myId;
                myId = this.id;
                var myChildId = "#" + myId.replace("li", "ul");
                var myChild = $(myChildId);

                if (myChild) myChild.hide();
            }
        });
        var lastmenu;
        var menu;
        $('#ulMainMenu li.dropdown-submenu').click(function () {
            if ($(window).width() < 768) {
                if (lastmenu) {
                    lastmenu.hide();
                    lastmenu = null;
                }
                var myId;
                myId = this.id;
                var myChildId = "#" + myId.replace("li", "ul");
                var myChild = $(myChildId);
                lastmenu = myChild;
                if (this == menu) {
                    myChild.hide();
                    menu = null;
                } else {
                    menu = this;
                    if (myChild) {
                        $(this).parents("ul").each(function () {
                            $(this).show();
                        });
                        myChild.show();
                    }
                }
            }
            return false;
        });
        $('.level4 > a').click(function () {
            window.location = $(this).attr("href");
        });
        $('.level3 > a').click(function () {
            window.location = $(this).attr("href");
        });
});

// This method uses levels which I assigned while building the menus
// It finds the child list at the next level and shows it.
/*
$(function() {
$('li.dropdown-submenu').hover(function () {

	// find the depth in the class string
	var myClass = this.className;
	var pos = myClass.indexOf("level");
	var myLevel = myClass.substr(pos+5,1);
	var nextLevel = "ul.level" + (++myLevel);

    var ulChild;
	// ulChild = $(this > nextLevel);
	ulChild = $(this).find(nextLevel);
	if (ulChild) ulChild.show();

},
function () {

	// On Exit, Do this...
	var myClass = this.className;
	var pos = myClass.indexOf("level");
	var myLevel = myClass.substr(pos+5,1);
	var nextLevel = "ul.level" + (++myLevel);

    var ulChild;
	// ulChild = $(this > nextLevel);
	ulChild = $(this).find(nextLevel);
	if (ulChild) ulChild.hide();


});
});
*/


$('.search-entry').on("keypress",function () {
    if (event.keyCode == 13) { event.preventDefault(); }
});




$(document).on('mouseover', "a:contains('Stores'),a:contains('Main Office'),a:contains('Distribution'), .level4", function(){
	$("a:contains('Departments')").css('background', '#8A0808', '!important');
});
