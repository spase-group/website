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
      <assert test="../StartDate &lt; ../StopDate">
         Both StartDate and StopDate are present.\nStartDate must be less than StopDate.
      </assert>
    </rule>
  </pattern>

  <!-- Check that Parameter exists - must have at least one -->
  <pattern id="parameter" name="Check Parameter is present">
    <rule context="NumericalData">
      <assert test="Parameter">
         One or more Parameter descriptions are needed.
      </assert>
    </rule>
    <rule context="DisplayData">
      <assert test="Parameter">
         One or more Parameter descriptions are needed.
      </assert>
    </rule>
    <rule context="Catalog">
      <assert test="Parameter">
         One or more Parameter descriptions are needed.
      </assert>
    </rule>
  </pattern>
  
</schema>