jQuery(document).ready(function($) {
    var MQL = 1170;
    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.page-header').outerHeight();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop(),
                    $catalog = $('.side-catalog');

                //check if user is scrolling up by mouse or keyborad
                // if (currentTop < this.previousTop) {
                //     //if scrolling up...
                //     if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                //         $('.navbar-custom').addClass('is-visible');
                //     } else {
                //         $('.navbar-custom').removeClass('is-visible is-fixed');
                //     }
                // } else {
                //     //if scrolling down...
                //     $('.navbar-custom').removeClass('is-visible');
                //     if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                // }
                this.previousTop = currentTop;


                //adjust the appearance of side-catalog
                if (currentTop > (headerHeight + 20)) {
                    $catalog.addClass('fixed');
                } else {
                    $catalog.removeClass('fixed');
                }
            });
    }
});