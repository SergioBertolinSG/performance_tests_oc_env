function getTitles(jsonData){
	var titles = [];
	jsonData.measurement.performance.forEach(function(entry) {
		switch(entry.type){
			case "putFile":
			    titles.push(entry.type + "\n" + entry.cardinality);
				break;
			case "getFile":
			    titles.push(entry.type + "\n" + entry.cardinality);
				break;
			case "propfindFolderSizes":
			    titles.push(entry.type + "\n" + entry.cardinality);
				break;
			case "copyFolder":
			    titles.push(entry.type + "\n" + entry.cardinality);
				break;
			default:
				titles.push(entry.type);
		}
    });
	return titles;
}

function getValues(jsonData){
	var values = [];
	jsonData.measurement.performance.forEach(function(entry) {
		values.push(entry.value);
	});
	return values;
}

function getLabel(jsonData){
	return jsonData.environment["git.tag"] + jsonData.environment.time;
}

function getMysqlVersion(jsonData){
	return jsonData.environment.mysql;
}

function getPhpVersion(jsonData){
	return jsonData.environment.php;
}

function prepareChartData(dataJSON1, dataJSON2){
	var titles1 = getTitles(dataJSON1);
	var values1 = getValues(dataJSON1);
	var values2 = getValues(dataJSON2);
	var label1 = getLabel(dataJSON1);
	var label2 = getLabel(dataJSON2);
	var barChartData = {
		labels : titles1,
		datasets : [
			{
				fillColor : "rgba(246, 84, 9,0.5)",
				strokeColor : "rgba(246, 84, 9,0.8)",
				highlightFill: "rgba(246, 84, 9,0.75)",
				highlightStroke: "rgba(246, 84, 9,1)",
				data : values1,
				label: label1
			},
			{
				fillColor : "rgba(8, 49, 119,0.5)",
				strokeColor : "rgba(8, 49, 119,0.8)",
				highlightFill : "rgba(8, 49, 119,0.75)",
				highlightStroke : "rgba(8, 49, 119,1)",
				data : values2,
				label: label2
			}
		]
	}
	return barChartData;
}

function fillSelects(){
	$("#server1").empty();
	$("#server2").empty();
	$.getJSON('index.php/list_files_available', function(data) {
    	    $.each(data,function(key, value) 
			{
    			$("#server1").append('<option value=' + value + '>' + value + '</option>');
    			$("#server2").append('<option value=' + value + '>' + value + '</option>');
			});
    })
}

$(document).ready(function(){
	$("#compareButton").click(function(){
        var dataJSON1, dataJSON2;
        $.when(
	    	$.getJSON('index.php/get_file/' + $("#server1 option:selected" ).text(), function(data) {
	    	    dataJSON1 = data;
	    	}),
	    	$.getJSON('index.php/get_file/' + $("#server2 option:selected" ).text(), function(data) {
	    	    dataJSON2 = data;
	    	})
	    ).then(function() {
	    	if (dataJSON1 && dataJSON2) {
	    	    var ctx = $("#canvas").get(0).getContext("2d");
				var myBar = new Chart(ctx).Bar(prepareChartData(dataJSON1, dataJSON2), {
					responsive : true,
				});
				$('#js-legend').html(myBar.generateLegend());
				$('#js-legend').append(
					"<p>" +
					"mysql" + " : " + getMysqlVersion(dataJSON1) + "<br>" +
					"php" + " : " + getPhpVersion(dataJSON1) +
					"</p>"
				);
	    	}
	    	else {
	    	    console.log("Data from json files could not be retrieved");
	    	}
	    });
	});

	$("#runButton").click(function(){
		$.get('index.php/run_tests/' + $("#selectGithubTag option:selected" ).text(), function(data){
			$("#runLabel").text('PID:' + data);
		});
	});

	$("#server1").click(function(){
		fillSelects();
	});

	$("#server2").click(function(){
		fillSelects();
	});

	fillSelects();

    $.getJSON('https://api.github.com/repos/owncloud/core/tags', function(data) {
    	    $.each(data,function(key, value) 
			{
				$("#selectGithubTag").append('<option value=' + value.name + '>' + value.name + '</option>');
			});
    })

});

