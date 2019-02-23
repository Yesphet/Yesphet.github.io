

$('.post-body h1,.post-body h2,.post-body h3').each(function(){
    $(this).append('  <a href=#' + $(this).context.id + '><i class="fa fa-carrot post-icon"></i></a>');
})