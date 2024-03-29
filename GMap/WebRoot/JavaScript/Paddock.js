//for polygon
var newPaddock = new google.maps.Polygon();
var newPaddockCoords;
var markersArray;

//for sj-Dialog
function openPaddockDialog() {
	if (newPaddockCoords == undefined) {
		console.log("undefined newPaddockCoords on the map!");
		showPaddockMsg("No new Paddock :-(");
	} else {
		if (newPaddockCoords.getLength() > 2) {
			console.log("Open paddock Dialog");
			$("#pDialog").dialog("open");
			showPaddockMsg("");
		} else {
			showPaddockMsg("Not enouth coords! :-(");
		}
	}
}

function closePaddockDialog() {
	$("#pDialog").dialog("close");
}

function submitNewPaddock() {
	console.log("New Paddock Submit from Dialog!");
	showPaddockMsg("");
	
	var newPaddockId, newPaddockName, newPaddockFC, newPaddockDescription;
	var checkFlag = false;
	var errors = new google.maps.MVCArray();
	
	//for newPaddockID input.
//	console.log($("#newPaddockId").attr("value"));
//	console.log($('input[name="PIDBOX"]:checked').val());
	if ($("#newPaddockId").attr("value") == "" && $('input[name="PIDBOX"]:checked').val() == undefined) {
//		showPaddockMsg("Input a newPaddockID or choose default!");
		errors.push("Input a newPaddockID or choose default!");
		$("#newPaddockId").effect('highlight', {'color':'red'}, 2000);
	} else {
		if ($("#newPaddockId").attr("value") != "") {
			newPaddockId = $("#newPaddockId").attr("value");
			if (numberCheck(newPaddockId) == 0) {
				errors.push("Input an Integer for newPaddockID or choose default!");
				$("#newPaddockId").effect('highlight', {'color':'yellow'}, 2000);
			}
		}
		if ($('input[name="PIDBOX"]:checked').val() == "true") {
			newPaddockId = 0;
		}
	}
	console.log("newPaddockId: " + newPaddockId);
	
	//for newPaddockName input.
//	console.log($("#newPaddockName").attr("value"));
//	console.log($('input[name="PNBOX"]:checked').val());
	if ($("#newPaddockName").attr("value") == "" && $('input[name="PNBOX"]:checked').val() == undefined) {
//		showPaddockMsg("Input a newPaddockName or choose default!");
		errors.push("Input a newPaddockName or choose default!");
		$("#newPaddockName").effect('highlight', {'color':'red'}, 2000);
	} else {
		if ($("#newPaddockName").attr("value") != "") {
			newPaddockName = $("#newPaddockName").attr("value");			
		}
		if ($('input[name="PNBOX"]:checked').val() == "true") {
			newPaddockName = 'default';
		}
	}
	console.log("newPaddockName: " + newPaddockName);
	
	//for newPaddockFeedCapacity.
//	console.log($("#newPaddockFC").attr("value"));
//	console.log($('input[name="PFCBOX"]:checked').val());
	if ($("#newPaddockFC").attr("value") == "" && $('input[name="PFCBOX"]:checked').val() == undefined) {
//		showPaddockMsg("Input a newPaddockFC or choose default!");
		errors.push("Input a newPaddockFC or choose default!");
		$("#newPaddockFC").effect('highlight', {'color':'red'}, 2000);
	} else {
		if ($("#newPaddockFC").attr("value") != "") {
			newPaddockFC = $("#newPaddockFC").attr("value");
			if (numberCheck(newPaddockFC) == 0) {
				errors.push("Input an Integer for newPaddockFC or choose default!");
				$("#newPaddockFC").effect('highlight', {'color':'yellow'}, 2000);
			}
		}
		if ($('input[name="PFCBOX"]:checked').val() == "true") {
			newPaddockFC = 0;
		}
	}
	console.log("newPaddockFC: " + newPaddockFC);
	
	//for newPaddockDescription
	if ($("#newPaddockDescription").attr("value") == "" && $('input[name="PDBOX"]:checked').val() == undefined) {
//		showPaddockMsg("Input a newPaddockFC or choose default!");
		errors.push("Input a newPaddockDescription or choose default!");
		$("#newPaddockDescription").effect('highlight', {'color':'red'}, 2000);
	} else {
		if ($("#newPaddockDescription").attr("value") != "") {
			newPaddockDescription = $("#newPaddockDescription").attr("value");
		}
		if ($('input[name="PDBOX"]:checked').val() == "true") {
			newPaddockDescription = 'default';
		}
	}
	console.log("newPaddockDescription: " + newPaddockDescription);
	
	showPaddockMsg(errors.getAt(0));
//	console.log("ErrorCount: " + errors.getLength());
	if (errors.getLength() == 0) {
		completePaddock(newPaddockId, newPaddockName, newPaddockFC, newPaddockDescription);
		$("#pDialog").dialog("close");
	}
}

//for error message show up.
function showPaddockMsg(errorMsg) {
	$("#paddockMsgDIV").empty();
	$("#paddockMsgDIV").html(errorMsg);
	$("#paddockMsgDialog").empty();
	$("#paddockMsgDialog").html(errorMsg);
}

// activate a new mouse listener
function startNewPaddock() {
	newPaddockCoords = new google.maps.MVCArray();
	markersArray = new google.maps.MVCArray();
	myMouseListener = google.maps.event.addListener(map, 'click', function(e) {
		addCorner(e.latLng);
	});
}

// remove the last marker and its position
function undoLastMark() {
	newPaddockCoords.pop();
	markersArray.getAt(markersArray.getLength() - 1).setMap(null);
	markersArray.pop();
}

// complete the newPaddock and show it on map
function completePaddock(pid,pname,pfc,pdescription) {
	// Render the new paddock on the map.
	showNewPaddock(newPaddockCoords);
	// alert(newPaddockCoords.getAt(0).lat());

	// add this paddock to DB.
	addPaddock(newPaddockCoords,pid,pname,pfc,pdescription);

	// clear all that new paddock array.
	newPaddockCoords.clear();
	if (markersArray) {
		for ( var i = 0; i < markersArray.getLength(); i++) {
			// clear all that new paddock markers.
			markersArray.getAt(i).setMap(null);
		}
	}
	markersArray.clear();
	google.maps.event.removeListener(myMouseListener);
	
//	//To reload the paddock info jsp.
//	$(document).ready(function() {
//		update_paddockInfo_data();
//		update_paddockTodo_data();
//	});
}

// place a new marker on the mouse click position
function placeMarker(location) {
	var marker = new google.maps.Marker({
		position : location,
		map : map
	});
	markersArray.push(marker);
	// alert(markersArray.getLength());
}

// Add a new corner to that MVCArray.
function addCorner(location) {
	placeMarker(location);
	newPaddockCoords.push(location);
	if (newPaddockCoords.getLength() > 2) {
		if (newPaddock.getMap != null) {
			newPaddock.setMap(null);
		}
		showNewPaddock(newPaddockCoords);
	}
}

// draw fenceline function
function showNewPaddock(path) {
	newPaddock = new google.maps.Polygon({
		path : path,
		strokeColor : '#ff0000',
		strokeOpacity : 0.8,
		strokeWeight : 2,
		fillColor : "",
		editable : false,
		fillOpacity : 0.35,
	});
	newPaddock.setMap(map);
}

//use ajax to add this paddock to DB and redraw the map_canvas.
function addPaddock(path,pid,pname,pfc,pdescription) {
	
	//calculate the center of this polygon.
	var polyBound = new google.maps.LatLngBounds();
	path.forEach(function(item, index) {
		polyBound.extend(path.getAt(index));
	});
	var polyArea = (google.maps.geometry.spherical.computeArea(path)/10000).toFixed(2);
	console.log(polyArea);
	
	var jsonPath = "[";
	path.forEach(function(item, index) {
		jsonPath += "{"+ "\"" + "CLat" + "\"" + ":" + path.getAt(index).lat() + ",\"CLon\":"
				+ path.getAt(index).lng() + "}" + ",";
	});

	jsonPath = jsonPath.substring(0, jsonPath.lastIndexOf(','));
	jsonPath += "]";

	var url = "Paddock/AddPaddock";
	var param = {
		newPaddockCorners : jsonPath,
		newPaddockCenterLat : polyBound.getCenter().lat(),
		newPaddockCenterLon : polyBound.getCenter().lng(),
		newPadoockArea : polyArea,
		newPId : pid,
		newPName : pname,
		PFeedCapacity : pfc,
		PDescription : pdescription
	};
	$.post(url, param, function(brandNewPaddockID) {
		initialize();
		$(document).ready(function() {
			$("#map_canvas").data("focusPaddockID", brandNewPaddockID);
			showSelectedPaddockInfo();
			setTimeout(function() {
				highLightPaddock(brandNewPaddockID);
			}, 500);
		});
	});	
}

function deleteSelectedPaddock() {
	deletePaddock($("#map_canvas").data("focusPaddockID"));
}

//using ajax to delete the selected paddock and redraw the map_canvas.
function deletePaddock(selectedPId) {
	//alert(selectedPId);
	var url = "Paddock/DeletePaddock";
	var param = {
			selectedPId : selectedPId,
	};
	$.post(url, param, function() {
		initialize();
	});
}

//Show selected paddock basic info in a jsp page, load it into main page.
function showSelectedPaddockInfo(pid) {
	console.log("SelectedPID: " + $("#map_canvas").data("focusPaddockID"));
	var url = "Paddock/ShowPaddock";
	var param = {
			selectedPId: pid
	};
//	$.getJSON(url, param, function(singlePaddock) {
//		console.log(singlePaddock);
//		update_paddockTodo_data();
//		update_paddockInfo_data();
//	});
	$.post(url, param, function(singlePaddock) {
		$(document).ready(function() {
			console.log(singlePaddock);
			update_paddockTodo_data();
			update_paddockInfo_data();
		});
	});
}

//reload the paddockinfo forms.
function update_paddockInfo_data(){

	$(document).ready(function() {
		setTimeout(function() {
			$(".paddockInfoDIV").load('paddockInfo.jsp');
		}, 500);
	});
	console.log("update_paddockInfo_data");
}

//reload the paddockTodo forms.
function update_paddockTodo_data(){

	$(document).ready(function() {
		setTimeout(function() {
			$(".paddockTodoDIV").load('paddockTodo.jsp');
		}, 500);
	});
	console.log("update_paddockTodo_data");
}

//using jQuery-Grid to build up a grid to update the names of those paddocks.
function paddockGridTest() {
	$("#gridTable").jqGrid({
		url: "PaddockGrid/ShowPaddockGrid",
		datatype: "json",//XML
		mtype: "GET",
		height: 150,
		autowidth: true,
		colModel: [
	          {name:"pid",index:"pid",label:"PID",width:40},
		      {name:"pName",index:"pName",label:"pName",width:80,sortable:false},
		      {name:"pCenterLat",index:"pCenterLat",label:"pCenterLat",width:120,sortable:false},
		      {name:"pCenterLon",index:"pCenterLon",label:"pCenterLon",width:120,sortable:false},
		      {name:"pDescription",index:"pDescription",label:"pDescription",width:80,sortable:false},
		      {name:"pFeedCapability",index:"pFeedCapability",label:"pFeedCapability",width:160,sortable:false}
		],
		viewrecords: true,
		rowNum: 15,
		rowList: [15,20,25],
		prmNames: {search: "search"},	//(1)
		jsonReader: {
			root:"gridModel",		// (2)
			records: "record",		// (3)
			repeatitems : false		// (4)
		},
		pager: "#gridPager",
		caption: "Paddock Infomation",
		hidegrid: false
	});
}