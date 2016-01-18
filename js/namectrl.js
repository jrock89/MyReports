

var nameCtrl = null;

$(document).ready(function () {

    try {
        if (window.ActiveXObject) {
            nameCtrl = new ActiveXObject("Name.NameCtrl");

        } else {
            nameCtrl = CreateNPApiOnWindowsPlugin("application/x-sharepoint-uc");
        }
        attachLyncPresenceChangeEvent();
    }
    catch (ex) { }



function IsSupportedNPApiBrowserOnWin() {
    return true; // SharePoint does this: IsSupportedChromeOnWin() || IsSupportedFirefoxOnWin()
}

function IsNPAPIOnWinPluginInstalled(a) {
    return Boolean(navigator.mimeTypes) && navigator.mimeTypes[a] && navigator.mimeTypes[a].enabledPlugin
}

function CreateNPApiOnWindowsPlugin(b) {
    var c = null;
    if (IsSupportedNPApiBrowserOnWin())
        try {
            c = document.getElementById(b);
            if (!Boolean(c) && IsNPAPIOnWinPluginInstalled(b)) {
                var a = document.createElement("object");
                a.id = b;
                a.type = b;
                a.width = "0";
                a.height = "0";
                a.style.setProperty("visibility", "hidden", "");
                document.body.appendChild(a);
                c = document.getElementById(b)
            }
        } catch (d) {
            c = null
        }
    return c
}















function addUser() {
    var userName = 'Jesserock@golub.com';
    var userElementId = getId(userName);
    $('<div/>', {
        text: userName,
        id: userElementId,
        class: 'user',
        onmouseover: "showLyncPresencePopup('" + userName + "', this)",
        onmouseout: "hideLyncPresencePopup()",
    }).appendTo('#users');

    if (nameCtrl) {
        nameCtrl.GetStatus(userName, 'users');
    }
    // $('#userName').val('');
}

function getLyncPresenceString(status) {

    switch (status) {
        case 0:
            return 'available';
            break;
        case 1:
            return 'offline';
            break;
        case 2:
        case 4:
        case 16:
            return 'away';
            break;
        case 3:
        case 5:
            return 'inacall';
            break;
        case 6:
        case 7:
        case 8:
        case 10:
            return 'busy';
            break;
        case 9:
        case 15:
            return 'donotdisturb';
            break;
        default:
            return '';
    }
}

function attachLyncPresenceChangeEvent() {
    if (!nameCtrl) {
        return;
    }
    nameCtrl.OnStatusChange = onLyncPresenceStatusChange;
}

function onLyncPresenceStatusChange(userName, status, id) {
    var presenceClass = getLyncPresenceString(status);

    var userElementId = getId(userName);
    var userElement = $('#' + userElementId);
    removePresenceClasses(userElement);
    userElement.addClass(presenceClass);

}

function removePresenceClasses(jqueryObj) {
    jqueryObj.removeClass('available');
    jqueryObj.removeClass('offline');
    jqueryObj.removeClass('away');
    jqueryObj.removeClass('busy');
    jqueryObj.removeClass('donotdisturb');
    jqueryObj.removeClass('inacall');
}

function getId(userName) {
    return userName.replace('@', '_').replace('.', '_');
}

function showLyncPresencePopup(userName, target) {
    if (!nameCtrl) {
        return;
    }

    var eLeft = $(target).offset().left;
    var x = eLeft - $(window).scrollLeft();

    var eTop = $(target).offset().top;
    var y = eTop - $(window).scrollTop();

    nameCtrl.ShowOOUI(userName, 0, x, y);
}

function hideLyncPresencePopup() {
    if (!nameCtrl) {
        return;
    }
    nameCtrl.HideOOUI();
}



$(document).on('mouseover click', '.the_owner', function(){

  var theUser = $(this).text();
  theUser = theUser.replace(/\s/g, '');
  theUser = theUser + "@golub.com"

  hideLyncPresencePopup();
  showLyncPresencePopup ( theUser, this);
})

$(document).on('click', '.inner_recipient', function(){

  var theUser = $(this).closest('.recipient_wrapper').find('.recipient_name').text();
  theUser = theUser.replace(/\s/g, '');
  theUser = theUser + "@golub.com"

  hideLyncPresencePopup();
  showLyncPresencePopup ( theUser, this);
})


$(document).on('mouseleave', '.reports_user_img, .the_owner', function(){
  hideLyncPresencePopup();
})

});
