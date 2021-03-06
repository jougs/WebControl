
var isMobile = false; //initialize as false
$('.disabler').prop('disabled', true);
var isDisabled = true;

if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
  isMobile = true;
}

$(document).ready(function(){
	// Make all navbar drop down items collapse the menu when clicked.
	if (isMobile) {
		$("#navbarSupportedContent a.dropdown-item").attr("data-toggle", "collapse").attr("data-target", "#navbarSupportedContent");
	}
})

function processHealthMessage(data){
    //console.log(data.cpuUsage);
    $("#cpuUsage").text("CPU: "+Math.round(data.cpuUsage).toString()+"%");
    $("#mobileCPUUsage").text(Math.round(data.cpuUsage).toString()+"%");
    if (data.bufferSize == -1){
        if ($("#bufferSize").is(":hidden") == false){
            $("#bufferSize").hide();
        }
        if ((isMobile) && ($("#mobileBufferSize").is(":hidden") == false)){
            $("#mobileBufferSize").hide();
        }
    }
    else{
        if ($("#bufferSize").is(":hidden") == true){
            $("#bufferSize").show();
        }
        if ((isMobile) && ($("#mobileBufferSize").is(":hidden") == true)){
            $("#mobileBufferSize").show();
        }
        $("#bufferSize").text("Buffer: "+data.bufferSize.toString());
        $("#mobileBufferSize").text(data.bufferSize.toString());
    }


}

function processControllerStatus(data){
    if (data.status=="disconnected"){
      $("#controllerStatusAlert").text("Not Connected");
      $("#controllerStatusAlert").removeClass('alert-success').addClass('alert-danger');
      $("#mobileControllerStatusAlert").removeClass('alert-success').addClass('alert-danger');
      if (isMobile)
      {
        $("#mobileControllerStatusAlert").show();
        $("#mobileControllerStatusAlert svg.feather.feather-check-circle").replaceWith(feather.icons["alert-circle"].toSvg());
      }
      else
        $("#mobileControllerStatusAlert").hide();
      $("#mobileControllerStatusButton").hide();

      //feather.replace();
    }
    else
    {
      if (data.fakeServoStatus){
        text = data.port+" / Fake Servo ON";
        $("#controllerStatusAlert").hide();
        $("#mobileControllerStatusAlert").hide();
        if(isMobile)
        {
            $("#mobileControllerStatusButton").show();
            $("#mobileControllerStatusAlert svg.feather.feather-alert-circle").replaceWith(feather.icons["check-circle"].toSvg());
        }
        else
            $("#mobileControllerStatusAlert").hide();
        $("#controllerStatusButton").show();
        $("#controllerStatusButton").html(text);
        //feather.replace();
        //$("#mobileControllerStatus").removeClass('alert-success').addClass('alert-danger');

      }
      else{
        text = data.port;
        $("#controllerStatusAlert").show();
        if (isMobile){
            $("#mobileControllerStatusAlert").show();
            $("#mobileControllerStatusAlert svg.feather.feather-alert-circle").replaceWith(feather.icons["check-circle"].toSvg());
            $("#mobileControllerStatusAlert").removeClass('alert-danger').addClass('alert-success');
        }
        $("#controllerStatusButton").hide();
        $("#mobileControllerStatusButton").hide();
        $("#controllerStatusAlert").text(text);
        $("#controllerStatusAlert").removeClass('alert-danger').addClass('alert-success');

        //feather.replace();
      }
    }
}

function processActivateModal(data){
    var $modal, $modalTitle, $modalText
    var message
    //console.log(data)
    if (data.modalType == "content"){
      $modal = $('#contentModal');
      $modalDialog = $('#contentDialog');
      $modalTitle = $('#contentModalTitle');
      $modalText = $('#contentModalText');
      if (data.resume=='footerSubmit'){
        $('#footerSubmit').show();
      } else {
        $('#footerSubmit').hide();
      }
      console.log("content modal")
      //message = JSON.parse(data.message);
      message = data.message;
    }
    else if (data.modalType == "alert") {
      $modal = $('#alertModal');
      $modalDialog = $('#alertDialog');
      $modalTitle = $('#alertModalTitle');
      $modalText = $('#alertModalText');
      if (data.resume=="clear"){
          $('#clearButton').show();
      } else {
          $('#clearButton').hide();
      }
      //data is coming in as a jsonified string.. need to drop the extra quotes
      message = JSON.parse(data.message);
    }
    else{
      $modal = $('#notificationModal');
      $modalDialog = $('#notificationDialog');
      $modalTitle = $('#notificationModalTitle');
      $modalText = $('#notificationModalText');
      if (data.resume=="resume"){
        $('#resumeButton').show();
      } else {
        $('#resumeButton').hide();
      }
      if (data.fakeServo=="fakeServo"){
        $('#fakeServoButton').show();
      } else {
        $('#fakeServoButton').hide();
      }
      if (data.progress=="true"){
        $('#progressBarDiv').show();
      } else {
        $('#progressBarDiv').hide();
      }
      if (data.progress=="spinner"){
        $('#notificationCircle').show();
      } else {
        $('#notificationCircle').hide();
      }
      message = data.message;
    }
    $modalDialog.removeClass('modal-lg');
    $modalDialog.removeClass('modal-sm');
    $modalDialog.removeClass('mw-100 w-75');
    if (data.modalSize=="large"){
      if (isMobile)
        $modalDialog.addClass('modal-lg');
      else
        $modalDialog.addClass('mw-100 w-75');
    }
    if (data.modalSize=="medium")
      $modalDialog.addClass('modal-lg');
    if (data.modalSize=="small")
      $modalDialog.addClass('modal-sm');
    //$modal.data('bs.modal',null);
    $modal.data('name',data.title);

    $modalTitle.html("<h3>"+data.title+"</h3");
    $modalText.html(message);

    if (!($modal.data('bs.modal') || {})._isShown){
        console.log("showing modal")
        $modal.modal();
    }
    if (data.isStatic==true){
        console.log("Static Modal")
        $modal.data('bs.modal')._config.backdrop = 'static';
        $modal.data('bs.modal')._config.keyboard = false;
    } else {
        console.log("showing non static modal")
        $modal.data('bs.modal')._config.backdrop = true;
        $modal.data('bs.modal')._config.keyboard = true;
    }
    console.log($modal.data('bs.modal')._config.backdrop)
    console.log($modal.data('bs.modal')._config.keyboard)
    $modalText.scrollTop(0);
}


function closeModals(data){
    console.log(data)
    if ($('#notificationModal').data('name') == data.title)
    {
      console.log("here, closing notification modal");
      $('#notificationModal').modal('hide');
      $('#notificationCircle').hide()
    }
}

/*
todo: cleanup
Not used
function closeActionModals(data){
    if ($('#actionModal').data('name') == data.title)
    {
      $('#actionModal').modal('hide');
    }
}
*/

function closeAlertModals(data){
    if ($('#alertModal').data('name') == data.title)
    {
      $('#alertModal').modal('hide');
    }
}

function closeContentModals(data){
    if ($('#contentModal').data('name') == data.title)
    {
      $('#contentModal').modal('hide');
    }
};


$.fn.scrollBottom = function() {
    return $(this).scrollTop($(this)[0].scrollHeight);
};


function setupStatusButtons(){
  if (isMobile){
      $('#mobileClientStatus').show();
      $('#mobileCPUUsage').show();
      $('#mobileControllerStatusAlert').show();
      $('.navbar-brand').hide();
  } else {
    $('#mobileClientStatus').hide();
    $('#mobileCPUUsage').hide();
    $('#mobileBufferSize').hide();
    $('#mobileControllerStatusAlert').hide();
    $('#mobileControllerStatusButton').hide();
  }
}

function pyInstallUpdateBadge(data){
    console.log("---##-")
    console.log(data);
    $('#helpBadge').html("1");
    $('#updateBadge').html("1");
    console.log("---##-")
}

