window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-44273294-3', 'auto', 'elt');
ga('elt.send', 'pageview');

ga(function(tracker, options) {
  // Logs the tracker created above to the console.
  console.log(ga.getAll(), tracker, options);
});

$( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  
  var inputs = Array.from($('input', this));
  var hasEmpty = inputs.some(function(el){
    return $(el).val() == '';
  });
  if(hasEmpty) return;
  
  var data = $( this ).serialize();
  
  inputs.forEach(function(el){
    $(el).val('');
  });
  
  $.post( "api/mail", data);
  ga('send', 'event', 'Crier Form', 'submit');
});