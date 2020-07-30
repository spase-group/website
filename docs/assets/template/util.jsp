<%@ page 
   import="java.io.File"
   import="java.io.FileFilter"
   import="java.util.Comparator"
  import="java.util.ArrayList"
   import="java.text.SimpleDateFormat" 
%>

<%! 
   String mFilterMask = ".*";
   
   /**
    * Generate a list files matching a pattern which are 
    * in the folder than contains the servlet.
    **/
  public File[] getFileList(HttpServletRequest req, String filter) {
     return getFileList(req, "", filter);
   }
     
   /**
    * Generate a list files matching a pattern which are 
    * in the folder than contains the servlet.
    **/
  public File[] getFileList(HttpServletRequest req, String path, String filter) {
     File doc = new File(req.getRealPath(req.getServletPath()));
     File folder = new File(doc.getParent() + path);
     // Find all release versions
     mFilterMask = filter;
     File[] list = folder.listFiles(new FileFilter()	{ public boolean accept(File pathname) { return pathname.getName().matches(mFilterMask); } } );
     mFilterMask = ".*";
     
     if(list != null) { // Sort 
        java.util.Arrays.sort(list, new Comparator()	{ public int compare(Object o1, Object o2) { return -((File)o1).getName().compareToIgnoreCase(((File)o2).getName()); } } ); 
     }
   
     return list;
   }
   
   /**
    * Generate a list folders matching a pattern which are 
    * in the folder than contains the servlet.
    **/
  public File[] getFolderList(HttpServletRequest req, String filter) {
     return getFolderList(req, "", filter);
   }
     
   /**
    * Generate a list files matching a pattern which are 
    * in the folder than contains the servlet.
    **/
  public File[] getFolderList(HttpServletRequest req, String path, String filter) {
     File doc = new File(req.getRealPath(req.getServletPath()));
     File folder = new File(doc.getParent() + path);
     // Find all release versions
     mFilterMask = filter;
     File[] list = folder.listFiles(new FileFilter()	{ public boolean accept(File pathname) { return (pathname.isDirectory() && pathname.getName().matches(mFilterMask)); } } );
     mFilterMask = ".*";
     
     if(list != null) { // Sort 
        java.util.Arrays.sort(list, new Comparator()	{ public int compare(Object o1, Object o2) { return -((File)o1).getName().compareToIgnoreCase(((File)o2).getName()); } } ); 
     }
   
     return list;
   }
   
   /**
    * Extact version from a file name.
    * It assumes the format of the filename is "base-version.ext";
    **/
   public String getFileVersion(File file) {
      // Get current version
      String	version = "none";
   
      String[] part = file.getName().split("[-.]");
	  
      if(part.length > 1) {
		  if(part[part.length-2].equals("draft")) {
			version =  part[part.length-3].replaceAll("_", ".");
		  } else {
			version = part[part.length-2].replaceAll("_", ".");
		  }
	  }
	  
      // int n = version.lastIndexOf('.');
      // if(n != -1) version = version.substring(0, n);
      return version;
   }
   
   /**
    * Extact version from a folder name.
    * It assumes the format of the filename is "base-version";
    **/
   public String getFolderVersion(File file) {
      // Get current version
      String	version = "none";
   
      String[] part = file.getName().split("[-.]");
      if(part.length > 1) version = part[part.length-1].replaceAll("_", ".");
      
      return version;
   }

    /**
    * Extact base name of file.
    **/
   public String getBaseName(File file) {
		String base = file.getName();
		int n = base.lastIndexOf(".");
		if(n != -1) base = base.substring(0, n);
      
      return base;
   }

   /**
    * Generate URL to the current folder.
    **/
  public String getRequestPath(HttpServletRequest req) {
     String file = req.getRequestURI();
     int n = file.lastIndexOf('/');
     if(n != -1) file = file.substring(0, n);
     String path = "http://" + req.getServerName() + file;

     return path;
  }
%>
