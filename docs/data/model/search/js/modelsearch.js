/* Functions to support data model search and display */
/* A "config" object is expected to be defined before running this script.
   The required form of "config" is:
   
	var config = {
		modelVersion: "2.3.1",
		modelName: "Base Model",
		modelVersionFile: "baseModelVersions.json",
		modelFolder: "model",
		modelPrefix: "spase-base",
	}
*/

// Initial values
var term = null;
var terms = [];
var spec = { dictionary: {}, ontology: {} };
// Default - full list is fetched.
var versions = {
	release: [
		{"version": "2.6.1", "released": "2024-06-20" }
	],
	current: {"version": "2.6.1", "released": "2024-06-20" }
};

var entryTemplate = Handlebars.compile("No dictionary loaded.");
var treeTemplate = Handlebars.compile("No dictionary loaded.");

// Process passed parameters		
var url = new URL(window.location);

if(url.searchParams.get("term")) { version = url.searchParams.get("term"); }
if(url.searchParams.get("version")) { version = url.searchParams.get("version"); }

// Set model name on page
document.getElementById('modelName').innerHTML = config.modelName;

function refreshTerms() {
	var search = document.getElementById('termSearch').value.toLowerCase();
	var mainContainer = document.getElementById("entry");

	mainContainer.innerHTML = "";
	
	// Generate listing
	var found = 0;
	var flat = [];
	
	var list = Object.keys(spec.dictionary);

	// Make a list of lowercase names
	search = search.toLowerCase();
	for (var i = 0; i < list.length; i++) {
		flat.push(list[i].toLowerCase());
	}

	// Check if search term is an exact match 
	var idx = flat.indexOf(search);
	if(idx != -1) {	// Exact match - make list one element
		var term = list[idx];
		list = [];
		list.push(term);
	}
	
	// List all matching entries
	for (var i = 0; i < list.length; i++) {
		var key = list[i];
		if(key.toLowerCase().startsWith(search)) {
			found++;
			var div = document.createElement("div");
			div.innerHTML = entryTemplate(spec.dictionary[key]);
			mainContainer.appendChild(div);
		}
	}
	if(found == 0) {
		var div = document.createElement("div");
		div.innerHTML = "No entry found.";
		mainContainer.appendChild(div);
	}
}

function refreshTree() {
	var treeContainer = document.getElementById("treeView");

	treeContainer.innerHTML = "";
	
	// Generate tree
	treeContainer.innerHTML = '<ul id="tree">' + buildTree('Spase', '1', 0) + '</ul>';

	var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
		toggler[i].addEventListener("click", function() {
			this.parentElement.querySelector(".nested").classList.toggle("open");
			this.classList.toggle("caret-down");
		});
	}
}

function refreshVersions() {
	var versionContainer = document.getElementById("versions");
	var list = [];
	var html = "";
	
	// Create list of versions
	for(var i = 0; i < versions.release.length; i++) {
		list.push(versions.release[i].version);
	}
	list.sort(function(a, b){ return b.localeCompare(a); });	// Reverse
	
	// Generate HTML
	for(var i = 0; i < list.length; i++) {
		var checked = "";
		if(list[i] == versions.current['version']) checked = "checked";
		
		html += '&nbsp;<span style="white-space:nowrap; display:inline-block"><input type="radio" name="version" value="' 
		+ list[i] + '" ' + checked + '>' + list[i] + '</span>';
	}
	
	// Update browser
	versionContainer.innerHTML = html;
	
	// Select version and add change handler
	var items = document.getElementsByName('version'); 		  
	for(i = 0; i < items.length; i++) { 
		items[i].addEventListener('change', changeVersion);
	}
}

function buildTree(term, occur, level) {
	var html = "";
	var item = spec.ontology[term];
	var opened = "";
	var nested = false;
	if(item) {	nested = true; } // There are children

	if(level < 1) { opened = "open "; }
	
	html += treeTemplate({ element: term, occurrence: occur, nested: nested});
	
	if(item) {	// There are children
		var list = Object.keys(spec.ontology[term]);
		if(list.length > 0) {
			html += '<ul class="nested ' + opened + '">';
			for (var i = 0; i < list.length; i++) {
				html += buildTree(list[i], item[list[i]].occurrence, level+1);
			}
			html += '</ul>';
		}
	}
	
	if(nested) html += "</li>";
	
	return html;
}

function showTerm(term) {
	var searchField = document.getElementById('termSearch');
	searchField.value = term;
	refreshTerms();
}

function getModelSpec(version) {
	fetch(config.modelFolder + '/' + config.modelPrefix + '-' + version + '.json')	// Get 
		.then(response => response.json())
		.then(data => { 
			spec = data; 
			autocomplete(document.getElementById("termSearch"), Object.keys(spec.dictionary)); 
			refreshTree();
			refreshTerms(); 
		})
		.catch(function(error) {
			alert("Unable to load model for " + config.modelName + " version " + version);
			console.log(error);
		})
	;
}

function clearModel() {
	// Remove model spec
	spec = { dictionary: {}, ontology: {} };
	// Remove displayed entries
	var mainContainer = document.getElementById("entry");
	mainContainer.innerHTML = "";		
}

function changeVersion() {
	if(this.checked) { config.modelVersion = this.value; clearModel(); getModelSpec(config.modelVersion); refreshTree(); refreshTerms(); }
}

// compile the display templates
fetch('entry.hbs')
	.then(response => response.text())
	.then(text => { 
		entryTemplate = Handlebars.compile(text); 	
		getModelSpec(config.modelVersion)
	})
	.catch(function(error) {
		alert("Unable to load entry template");
		console.log(error);
	})
	;

fetch('tree.hbs')
	.then(response => response.text())
	.then(text => { 
		treeTemplate = Handlebars.compile(text); 	
	})
	.catch(function(error) {
		alert("Unable to load tree template");
		console.log(error);
	})
	;

// Get model versions
fetch(config.modelVersionFile)	
		.then(response => response.json())
		.then(data => { versions = data; refreshVersions(); } )
		.catch(function(error) {
			alert("Unable to load versions for " + config.modelName );
			console.log(error);
		})
	; 

/* Initialize the search interface */
// Set-up autocomplete names
autocomplete(document.getElementById("termSearch"), terms);

// Set passed term in search field
if(term) { document.getElementById('termSearch').value = term; }

// Select version and add change handler
var items = document.getElementsByName('version'); 		  
for(i = 0; i < items.length; i++) { 
	if(items[i].value == config.modelVersion) items[i].checked = true;
	else items[i].checked = false;
	
	items[i].addEventListener('change', changeVersion);
}
