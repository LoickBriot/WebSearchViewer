<!DOCTYPE html>
<html style="height:100%;">
<head>
    <meta charset="UTF-8">
    <script src="../../jquery-1.7.2.min.js"></script>
    <script src="../../lib/WebViewer.min.js"></script>
    <script src="../../lib/html5/ControlUtils.js"></script>
	<script src="config.js"></script>
    
	<script language="javascript">
	var searchedText = '<?php  echo $_POST['fullSearch']; ?>';
	var path = "http://localhost/WebViewer/";
	// génération du tableau grâce à la variable searchedText
		
	var myArray = new Array("document_patriote.pdf",  "test.pdf",  "these.pdf" ,"test2.pdf",  "test3.pdf");
	var longueur= myArray.length-1;	
	var i=0;
	var currentLoad = myArray[0];
	
	 function allerA(form) {
		i = SelectMenu.selectedIndex;
		//myWebViewer.loadDocument(path + myArray[i]);
	 }
	
	
	
    $(function() {
				
		var viewerElement = document.getElementById('viewer');
        var myWebViewer = new PDFTron.WebViewer({
				type: "html5",
				path: "../../lib",
				html5Path: "html5/ReaderControl.html",
				initialDoc: path + myArray[i],
				config: "config.js",
				custom: searchedText,
				showToolbarControl: false,
				enableReadOnlyMode: true
			}, viewerElement);	
		
		
		$(viewerElement).on("toolModeChanged", function(event) {
			myWebViewer.setToolMode(PDFTron.WebViewer.ToolMode.Pan);
		});
		
		
		$('#nextDocumentButton').on('click', function() {
			i=i+1;
			if (i > longueur ) i=i-1;
			else {
				myWebViewer.loadDocument(path + myArray[i]);
				currentLoad = myArray[i];
				SelectMenu.selectedIndex=i;
			}
        });
		
		
		$('#previousDocumentButton').on('click', function() {
			i=i-1;
			if (i<0) i=i+1;
			else{
				myWebViewer.loadDocument(path + myArray[i]);
				currentLoad = myArray[i];
				SelectMenu.selectedIndex=i;
			}
        });
		
		$('form').on('click', function() {
			if (currentLoad !== myArray[i]){
				myWebViewer.loadDocument(path + myArray[i]);
				currentLoad = myArray[i];	
			}
        });
		
			
});
    </script>
	
	
</head>

<body style="width:70%;height:85%;margin:auto;padding:0px;overflow:hidden">              
            
	
	<div>
	
			<form name="form" id="form">
			<select style="width: 200px" name='SelectMenu' id='SelectMenu' onChange='allerA(this.form)'>
			<script language="javascript">
				for(var j=0; j<myArray.length; j++){
					document.write("<option>" + myArray[j] + "</option>");
				}
			</script>
			</select>
			</form>
		
		
		<p></p>
		<a href="index.php"> Revenir à la page d'accueil </a>
		<input id="previousDocumentButton" type="button" value="Précédent document"/>	
		<input id="nextDocumentButton" type="button" value="Prochain document"/>		
		<p></p>	
	</div>	
    
    <div id="viewer" style="height: 100%; overflow: hidden;"></div>
	
</body>
</html>