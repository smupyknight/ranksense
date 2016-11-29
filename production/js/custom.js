var previousWidth;

$(document).ready(function() {
	previousWidth = $(window).width();

	// Switch tabs between seo pipeline and targets.
	$(".statistic-panel > .x_title > .navbar-left > li > a").click(function() {
		$(".statistic-panel > .x_title > .navbar-left > li > a").removeClass("active");

		$(".statistic-panel .x_content .row").hide();
		$("." + $(this).attr("panel")).show();

		$(this).addClass("active");
	});

	$(".statistic-panel > .x_title > .navbar-right > li > a").click(function() {
		$(".statistic-panel > .x_title > .navbar-right > li > a").removeClass("active");
		$(this).addClass("active");
	});


	// Switch tabs on popup menu
	$(".modal-project-settings .modal-body-header > .row > .col-md-2 > span").click(function() {
		$(".modal-project-settings .modal-body-header > .row > .col-md-2 > span").removeClass("active");
		$(this).addClass("active");

		$(".modal-project-settings .modal-body-tab").addClass("invisible");
		$($(this).attr("panel")).removeClass("invisible");

		// $(".modal-body-content").css("box-shadow", "0px 0px 5px 2px #dddddd");
		// if ($(this).attr("panel") == "#modalBodyPayments") {
		// 	$(".modal-body-content").css("box-shadow", "0px 0px 0px 0px #dddddd");
		// }
	});

	$(".modal-account-settings .modal-body-header > .row > .col-md-2 > span").click(function() {
		$(".modal-account-settings .modal-body-header > .row > .col-md-2 > span").removeClass("active");
		$(this).addClass("active");

		$(".modal-account-settings .modal-body-tab").addClass("invisible");
		$($(this).attr("panel")).removeClass("invisible");

		$(".modal-body-content").css("box-shadow", "0px 0px 5px 2px #dddddd");
		if ($(this).attr("panel") == "#modalBodyPayments") {
			$(".modal-body-content").css("box-shadow", "0px 0px 0px 0px #dddddd");
		}
	});

	//Switch selection between seo-pipeline widgets
	$(".div-5").click(function() {
		$(".div-5").removeClass("active");
		$(this).addClass("active");
	});

	$(window).resize(function() {
		if ($(window).width() > 991 && previousWidth <= 991) {
			$("body").removeClass("nav-sm");
			$("body").addClass("nav-md");

			$("#sidebar-menu").find('li.active-sm ul').show();
            $("#sidebar-menu").find('li.active-sm').addClass('active').removeClass('active-sm');

			previousWidth = $(window).width();
		}
		else if ($(window).width() <= 991 && previousWidth > 991) {
			$("body").removeClass("nav-md");
			$("body").addClass("nav-sm");

			$("#sidebar-menu").find('li.active ul').hide();
            $("#sidebar-menu").find('li.active').addClass('active-sm').removeClass('active');

			previousWidth = $(window).width();
		}

		$("#datatable_paginate").parent().attr("class", "col-md-12 col-sm-12 col-xs-12");
        $(".dataTables_paginate").css("margin-left", $(".dataTables_paginate").parent().width() / 2 - $(".dataTables_paginate").width() / 2 + "px");
	});

	$(".right_col").css("min-height", "0px");

	// Percent graph
	for (i = 1; i <= 4; i++) {

		var arc = d3.arc()
		    .innerRadius(50 - $(".chart" + i).attr("thickness"))
	    	.outerRadius(50)
	    	.startAngle(angle2Radian($(".chart" + i).attr("startAngle")))
	    	.endAngle(angle2Radian($(".chart" + i).attr("endAngle") - 1));

	    d3.select(".chart" + i + " path")
	    	.attr("d", arc)
	    	.attr("transform", "translate(50, 50)");

	    d3.select("#txtPercent" + i)
			.attr("x", getTextPoint(i).x)
			.attr("y", getTextPoint(i).y)
	    	.attr("font-size", "8px")
	    	.attr("font-family", "sans-serif")
	    	.style("fill", "#ffffff")
	    	.style("text-anchor", "middle")
	    	.text( ($(".chart" + i).attr("endAngle") - $(".chart" + i).attr("startAngle")) / 360 * 100 + "%" );
	}

	d3.select("#centerText")
		.attr("x", 50)
		.attr("y", 50)
		.attr("font-size", "7px")
		.attr("font-family", "sans-serif")
		.style("fill", "#909090")
		.style("text-anchor", "middle")
		.text("Potential Revenue");

	// Hide elements from slider
	hideUnnecessarySliderComponents();
});

function getTextPoint(i) {
	var radius = 50 - $(".chart" + i).attr("thickness") / 2;
	var startAngle = $(".chart" + i).attr("startAngle");
	var endAngle = $(".chart" + i).attr("endAngle");
	var middleRadian = angle2Radian(convertAngle(parseInt(startAngle) / 2 + parseInt(endAngle) / 2));
	//var startRadian = angle2Radian(convertAngle(startAngle));
	//var endRadian = angle2Radian(convertAngle(endAngle));

	return { x: radius * (Math.cos(middleRadian)) + 50, y: -radius * (Math.sin(middleRadian)) + 50 };
}

function convertAngle(angle) {
	angle = 360 - angle;
	
	if (angle >= 270) {
		angle -= 270;
	}
	else {
		angle += 90;
	}
	return angle;
}

function angle2Radian(angle) {
	var PI = 3.1415926;
	return angle * PI / 180;
}

function hideUnnecessarySliderComponents() {
	$(".irs-min").hide();
	$(".irs-max").hide();
	$(".irs-from").hide();
	$(".irs-to").hide();
	$(".irs-single").hide();
	$(".irs-grid").hide();
}