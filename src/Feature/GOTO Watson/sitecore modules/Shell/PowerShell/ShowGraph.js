var data = JSON.parse(sessionStorage.getItem("tones"));
var layout = {
	polar: {
		radialaxis: {
			visible: false,
			range: [0, 1]
		}
	},
	showlegend: false,
	margin: {
		l: 70,
		r: 70,
		b: 0,
		t: 20,
		pad: 4
	}
}
var showCharts = function() {
	jQuery('.charts').empty();
	jQuery('.menuitems li').removeClass('active');
	jQuery(this).addClass('active');
	
	var index = jQuery(this).data('index');
	var categories = (index !== undefined ? data[jQuery(this).data('type')][index] : data[jQuery(this).data('type')]).tone_categories;
	jQuery.each(categories, function (ida, category) {
		var dataValues = [{
			  type: 'scatterpolar',
			  r: [],
			  theta: [],
			  fill: 'toself'
			}];
		jQuery.each(category.tones, function (idb, tone) {
			dataValues[0].theta.push(tone.tone_name);
			dataValues[0].r.push(tone.score);
		 });
		var id = "chart" + ida;
		var container = jQuery(`<div class="canvas-holder"><h3>${category.category_name}</h3><div id="${id}"></div></div>`);
		jQuery('.charts').append(container);
		Plotly.plot(id, dataValues, layout, {displayModeBar: false});
	});
}
jQuery(function() {
	var menuitems = jQuery('.menuitems');
	if (data.document_tone) {
		menuitems.append(`<li data-type="document_tone">Entire document</li>`);
	}
	if (data.sentences_tone) {
		jQuery.each(data.sentences_tone, function(index, elem) {
			if (elem.text.length > 5) {
				menuitems.append(`<li data-type="sentences_tone" data-index="${index}">Sentence: ${elem.text}</li>`);
			}
		});
	}
	
	jQuery('.menuitems').on('click','li',showCharts);
	jQuery('.menuitems li:first').click();
});