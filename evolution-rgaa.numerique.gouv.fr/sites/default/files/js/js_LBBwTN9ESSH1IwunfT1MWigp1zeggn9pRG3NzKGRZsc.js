/**
 * Script for collapsible elements
 */
(function($) {

  'use strict';

  $(document).ready(function() {
    
    // toggle on click on the button
    $('body').on('click', '.js-collapsible-cta', function(event) {
      var cta = $(this);
      var parent = $(cta).closest('.js-collapsible');
      var content = $('#' + $(cta).attr('aria-controls'));

      if ($(cta).attr('aria-expanded') === 'false') {
        $(cta).attr('aria-expanded', 'true');
        $(parent).addClass('is-expanded');
        // custom event
        $(parent).trigger('collapsible-open');
      } else {
        $(cta).attr('aria-expanded', 'false');
        $(parent).removeClass('is-expanded');
        // custom event
        $(parent).trigger('collapsible-close');
      }
    });

    // close on click somewhere else
    $('body').on('click focusin', function(event) {
      var target = event.target;
      // maybe the click is somewhere inside a collapsible
      var parent = $(target).closest('.js-collapsible');

      // for all open collapsibles, but not the one where the click happens
      $('.js-collapsible.is-expanded').not(parent).each(function() {
        var collapsible = this;
        // only if their data-collapsible-close==true 
        if ($(collapsible).attr('data-collapsible-close') === 'true') {
          var cta = $(collapsible).find('.js-collapsible-cta');
          // close them
          $(cta).attr('aria-expanded', 'false');
          $(collapsible).removeClass('is-expanded');
          // custom event
          $(collapsible).trigger('collapsible-close');
        }
      });
    });

  });

})(jQuery);;
/**
 * Script for main menu
 */
(function($) {
  'use strict';

  $(document).ready(function() {


    $('.menu-collapsible').find('button.menu__link.nolink').attr('aria-expanded', 'false');
    // open on click on items
    $('body').on('click', '.region-navigation .menu__item', function (event) {
      var target = event.target;
      var item = $(target).closest('.menu__item');

      // only if the item has a submenu
      if ($(item).find('.menu').length > 0) {
        // if not opened : close others and open this item
        if (!$(item).is('.is-open')) {
          $('.region-navigation .menu__item.is-open').removeClass('is-open').find('> .menu__link.nolink').attr('aria-expanded', 'false');
          $(item).addClass('is-open').find('> .menu__link.nolink').attr('aria-expanded', 'true');
        // else = opened, close this item
        } else {
          $(item).removeClass('is-open').find('> .menu__link.nolink').attr('aria-expanded', 'false');
        }
        // prevent opening link
        return false;
      }
    });

    // close on click somewhere else
    $('body').on('click focusin', function(event) {
      var target = event.target;
      if ($(target).closest('.region-navigation .menu').length == 0) {
        $('.region-navigation .menu__item.is-open').removeClass('is-open').find('> .menu__link.nolink').attr('aria-expanded', 'false');
      }
    });

  });

})(jQuery);;
/**
 * Scripts
 */
(function($, Drupal) {

  deleteCookie = function(name, domain) {
    document.cookie = name + "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = name + "=; Path=/; Domain=" + domain + "; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  Drupal.behaviors.Dialoguons = {
    attach: function (context, settings) {
      if (Drupal.eu_cookie_compliance) {
        var $eu_cookie_compliance = Drupal.eu_cookie_compliance.hasAgreed();
        if (!$eu_cookie_compliance) {
          var $googleanalytics_account = Drupal.settings.dialoguons.googleanalytics_account;
          if ($googleanalytics_account) {
            window['ga-disable-' + $googleanalytics_account] = true;
          }
          var cookies = document.cookie.split(";");
          for(var i=0; i < cookies.length; i++) {
            var equals = cookies[i].indexOf("=");
            var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
            deleteCookie(name, Drupal.settings.dialoguons.domain);
          }
        }
      }
    }
  };

  $(window).resize(function(e) {
    $width = $(window).width();
    $('body').removeClass('large tablette mobile');
    if($width > 767) {
      if($width > 1030) {
        $('body').addClass('large');
      } else {
        $('body').addClass('tablette');
      }
    } else {
      $('body').addClass('mobile');
    }
  });

  $(document).ready(function() {



    /**
     * Override modal_form popup markup.
     */
    Drupal.theme.prototype.ModalFormsPopup = function () {
      var html = '';

      html += '<div id="ctools-modal" class="popups-box">';
      html += '  <div class="ctools-modal-content modal-forms-modal-content" role="dialog" aria-labelledby="modal-title">';
      html += '    <div class="popups-container">';
      html += '      <div class="modal-header popups-title">';
      html += '        <h1 id="modal-title" class="modal-title"></h1>';
      html += '        <button class="popups-close close">' + Drupal.CTools.Modal.currentSettings.closeText + '</button>';
      html += '        <div class="clear-block"></div>';
      html += '      </div>';
      html += '      <div class="modal-scroll"><div id="modal-content" class="modal-content popups-body"></div></div>';
      html += '    </div>';
      html += '  </div>';
      html += '</div>';

      return html;
    };


    $('body').removeClass('no-js').addClass('js');

    $width = $(window).width();
    if($width > 767) {
      if($width > 1030) {
        $('body').addClass('large');
      } else {
        $('body').addClass('tablette');
      }
    } else {
      $('body').addClass('mobile');
    }

    $('.not-logged-in.mobile #contribution_toolbar .add-link').click(function(event) {
        $('body, html').animate({ scrollTop: 0 }, 'slow');
      });

    $('a[href^="#"]').click(function(){
      var id = $(this).attr("href");
      var offset = $(id).offset().top;
      $('html, body').animate({scrollTop: offset}, 'slow'); 
      return false;
    });

    if($('.node-type-actualite .comment-detail').length) {
      $('.node-type-actualite .comment-detail').hide();
      $('.node-type-actualite .nb-comments a').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parents('.comments-container').find('div.comment-detail').toggle('slow');
        return false;
      });
    }

    if($('.my_contributions_news .comment-detail').length) {
      $('.my_contributions_news .comment-detail').hide();
      $('.my_contributions_news .nb-comments a').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parents('.comments-container').find('div.comment-detail').toggle('slow');
        return false;
      });
    }

    if($('.my_comments_news .comment-detail').length) {
      $('.my_comments_news .nb-comments a').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parents('.comments-container').find('div.comment-detail').toggle('slow');
        return false;
      });
    }

    if($('.node-type-contribution .contrib-items .comment-detail').length) {
      $('.node-type-contribution .contrib-items .comment-detail').show();
      $('.node-type-contribution .nb-comments a').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
    }

    /*---------- = Bloc Custom Search ----------- */
    $('.block-custom-search-blocks input.custom-search-box').attr("placeholder", "Rechercher");

    $('.search-collapsible').on('collapsible-open', function() {
      var input = $(this).find('.form-text');
      window.setTimeout(function() {
        $(input).focus();
      }, 100);
    });


    // ----------------- Retour haut de page ----------------
    var $button = $('.back-top');

    // Show back to top button if scroll from top is more than 600px
    $(window).scroll(function() {
      ($(this).scrollTop() > 700) ? $button.addClass('active') : $button.removeClass('active');
    });

    // Animate scroll to top
    $button.on('click', function(e){
      e.preventDefault();
      var target = $(this).attr('href');
      $('body, html').animate({ // html pour firefox, body pour chrome
        scrollTop: 0
      }, 'slow', 'linear', function () {
        $(target).focus(); // mettre un tabindex="-1" sur la cible si c'est un element qui ne recoit pas le focus par defaut
      });
    });


    /*---------- = Navigation skip link ----------*/
    var $skip = $('#skip-link');
    $skip.removeClass('skip-link').addClass('skip-link-js');
    $skip.addClass('hidden-link');
    $skip.on('focus', 'a', function() {
      $skip.removeClass("hidden-link");
    });
    $skip.on('blur', 'a', function() {
      $skip.addClass("hidden-link");
    });

    /*---------- = Menu principal ----------
    $('#navigation .menu').superfish({
      popUpSelector: '.menu',
      autoArrows:  false // disable generation of arrow mark-up
    });*/

    // Accordion sur les pages
    if($("#faq-accordion").length) {
      $("#faq-accordion").accordion({
        header: "h2",
        heightStyle: "content",
        autoheight:false,
        active: true,
        collapsible:true
      });
    }

    $('.footer li.imaginons-paris a').attr("target","_blank");

    // repérer le retour d'une page actu
    $('.node-actualite.view-mode-full').siblings('.tabs').addClass('title-node-detail');
    $('.node-actualite.view-mode-full').siblings('.back-addthis').addClass('title-node-detail');

    // Fil des contributions : plié/déplié du détail d'une contribution
/*    $('.contrib-item .contribution-abuse').hide();
    $('.contrib-item .contrib-text').hide();
    $('.contrib-item .contribution-share').hide();
    $('.contrib-item .add-comment').hide();
*/
    $('.node-type-debat .contrib-item h2, .node-type-actualite .contrib-item h2, .node-type-contribution .contrib-item h2').click(function(event) {
        event.preventDefault();
/*
        var originalTitleText = $(this).find('.link').data('originalTitle');
        var cutTitleText = $(this).find('.link').data('cutTitle');

        $(this).toggleClass('collapse');

        if($(this).hasClass('collapse')) {
          $(this).find('.link').text(originalTitleText);
        }else{
          $(this).find('.link').text(cutTitleText);
        }

        $(this).parent().find('.contribution-abuse').toggle('slow');
        $(this).parent().find('.contrib-text').toggle('slow');
        $(this).parent().find('.contribution-share').toggle('slow');
        $(this).parent().find('.add-comment').toggle('slow');
*/
    });

    /* onglets page profil */
    if ($('.page-mon-profil .tabs-contribs').length > 0) {
      var $tabs = $('.page-mon-profil .tabs-contribs');
      var $tabsNav = $tabs.find('nav');
      var $panels = $tabs.nextAll('.block-ecedi-list');

      // add classes & a11y attributes
      $tabsNav.attr({
        'role': 'navigation',
        'aria-label': 'Mes participations'
      });

      $firstTab = $tabsNav.find('li').first();
      $firstLink = $firstTab.find('a');
      
      $firstTab.addClass('is-active');
      $firstLink.attr({
        'aria-current': 'true',
        'title': $firstLink.text() + ' (actif)'
      });

      $panels.attr('tabindex', '-1');
      $panels.first().addClass('is-active');

      // on click, switch classes & a11y attributes
      $tabsNav.find('a').on('click', function(event) {
        event.preventDefault();

        var $link = $(this);
        var $tab = $link.closest('li');
        var target = $link.attr('href');

        // only if the clicked item is not already active
        if (!$tab.is('.is-active')) {
          var $currentTab = $tabsNav.find('li.is-active');

          $currentTab.removeClass('is-active');
          $currentTab.find('a').removeAttr('aria-current title');

          $panels.filter('.is-active').removeClass('is-active');

          $tab.addClass('is-active');
          $link.attr({
            'aria-current': 'true',
            'title': $link.text() + ' (actif)'
          });

          $(target).addClass('is-active');
          $(target).focus();
        }        
      });
    }

    // link button more a11y
    $('a[role="button"]').on('keypress', function(event) {
      if (event.which === 32) {
        event.preventDefault();
        $(this).click();
      }
    });

    // modification des icones de votes pour les contributions "sticky"
    $('.contrib-item.sticky .like-container-entity-node img').attr('src','/sites/all/themes/custom/dialoguons/images/like-entity-node-red.svg');
    $('.contrib-item.sticky .dislike-container-entity-node img').attr('src','/sites/all/themes/custom/dialoguons/images/dislike-entity-node-blue.svg');

  });

  Drupal.behaviors.displayAfterPageLoad = {
    attach: function(context, settings) {
      // Data display after page load feature.
      $('[data-display-after-page-load]', context).each(function(index, elt) {
        var $elt = $(elt);
        var target = $elt.data('display-after-page-load');
        var $target = $('#' + target);
        if ($target.length > 0) {
          $target.html($elt.html());
        }
      });
    }
  };
})(jQuery, Drupal);
;
