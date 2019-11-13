/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.customPager = {

  ajaxPagerInit: function(listSelector) {

    // Check that there are at least one ajax pager, one list div and that we're not on admin
    if ($('.ajax-pager').length && $(listSelector).length && !$('body').hasClass('page-admin')) {

      // At click : load new list in target div
      $('.ajax-pager ul.pager > li > a').live('click', function(e) {
        e.preventDefault();

        // Recover the list ID
        var $list  = $(this).closest(listSelector);
        var listID = $list.attr('id');

        // Get url of the new list
        var url  = $(this).attr('href');
            url += ' #' + listID + ' > *';

        // Load the new list
        $list.find('.list-content').css('opacity', 0.4);
        $list.find('.ajax-pager-loader').show();

        $list.load(url, function( response, status, xhr ) {

          if ( status == 'success' ) {
            $list.find('.list-content').css('opacity', 1);
            $list.find('.ajax-pager-loader').hide();
          }

          /*if ( status == "error" ) {
            var msg =  Drupal.t("Sorry but there was an error: ");
            console.log( msg + xhr.status + " " + xhr.statusText );
          }*/

          // Scroll to list top
          $('html, body').animate({
            scrollTop: $(listSelector).offset().top
          }, 800);

        });



      });

    }
    return;

  },



  attach: function(context, settings) {

    /* --- Call Ajax for Ecedi Custom Pager --- */
    Drupal.behaviors.customPager.ajaxPagerInit('.custom-list');


    return;
    // The end.

  }
};

})(jQuery, Drupal, this, this.document);
;
(function($) {
  Drupal.behaviors.likedislike = {
    attach: function (context, settings) {
      var $is_logged = $('body').hasClass('logged-in');
      //This is handling the click on the like link for node only.
      $('.like-container-entity-node .like a').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        // Patch to prevent like ajax request if like image is disabled one.
        if(!$(this).hasClass('disable-status')) {
          if($is_logged) {
            var nodeId = $(this).attr('nodeid');
            likeNode(nodeId);
          }
        }
        return false;
      });

      //This is handling the click on the dislike link for node only.
      $('.dislike-container-entity-node .dislike a').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if($is_logged) {
          var nodeId = $(this).attr('nodeid');
          dislikeNode(nodeId);
        }
        return false;
      });

      //This is handling the click on the like link for comments only.
      $('.like-container-entity-comment .like a').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if($is_logged) {
          var nodeId = $(this).attr('nodeid');
          likeComment(nodeId);
        }
        return false;
      });

      //This is handling the click on the dislike link for node only.
      $('.dislike-container-entity-comment .dislike a').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if($is_logged) {
          var nodeId = $(this).attr('nodeid');
          dislikeComment(nodeId);
        }
        return false;
      });
    }
  };
})(jQuery);

//Handling the ajax thing for like node.
function likeNode(nodeId) {
  jQuery.ajax({
    type: "GET",
    url: base_path+"likedislike/like/node/add",
    data: 'entityid='+nodeId+"&entity=node",
    success: function(msg) {
      var arrLikeCount = msg.split("/");
      var likeCount = arrLikeCount[0];
      var dislikeCount = arrLikeCount[1];
      var message = '';
      if (arrLikeCount.length > 2) {
        message = arrLikeCount[2];
      }

      var msgDivId = "#dislike-container-"+nodeId+" .dislike-count-entity-node";
      jQuery(msgDivId).html(dislikeCount);

      var msgDivId = "#like-container-"+nodeId+" .like-count-entity-node";
      jQuery(msgDivId).html(likeCount);

      var imageNameLiked = "likeAct.gif";
      var imageNameDislike = "dislike.gif";

      jQuery("#like-container-"+nodeId+' .like a.entity-node').toggleClass('disable-status');
      jQuery("#dislike-container-"+nodeId+' .dislike a.entity-node').toggleClass('disable-status');
      //jQuery("#like-container-"+nodeId+' .like img.entity-node').attr('src',base_path+module_path+"/images/"+imageNameLiked);
      //jQuery("#dislike-container-"+nodeId+' .dislike img.entity-node').attr('src',base_path+module_path+"/images/"+imageNameDislike);

      if (typeof message == "string" && message.length > 0) {
        alert(message);
      }
    }
  });
}

//Handling the ajax thing for dislie node.
function dislikeNode(nodeId) {
  jQuery.ajax({
    type: "GET",
  url: base_path+"likedislike/dislike/node/add",
  data: 'entityid='+nodeId+"&entity=node",
  success: function(msg) {
    var arrLikeCount = msg.split("/");
    var likeCount = arrLikeCount[0];
    var dislikeCount = arrLikeCount[1];
    var message = '';
    if (arrLikeCount.length > 2) {
      message = arrLikeCount[2];
    }

    var msgDivId = "#dislike-container-"+nodeId+" .dislike-count-entity-node";
    jQuery(msgDivId).html(dislikeCount);

    var msgDivId = "#like-container-"+nodeId+" .like-count-entity-node";
    jQuery(msgDivId).html(likeCount);

    var imageNameDisliked = "dislikeAct.gif";
    var imageNameLike = "like.gif";

    jQuery("#dislike-container-"+nodeId+' .dislike a.entity-node').toggleClass('disable-status');
    jQuery("#like-container-"+nodeId+' .like a.entity-node').toggleClass('disable-status');
    //jQuery("#dislike-container-"+nodeId+' .dislike img.entity-node').attr('src',base_path+module_path+"/images/"+imageNameDisliked);
    //jQuery("#like-container-"+nodeId+' .like img.entity-node').attr('src',base_path+module_path+"/images/"+imageNameLike);

    if (typeof message == "string" && message.length > 0) {
      alert(message);
    }
  }
  });
}

//Handling the ajax thing for like node.
function likeComment(commentId) {
  jQuery.ajax({
    type: "GET",
  url: base_path+"likedislike/like/comment/add",
  data: 'entityid='+commentId+"&entity=comment",
  success: function(msg) {
    var arrLikeCount = msg.split("/");
    var likeCount = arrLikeCount[0];
    var dislikeCount = arrLikeCount[1];
    var message = '';
    if (arrLikeCount.length > 2) {
      message = arrLikeCount[2];
    }

    var msgDivId = "#dislike-container-"+commentId+" .dislike-count-entity-comment";
    jQuery(msgDivId).html(dislikeCount);

    var msgDivId = "#like-container-"+commentId+" .like-count-entity-comment";
    jQuery(msgDivId).html(likeCount);

    var imageNameLiked = "likeAct.gif";
    var imageNameDislike = "dislike.gif";

    jQuery("#like-container-"+commentId+' .like a.entity-comment').toggleClass('disable-status');
    jQuery("#dislike-container-"+commentId+' .dislike a.entity-comment').toggleClass('disable-status');
    //jQuery("#like-container-"+commentId+' .like img.entity-comment').attr('src',base_path+module_path+"/images/"+imageNameLiked);
    //jQuery("#dislike-container-"+commentId+' .dislike img.entity-comment').attr('src',base_path+module_path+"/images/"+imageNameDislike);

    if (typeof message == "string" && message.length > 0) {
      alert(message);
    }
  }
  });
}

//Handling the ajax thing for dislie node.
function dislikeComment(commentId) {
  jQuery.ajax({
    type: "GET",
  url: base_path+"likedislike/dislike/comment/add",
  data: 'entityid='+commentId+"&entity=comment",
  success: function(msg) {
    var arrLikeCount = msg.split("/");
    var likeCount = arrLikeCount[0];
    var dislikeCount = arrLikeCount[1];
    var message = '';
    if (arrLikeCount.length > 2) {
      message = arrLikeCount[2];
    }

    var msgDivId = "#dislike-container-"+commentId+" .dislike-count-entity-comment";
    jQuery(msgDivId).html(dislikeCount);

    var msgDivId = "#like-container-"+commentId+" .like-count-entity-comment";
    jQuery(msgDivId).html(likeCount);

    var imageNameDisliked = "dislikeAct.gif";
    var imageNameLike = "like.gif";

    jQuery("#dislike-container-"+commentId+' .dislike a.entity-comment').toggleClass('disable-status');
    jQuery("#like-container-"+commentId+' .like a.entity-comment').toggleClass('disable-status');
    //jQuery("#dislike-container-"+commentId+' .dislike img.entity-comment').attr('src',base_path+module_path+"/images/"+imageNameDisliked);
    //jQuery("#like-container-"+commentId+' .like img.entity-comment').attr('src',base_path+module_path+"/images/"+imageNameLike);

    if (typeof message == "string" && message.length > 0) {
      alert(message);
    }
  }
  });
};
