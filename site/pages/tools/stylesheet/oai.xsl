<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	>
<xsl:output method="xml" indent="yes"/> 

<xsl:template match="Spase/*">

<xsl:variable name="identifier" select="ResourceID" />
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
 <responseDate>2006-07-19T00:00:00Z</responseDate>
  <request verb="GetRecord" identifier="{$identifier}"
           metadataPrefix="oai_dc">http://www.spase-group.org/</request>
  <GetRecord>
   <record> 

<header>
	<identifier><xsl:value-of select="ResourceID"/></identifier>
	<datestamp>2006-07-19</datestamp>
	<setSpec><xsl:value-of select="name(current())"/></setSpec>
</header>
	<xsl:apply-templates select="ResourceHeader" /> 
	
	</record>
  </GetRecord>
</OAI-PMH>
</xsl:template>

<xsl:template match="ResourceHeader">
<metadata>
<oai_dc:dc 
     xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" 
     xmlns:dc="http://purl.org/dc/elements/1.1/" 
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
     xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ 
     http://www.openarchives.org/OAI/2.0/oai_dc.xsd">
   <dc:title><xsl:value-of select="ResourceName"/></dc:title>
   <dc:creator>SPASE Person ID: <xsl:value-of select="Contact/PersonID"/></dc:creator>
   <dc:subject><xsl:value-of select="Alias"/></dc:subject>
   <dc:description><xsl:value-of select="Description"/></dc:description>
   <dc:type><xsl:value-of select="name(current())"/> Resource</dc:type>
   <dc:identifier><xsl:value-of select="AccessURL/URL"/></dc:identifier>
   <dc:description><xsl:value-of select="AccessURL/Description"/></dc:description>
 </oai_dc:dc>
</metadata>

<about> 
	<rights xmlns="http://www.openarchives.org/OAI/2.0/rights/"  
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
			xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/rights/
         	http://www.openarchives.org/OAI/2.0/rights.xsd">
		<rightsDefinition>
			<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/"
					xmlns:dc="http://purl.org/dc/elements/1.1/"
					xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
					xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/
				   	http://www.openarchives.org/OAI/2.0/oai_dc.xsd">
				<dc:title>Rights Conveyence</dc:title>
				<dc:date>2006-07-19</dc:date>
				<dc:creator>SPASE Person ID: <xsl:value-of select="Contact/PersonID"/></dc:creator>
				<dc:description><xsl:value-of select="Acknowledgement"/></dc:description>
			</oai_dc:dc>
		</rightsDefinition>
   </rights>
</about>
</xsl:template>

</xsl:stylesheet>
