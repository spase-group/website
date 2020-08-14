/* Initialize the search interface */
// Set-up autocomplete names
autocomplete(document.getElementById("termSearch"), terms);
// Set passed term in search field
if(term) { document.getElementById('termSearch').value = term; }
// Select version and add change handler
var items = document.getElementsByName('version'); 		  
for(i = 0; i < items.length; i++) { 
	if(items[i].value == version) items[i].checked = true;
	else items[i].checked = false;
	
	items[i].addEventListener('change', changeVersion);
}

