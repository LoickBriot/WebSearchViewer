<!DOCTYPE html>
<html style="height:100%;">
<head>
    <meta charset="UTF-8">
    <script src="../../jquery-1.7.2.min.js"></script>
    <script src="../../lib/WebViewer.min.js"></script>
    <script src="../../lib/html5/ControlUtils.js"></script>
	<script src="config.js"></script>
    
	<script language="javascript">
	
	// récupération de la variable
	var searchedWord = '<?php echo $_POST['fullSearch']; ?>';
	//var bool = '<?php if(isset($_POST['wholeWord'])) { echo $_POST['wholeWord']; } else { echo 'false';} ?>'
	
	/*if (bool=="true"){
		bool = true;
	} else {
		bool = false;
	}*/
	//génération du tableau de document et de mots similaires grâce à la variable searchedWord
	var documentList = new Array("document_patriote.pdf",  "test.pdf",  "these.pdf" ,"test2.pdf",  "test3.pdf");
	var wordList = new Array(searchedWord, "vous", "lous", "nous");
	var path = "http://localhost/WebSearchViewer/";
	var longueur= documentList.length-1;	
	var i=0;
	var j=0;
	
	var currentLoad = documentList[i];
	var currentWord = wordList[j];
	
    $(function() {
		
		var viewerElement = document.getElementById('viewer');
        var myWebViewer = new PDFTron.WebViewer({
				type: "html5",
				path: "../../lib",
				html5Path: "html5/ReaderControl.html",
				initialDoc: path + documentList[i],
				config: "config.js",
				custom: searchedWord,
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
				myWebViewer.loadDocument(path + documentList[i]);
				currentLoad = documentList[i];
				SelectMenu.selectedIndex=i;
			}
        });
		
		
		$('#previousDocumentButton').on('click', function() {
			i=i-1;
			if (i<0) i=i+1;
			else{
				myWebViewer.loadDocument(path + documentList[i]);
				currentLoad = documentList[i];
				SelectMenu.selectedIndex=i;
			}
        });
		
	
		$('form').on('click', function() {
			if (currentLoad !== documentList[i]){
				myWebViewer.loadDocument(path + documentList[i]);
				currentLoad = documentList[i];	
			}
        });
		
		$('wordForm').on('click', function() {
			if (currentWord != wordList[j]){
				SelectWord.selectedIndex=j;
				currentWord = wordList[j];
				window.location.replace('search.php');						
			}
        });
		
			
});
    </script>
	
	
</head>

<body style="width:70%;height:85%;margin:auto;padding:0px;overflow:hidden">              
            
	
	<div>
		
		<form name="form" id="form">
			Choisir un document contenant ce mot dans la liste déroulante:
			<select style="width: 200px" name='SelectMenu' id='SelectMenu' onChange='allerA(this.form)'>
			<script language="javascript">
				for(var k=0; k<documentList.length; k++){
					document.write("<option>" + documentList[k] + "</option>");
				}
			</script>
			<input id="mainRunSearchButton" type="submit" value="Valider"/>
			</select>
		</form>
		
		<p></p>
		
		<form name="form" id="wordForm" method="post" action="search.php">
			Choisir un mot similaire dans la liste déroulante :
			<select style="width: 200px" name='SelectWord' id='SelectWord' onChange='chooseWord(this.wordForm)'>
			<script language="javascript">
				for(var k=0; k<wordList.length; k++){
					document.write("<option>" + wordList[k] + "</option>");
				}
			document.write("<input type='hidden' name='fullSearch' id='#searchText' value='" + wordList[j] + "'/>" ); // 
			document.write("<input type='hidden' name='fullSearchIndice' id='#searchTextIndice' value='" + j + "'/>" ); // 
			</script>
			<input id="mainRunSearchButton" type="submit" value="Valider"/>
			</select>
		</form>
		
		
		
		<p></p>
		<a href="index.php"> Revenir à la page d'accueil </a>
		<input id="previousDocumentButton" type="button" value="Précédent document"/>	
		<input id="nextDocumentButton" type="button" value="Prochain document"/>		
		<p></p>	
		
	
	</div>	
	
	<script language="javascript">
	
	function allerA(form) {
		var i = SelectMenu.selectedIndex;
		//myWebViewer.loadDocument(path + documentList[i]);
	 }
	 
	 
	function chooseWord(wordForm) {
		var j = SelectWord.selectedIndex;
		var obj = document.getElementById('#searchText');
		obj.value = wordList[j] ;
		//myWebViewer.loadDocument(path + documentList[i]);
	 }
    </script>
    <div id="viewer" style="height: 100%; overflow: hidden;"></div>
	
</body>
</html>