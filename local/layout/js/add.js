$(document).ready(function(){
    $("a.read-magazine").click(function(e){
        var journalHref = $(this).attr("href");
        console.log(journalHref);
        $('<iframe src="'+journalHref+'" width="100%"" height="300px" frameborder="0" scrolling="no" id="myFrame"></iframe>').appendTo('.magazine');
        e.preventDefault();
        return false;
    });
	
	
	$( 'body' ).on(
		'click',
		'.guide-item-type',
		function ()
		{
			var typeId = $( this ).find( 'span' ).data( 'type' );
			
			$( '.guide-filter-type-list input[value="' + typeId + '"]' ).click();
		}
	);

});

function addLink() {    
    var element_body = document.getElementsByTagName('body')[0];    
    var selection;    
    selection = window.getSelection();    
		var linkpage = "<br/>Источник: <a href='http://profashion.ru'>PROfashion.ru / журнал и портал о моде для профессионалов</a>";    
    var copytext = selection + linkpage;    
    var divnew = document.createElement('div');    
    divnew.style.position='absolute';    
    divnew.style.left='-99999px';    
    element_body.appendChild(divnew);    
    divnew.innerHTML = copytext;    
    selection.selectAllChildren(divnew);    
    window.setTimeout(function() {    
    element_body.removeChild(divnew);    
    },0);    
}    
document.oncopy = addLink;    