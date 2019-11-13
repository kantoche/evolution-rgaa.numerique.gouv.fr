(function ($) {

Drupal.behaviors.initModalFormsLogin = {
  attach: function (context, settings) {
    $("a[href*='/user/login'], a[href*='?q=user/login']", context).once('init-modal-forms-login', function () {
      this.href = this.href.replace(/user\/login/,'modal_forms/nojs/login');
    }).addClass('ctools-use-modal ctools-modal-modal-popup-small');
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initModalFormsRegister = {
  attach: function (context, settings) {
    $("a[href*='/user/register'], a[href*='?q=user/register']", context).once('init-modal-forms-register', function () {
      this.href = this.href.replace(/user\/register/,'modal_forms/nojs/register');
    }).addClass('ctools-use-modal ctools-modal-modal-popup-medium');
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initModalFormsPassword = {
  attach: function (context, settings) {
    $("a[href*='/user/password'], a[href*='?q=user/password']", context).once('init-modal-forms-password', function () {
      this.href = this.href.replace(/user\/password/,'modal_forms/nojs/password');
    }).addClass('ctools-use-modal ctools-modal-modal-popup-small');
  }
};

})(jQuery);
;
Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n>1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Une erreur HTTP AJAX s\u0027est produite.","HTTP Result Code: !status":"Code de statut HTTP : !status","An AJAX HTTP request terminated abnormally.":"Une requ\u00eate HTTP AJAX s\u0027est termin\u00e9e anormalement.","Debugging information follows.":"Informations de d\u00e9bogage ci-dessous.","Path: !uri":"Chemin : !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseText : !responseText","ReadyState: !readyState":"ReadyState : !readyState","Monday":"Lundi","Sunday":"Dimanche","Shortcuts":"Raccourcis","Search":"Rechercher","Hide shortcuts":"Cacher les raccourcis","@title dialog":"dialogue de @title","Configure":"Configurer","Show shortcuts":"Afficher les raccourcis","(active tab)":"(onglet actif)","Loading":"En cours de chargement","Disabled":"D\u00e9sactiv\u00e9","Enabled":"Activ\u00e9","Tuesday":"Mardi","Wednesday":"Mercredi","Thursday":"Jeudi","Friday":"Vendredi","Saturday":"Samedi","Re-order rows by numerical weight instead of dragging.":"R\u00e9-ordonner les lignes avec des poids num\u00e9riques plut\u00f4t qu\u0027en les d\u00e9pla\u00e7ant.","Show row weights":"Afficher le poids des lignes","Hide row weights":"Cacher le poids des lignes","Drag to re-order":"Cliquer-d\u00e9poser pour r\u00e9-organiser","Changes made in this table will not be saved until the form is submitted.":"Les changements effectu\u00e9s dans ce tableau ne seront pris en compte que lorsque la configuration aura \u00e9t\u00e9 enregistr\u00e9e.","Hide":"Masquer","Show":"Afficher","Next":"Suivant","Cancel":"Annuler","Edit":"Modifier","None":"Aucun(e)","none":"aucun(e)","Add":"Ajouter","Menu":"Menu","All":"Tout","Done":"Termin\u00e9","OK":"OK","Prev":"Pr\u00e9c.","Mon":"lun","Tue":"mar","Wed":"mer","Thu":"jeu","Fri":"ven","Sat":"sam","Sun":"dim","January":"janvier","February":"F\u00e9vrier","March":"mars","April":"avril","May":"mai","June":"juin","July":"juillet","August":"ao\u00fbt","September":"septembre","October":"octobre","November":"novembre","December":"d\u00e9cembre","Select all rows in this table":"S\u00e9lectionner toutes les lignes du tableau","Deselect all rows in this table":"D\u00e9s\u00e9lectionner toutes les lignes du tableau","Today":"Aujourd\u0027hui","Jan":"jan","Feb":"f\u00e9v","Mar":"mar","Apr":"avr","Jun":"juin","Jul":"juil","Aug":"ao\u00fb","Sep":"sep","Oct":"oct","Nov":"nov","Dec":"d\u00e9c","Su":"Di","Mo":"Lu","Tu":"Ma","We":"Me","Th":"Je","Fr":"Ve","Sa":"Sa","Not published":"Non publi\u00e9","Please wait...":"Veuillez patienter...","mm\/dd\/yy":"dd\/mm\/yy","By @name on @date":"Par @name le @date","By @name":"Par @name","Not in menu":"Pas dans le menu","Alias: @alias":"Alias : @alias","No alias":"Aucun alias","New revision":"Nouvelle r\u00e9vision","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"N\u0027oubliez pas de cliquer sur \u003Cem\u003EEnregistrer les blocs\u003C\/em\u003E pour confirmer les modifications apport\u00e9es ici.","This permission is inherited from the authenticated user role.":"Ce droit est h\u00e9rit\u00e9e du r\u00f4le de l\u0027utilisateur authentifi\u00e9.","No revision":"Aucune r\u00e9vision","@number comments per page":"@number commentaires par page","Requires a title":"Titre obligatoire","Not restricted":"Non restreint","Not customizable":"Non personnalisable","Restricted to certain pages":"R\u00e9serv\u00e9 \u00e0 certaines pages","The block cannot be placed in this region.":"Le bloc ne peut pas \u00eatre plac\u00e9 dans cette r\u00e9gion.","Customize dashboard":"Personnaliser le tableau de bord","Hide summary":"Masquer le r\u00e9sum\u00e9","Edit summary":"Modifier le r\u00e9sum\u00e9","Don\u0027t display post information":"Ne pas afficher les informations de la contribution","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Le fichier s\u00e9lectionn\u00e9 %filename ne peut pas \u00eatre transf\u00e9r\u00e9. Seulement les fichiers avec les extensions suivantes sont permis : %extensions.","Autocomplete popup":"Popup d\u0027auto-compl\u00e9tion","Searching for matches...":"Recherche de correspondances...","New window":"Nouvelle fen\u00eatre","Close":"Fermer","Please fill in this field.":"Veuillez remplir ce champ."}} };;
