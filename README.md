# SPASE website
Generate SPASE website (spase-group.org).

# Getting stated

1. Clone this repo.
2. Change to the cloned repo directory.
3. Install Grunt 

```
npm install grunt --save
```

Install dependencies

```
npm install --save
```

4. Generate the pages

Run 

```
grunt -v
```

This will create a "docs" folder which contains the full web site with generated web pages and
pre-generated content.

# Configuration

The files in "site/config" are used to create a revision history, lists of releases, specify the current release and if there is 
a draft release of the information models. The content of the files are in JSON format. The files are:

baseModelHistory.json: History records for the revision of the Base Model.  
baseModelVersions.json: Releases, current release and draft version information for the Base Model.  
simulationExtHistory.json: History records for the revision of the Simulation Extensions.  
simulationExtVersions.json: Releases, current release and draft version information for the Simulation Extensions.  

The format for the history JSON data is:

```
[
  {
    "ID": "1",
    "Version": "m.n.o",
    "Updated": "yyyy-mm-dd",
    "ChangedBy": "Your Name",
    "Description": "What was changed or revised.",
    "Note": ""
  },
]
```

The format for the version JSON data is:

```
{
	"release": [
		{"version": "m.n.o", "released": "yyyy-mm-dd" },
	],
	"current": {"version": "m.n.o", "released": "yyyy-mm-dd" },
	"draft": ""
}
```

These files are supplied to the "assemble" task and can be referenced in Handlebars files by the base name of the file.

# Adding a New Release

Generate the documentation for the release Information Model using the appropriate tools. Then...

1. Place the model HTML pages in 'site/pages/data/model' (or 'simulation' for Simulation Extensions)
2. Place the model PDF pages in 'site/pages/data/model' (or 'simulation' for Simulation Extensions)
3. Place the XML schema in 'site/pages/data/schema'
4. Place the dictionary document in 'site/docs/dictionary'
5. Update the baseModelHistory.json file to document revisions.
6. Update the baseModelVersions.json file.
7. Regenerate the website with ```grunt -v```


# Tasks

Note: The default source folder is 'site' and the default destination folder is 'docs'.

**default**: Run 'copy', 'assemble', 'sitemap_xml'.

**copy**: Copy all non-Handlebars files (.hbs) from the source folder to the destination folder.

**copy:assets**: Copy all non-Handlebars files (.hbs) from the source 'assets' folder to the destination folder.

**copy:docs**: Copy all non-Handlebars files (.hbs) from the source 'docs' folder to the destination folder.

**copy:pregen**: Copy all non-Handlebars files (.hbs) from the source folder to the destination folder, excluding the content of the 'assets' and 'docs' folders.

**assemble**: Process all Handlebar files (.hbs) in the source folder and write to destination folder.

**sitemap_xml**: Generate a sitemap in XML format and write in destination folder.

**clean**: Remove any previously-created files from the destination folder.

# Tips

When working on updates to the Handlebars page contents you can regenerate just those pages with the command: 

```
grunt assemble
```

