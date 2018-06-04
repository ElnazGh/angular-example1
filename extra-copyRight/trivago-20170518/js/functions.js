$(function() {
    // Menu
    var val = 1;

    $(".nav-bar").click(function(){
        if (val == 1) {

            $("header nav").animate({
                'left' : '0' // open from right > right
            });
            val = 0;
        }else{
            val = 1;
            $("header nav").animate({
                'left' : '-100%' // open from right > right
            });
        }
        return false;
        });

        $(".nav-bar-close").click(function(){
            val = 1;
            $("header nav").animate({
                'left' : '-100%' // open from right > right
            }); 
        });

        // submenu
        $('.sub-menu').click(function(){
            $(this).children('.children').slideToggle();
        })

        //Date Range Picker
        // implementation of disabled form fields
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        var checkin = $('#check-in').fdatepicker({
          onRender: function (date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
          }
        }).on('changeDate', function (ev) {
          if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate() + 1);
            checkout.update(newDate);
          }
          checkin.hide();
          $('#check-out')[0].focus();
        }).data('datepicker');
        var checkout = $('#check-out').fdatepicker({
          onRender: function (date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
          }
        }).on('changeDate', function (ev) {
          checkout.hide();
        }).data('datepicker');


    // In case of not allowing for using “data-popup” attributes, this section and its related jQuery code has been commented out 

    // Open popup
    // $('[data-popup-open]').on('click', function(e)  {
    //     var targeted_popup_class = jQuery(this).attr('data-popup-open');
    //     $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

    //     e.preventDefault();
    // });

    // Close popup
    // $('[data-popup-close]').on('click', function(e)  {
    //     var targeted_popup_class = jQuery(this).attr('data-popup-close');
    //     $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

    //     e.preventDefault();
    // });

    //First Popup -popupA

    // Open
    $('#popupContainerA .btn').on('click', function(e) {
        $("#popupA").fadeIn(350);
        e.preventDefault();
    });
    // Close
    $('.popup-close').on('click', function(e) {
        $('#popupA').fadeOut(350);
        e.preventDefault();
    });

    //Second Popup - popupB 

    // Open
    $('#popupContainerB .btn').on('click', function(e) {
        $("#popupB").fadeIn(350);
        e.preventDefault();
    });
    // Close
    $('.popup-close').on('click', function(e) {
        $('#popupB').fadeOut(350);
        e.preventDefault();
    });

    //Third Popup - popupC

    // Open
    $('#popupContainerC .btn').on('click', function(e) {
        $("#popupC").fadeIn(350);
        e.preventDefault();
    });
    // Close
    $('.popup-close').on('click', function(e) {
        $('#popupC').fadeOut(350);
        e.preventDefault();
    });

   

});