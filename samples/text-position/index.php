<!DOCTYPE html>
<html style="height:100%;">
<head>
    <meta charset="UTF-8">
    <script src="../../jquery-1.7.2.min.js"></script>
    <script src="../../lib/WebViewer.min.js"></script>
    <script src="../../lib/html5/ControlUtils.js"></script>
    
	<script>
		
    $(function() {
				
		
		var viewerElement = document.getElementById('viewer');
        var myWebViewer = new PDFTron.WebViewer({
				type: "html5",
				path: "../../lib",
				html5Path: "html5/ReaderControl.html",
				initialDoc: "http://localhost/WebSearchViewer/accueil.pdf",
				//config: "config_index.js",
				showToolbarControl: false,
				showSidePanel: false,
				enableReadOnlyMode: true
			}, viewerElement);	
		
	
		
		$('#mainRunSearchButton').on('click', function() {
			// rediriger vers la page search.php avec ('#searchText').val();
			window.location.replace('search.php');
        });
		
		
		$(viewerElement).on("toolModeChanged", function(event) {
			myWebViewer.setToolMode(PDFTron.WebViewer.ToolMode.Pan);
		});
				
					
});
    </script>
	
	
</head>

<body style="width:70%;height:85%;margin:auto;padding:0px;overflow:hidden">              
            
	<div>
		<p></p>
		<form method="post" action="search.php">
			Texte recherché : 
			<input type="text" name="fullSearch" id="#searchText" />
			<input id="mainRunSearchButton" type="submit" value="Lancer la recherche"/>
			<!--<input type="checkbox" name="wholeWord" id="#wholeWord" value="true" checked> Mot en entier-->
		</form>
		<p></p>
	</div>
	
    
    <div id="viewer" style="height: 100%; overflow: hidden;"></div>
	
</body>
</html>