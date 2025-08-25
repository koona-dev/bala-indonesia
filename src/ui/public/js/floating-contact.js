$(document).ready(function () {
  //------- Floating button --------//

  window.addEventListener("load", function () {
    var _arCuTimeOut = null;
    var arCuClosedCookie = 0;
    var arcItems = [];

    arCuClosedCookie = arCuGetCookie("arcu-closed");
    jQuery("#arcontactus").on("arcontactus.init", function () {
      if (arCuClosedCookie) {
        return false;
      }
      arCuShowMessages();
    });
    jQuery("#arcontactus").on("arcontactus.openMenu", function () {
      clearTimeout(_arCuTimeOut);
      arCuPromptClosed = true;
      jQuery("#contact").contactUs("hidePrompt");
      arCuCreateCookie("arcu-closed", 1, 30);
    });
    jQuery("#arcontactus").on("arcontactus.hidePrompt", function () {
      clearTimeout(_arCuTimeOut);
      arCuPromptClosed = true;
      arCuCreateCookie("arcu-closed", 1, 30);
    });
    var arcItem = {};
    arcItem.id = "msg-item-7";
    arcItem.class = "msg-item-envelope";
    arcItem.title = "Email Info";
    arcItem.icon =
      '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z"></path></svg>';
    arcItem.href = "mailto:info@tradesolutionlimited.com";
    arcItem.color = "#FF643A";
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = "msg-item-8";
    arcItem.class = "msg-item-phone";
    arcItem.title = "Whatsapp";
    arcItem.icon =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>';
    arcItem.href = "https://api.whatsapp.com/send?phone=85246434463";
    arcItem.color = "#4EB625";
    arcItems.push(arcItem);
    jQuery("#arcontactus").contactUs({
      items: arcItems,
    });
  });
});
