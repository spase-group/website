<schema xmlns="http://purl.oclc.org/dsdl/schematron">
  <!-- SPASE Base Model content validation -->

  <!-- Make sure all elements have content -->
   <pattern id="content" name="Check for content">
    <rule context="*">
      <assert test="string-length(.) &gt; 0" id="has-content">
        The element '<value-of select="name()" />' does not have any content.\nIt must contain text or other elements.
      </assert>
    </rule>
  </pattern>
  
  <!-- Check that StartDate is less than StopDate (if StopDate is present) -->
  <pattern id="time" name="Check time values">
    <rule context="StopDate">
      <assert test="../StartDate le ../StopDate">
         Both StartDate and StopDate are present.\nStartDate must be less than or equal to StopDate.
      </assert>
    </rule>
  </pattern>
  
</schema>