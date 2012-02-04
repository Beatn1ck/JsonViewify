
var jsonifyul = document.createElement("ul");
jsonifyul.setAttribute('class', 'jsonnodeview');
var collapsed;

function JsonViewifyHtml(iterator, params) {
	if (iterator == null) {
		alert("iterator is null");
		return "";
	}
		
	collapsed = !params ? true : params.collapsed != 'false';
	var ul = jsonifyul.cloneNode(false);
	$.each(iterator, function (i, val) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(GenerateName(val,i)));
		li.appendChild(CreateExpandoDiv());
		li.appendChild(JsonViewifyInnerList(val));
		ul.appendChild(li);
	});

	return ul;
}

function GenerateName(param, defaultname) {
	if (!param) return defaultname;
	if (param.id) return param.id;
	if (param.name) return param.name;
	return defaultname;
}

function JsonViewifyInnerList(val) {

	//		var ul = document.createElement("ul");
	var ul = jsonifyul.cloneNode(false);
	if (collapsed) {
		ul.style.setProperty('display', 'none');
	} else {
		ul.style.setProperty('display', 'block');
	}

	$.each(val, function (i, v) {
		if (!v) return true;
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(GenerateName(v, i)));
		if ($.isArray(v)) {
			if (v.length == 2) {
				li.appendChild(document.createTextNode(v[0] + " : " + v[1]));
			} else {
				li.appendChild(CreateExpandoDiv());
				li.appendChild(JsonViewifyInnerList(v));
			}
		}
		else if (!$.isEmptyObject(v)) {
			if (typeof (v) == "string") {
				li.appendChild(document.createTextNode(" : " + v));
			} else {
				li.appendChild(CreateExpandoDiv());
				li.appendChild(WriteObject(v));
			}
		}
		ul.appendChild(li);
	});

	return ul;
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
	
