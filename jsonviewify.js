
var jsonifyul = document.createElement("ul");
jsonifyul.setAttribute('class', 'jsonnodeview');
var collapsed;

function JsonViewifyHtml(json, params) {
	if (json == null) { alert("json is null"); return ""; }
	collapsed = !params ? true : params.collapsed != 'false';
	var levels = (params && params.levels) ? params.levels : 1;

	return JsonViewifyInnerList(json, levels+1);
}

function GenerateName(param, defaultname) {
	if (!param) return defaultname;
	if (param.id) return param.id;
	if (param.name) return param.name;
	return defaultname;
}

function JsonViewifyInnerList(val, level) {
	var ul = jsonifyul.cloneNode(false);
	if (collapsed && level-- < 0) {
		ul.style.setProperty('display', 'none');
	} else {
		ul.style.setProperty('display', 'block');
	}

	$.each(val, function (i, v) {
		if (!v) return true;
		
		ul.appendChild(BuildListItem(i, v, level));
	});

	return ul;
}

var arrayTypes = ["object", "array"];
function BuildListItem(k, v, level) {
	var li = document.createElement("li");

	if ($.inArray($.type(v), arrayTypes) >= 0) {
		li.appendChild(document.createTextNode(GenerateName(v, k)));
		li.appendChild(CreateExpandoDiv());
		li.appendChild(JsonViewifyInnerList(v, level));
	} else {
		li.appendChild(document.createTextNode(k + " : " + v));
	}

	return li;
}

function WriteObject(val) {
	if (!val) return true;
	var ul = jsonifyul.cloneNode(false);
	if(collapsed){
		ul.style.setProperty('display', 'none');
	} else {
		ul.style.setProperty('display', 'block');
	}

	$.each(val, function (k, v) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(k + " : " + v));
		ul.appendChild(li);
	});

	return ul;
}

function CreateExpandoDiv() {
	var indiv = document.createElement("div");
	if (collapsed) {
		indiv.setAttribute('class', 'viewifyjsonnode');
	} else {
		indiv.setAttribute('class', 'viewifyjsonnode expandablejsonnode');
	}
	indiv.setAttribute('onclick', 'ExpandoClick(this);');
	return indiv;
}

function ExpandoClick(node) {
	var ul = node.nextSibling;
	if (ul.style.getPropertyValue('display') == 'block') {
		ul.style.setProperty('display', 'none');
		node.setAttribute('class', 'viewifyjsonnode');
	} else {
		ul.style.setProperty('display', 'block');
		node.setAttribute('class', 'viewifyjsonnode expandablejsonnode');
	}
}
	