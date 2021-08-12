/*
A really crude, but functional Markdown formatting tool which will format Markdown text as HTML.
Author: Todd King, 2021-08-12
*/
const Markdown = {
  format ( text ){
    var newval;
    text = text.split('\n');

    var inCode = false;
    var inBlockquote = false;
    
    for( var i=0; i < text.length; i++ ) {

      var line = text[i];

      // Header
      if( line.match(/^######/) ) { // h6
        newval = line.replace(/^######/, '');
        text[i] = '<h6>' + newval + '</h6>';
      }
      if( line.match(/^#####/) ) { // h5
        newval = line.replace(/^#####/, '');
        text[i] = '<h5>' + newval + '</h5>';
      }
      if( line.match(/^####/) ) { // h4
        newval = line.replace(/^####/, '');
        text[i] = '<h4>' + newval + '</h4>';
      }
      if( line.match(/^###/) ) { // h3
        newval = line.replace(/^###/, '');
        text[i] = '<h3>' + newval + '</h3>';
      }
      if( line.match(/^##/) ) { // h2
        newval = line.replace(/^##/, '');
        text[i] = '<h2>' + newval + '</h2>';
      }
      if( line.match(/^#/) ) {  // h1 
        newval = line.replace(/^#/, '');
        text[i] = '<h1>' + newval + '</h1>';
      }
      
      // Emphasis
      text[i] = line.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>'); // bold
      text[i] = line.replace(/\*(.*)\*/gim, '<i>$1</i>'); // italic
      text[i] = line.replace(/`(.*)`/gim, '<code>$1</code>'); // in-line code

      // Links and images
      if( line.match( /\!\[(.*)\]\((.*)\)/ ) ) {  // Images (Format: ![Alt Text](url))
        text[i] = line.replace(/\!\[(.*)\]\((.*)\)/gim, '<img alt="$1" src="$2"></img>'); //
      } else if( line.match( /\[(.*)\]\((.*)\)/ ) ) {  // Links ([Text](URL))
        text[i] = line.replace(/\[(.*)\]\((.*)\)/gim, '<a href="$2">$1</a>'); //
      }
      
      // Lists
      // Unordered lists
      if( line.match(/^\s*-\s/) ) {  // lists item
        newval = line;
        if( ! text[i-1].match(/<li>-/) ) {  // Start of list
          text[i] = '<ul><li>' + newval + '</li>';
        } else if( ! text[i+1].match(/^\s*-\s/) ) { // No more items
          text[i] = '<li>' + newval + '</li></ul>';
        } else {  // item
          text[i] = '<li>' + newval + '</li>';
        }
      }
      if( line.match(/^\s*\*\s/) ) {  // list item
        newval = line;
        if( ! text[i-1].match(/<li>\*/) ) { // Start of list
          text[i] = '<ul><li>' + newval + '</li>';
        } else if( ! text[i+1].match(/^\s*\*\s/) ) {  // No more items
          text[i] = '<li>' + newval + '</li></ul>';
        } else {  // item
          text[i] = '<li>' + newval + '</li>';
        }
      }

      // Ordered lists
      if( line.match(/^\s*\d+\.\s/) ) {  // list item
        newval = line;
        if( ! text[i-1].match(/<li>\d+\./) ) {  // Start of list
          text[i] = '<ol><li>' + newval + '</li>';
        } else if( ! text[i+1].match(/^\s*\d+\.\s/) ) { // No more items
          text[i] = '<li>' + newval + '</li></ol>';
        } else { // item
          text[i] = '<li>' + newval + '</li>';
        }
      }

      // Syntax highlighting
      if( line.match(/```/) ) {  // start or end of highlighting
        if( ! inCode) { inCode = true; text[i] = "<code>"; }
        else { inCode = false; text[i] = "</code>"; }
      }
      
      // Blockquote
      if( line.match(/^\s*&gt;/) ) { // content of blockquote (lines start with ">")
        if( ! inBlockquote) { inBlockquote = true; text[i] = "<blockquote>\n" + line.replace(/&gt;/, ""); } // Start of block quote
        else { text[i] = line.replace(/&gt;/, ""); }
        if( ! text[i+1].match(/^\s*&gt;/) ) { inBlockquote = false; text[i] += "\n</blockquote>"; }  // End of block quote
      }
      
      // Table formatting
      if( line.match(/\+--*-\+/) ) { 
        if( text[i+1].match(/\|/) ) {
          text[i] = "<table>"; // text[i] = line + "(table)";
        } else {
          text[i] = "</table>"; // text[i] = line + "(/table)"
        }
      }  

      if( line.match(/^\|/) ) { 
        cell = "td";        
        if( text[i+1].match(/\|--/) ) {  // Everything before "|---" is header
          cell = "th";
          text[i+1] = "";
        }
        text[i] = "<tr>"; // text[i] = line + "(" + row + ")";
        
        field = line.replace(/^\|/, "").replace(/\|$/, "").split('|');  
        for( var j=0; j < field.length; j++ ) {
          text[i] += "<" + cell + ">" + field[j] + "</" + cell + ">";
        }
        
        text[i] += "</tr>";
      }  
    }
    
    // Post processing
    
    // remove dashs from list items
    for( var i=0; i < text.length; i++ ) {
      if( text[i].match(/<li>/) ){
        text[i] = text[i].replace('-', '');
        text[i] = text[i].replace('*', '');
        text[i] = text[i].replace(/\d\./, '');
      }
    }
    
    // Add spaces back
    inCode = false;
    inBlockquote = false;
    for(var i=0; i < text.length; i++) {
      
      var prev, next;
      if( typeof(text[i]) !== 'undefined' ) {
        if(text[i].match('<code>')) inCode = true;
        if(text[i].match('</code>')) inCode = false;
      }
      
      if( typeof(text[i-1]) !== 'undefined' ) {
        prev = text[i-1].match(/</) && text[i-1].match('<h'); // Header
      } else {
        prev = true;
      }
      if( typeof(text[i+1]) !== 'undefined' ) {
        next = text[i+1].match(/</);
      } else {
        next = true;
      }
 
      if( ! text[i].match('<') && ( ! prev || ! next) && ( ! inCode ) ) {
        text[i] = text[i] + '<br>';
      }
    }
    
    // Generate the full snippette
    return text.join('\n');
  }
}