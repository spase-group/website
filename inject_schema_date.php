<?php

/*
 * Run this from the Oxygen html generation folder (same folder as the schema being
 * converted to html) to pull the schema date into the html documentation
 */

// Find and read schema file
$xsds = glob ("*.xsd"); 
if (count ($xsds) < 1) {
  die ("No .xsd schema file found in this folder\n");
}
if (count ($xsds) > 1) {
  die ("Multiple .xsd schema files found in this folder - there can only be one for this operation\n");
}
$xsd = $xsds[0];

$file_text = file_get_contents ($xsd);

// Pull out schema generation date
$matches = array ();
if (!preg_match ('/Generated: (\d\d\d\d-\d\d-\d\d)/', $file_text, $matches)) {
  die ("Unable to find 'Generated:' date comment in $xsd\n");
}
$date = $matches[1];

// Find and read Oxygen-generated schema main panel
$htm_folder = 'spase-out';
$fmtxsds = glob ("$htm_folder/*xsd.htm"); 
if (count ($fmtxsds) < 1) {
  die ("No .xsd.htm schema file found in $htm_folder\n");
}
if (count ($fmtxsds) > 1) {
  die ("Multiple .xsd schema files found in $htm_folder - there can only be one for this operation\n");
}
$fmtxsd = $fmtxsds[0];

print "Injecting '$date' into $fmtxsd\n";

$htm_text = file_get_contents ($fmtxsd);

// Inject date into html file
$count = 0;
$out_htm = preg_replace ('/xsd<\/span><\/div>/', "xsd (generated $date)</span></div>", $htm_text, -1, $count);
if ($count < 1) {
  die ("Unable to inject '$htm_text' into $fmtxsd\n");
}

if (file_put_contents ($fmtxsd, $out_htm) === false) {
  die ("Unable to write to $fmtxsd\n");
}

print "success.\n";