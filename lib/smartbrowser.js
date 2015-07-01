// Class Declaration

function SmartBrowser(){
	this.input = {};
};

SmartBrowser.prototype.parseURLInput = function(text,tabSetting){
    this.input = {};
    text = this.extractJSON(text);
    var t = text.split(" ");

	t.forEach(setParams.bind(this));
    
    function setParams(elem,ind,arr){
        var c = elem.substring(0,2);

        if (ind === 0){
            this.input.command = elem;
        }else if (c === "c:"){
            this.input.client_id = elem.substring(2);
        }else if (c === "e:"){
            this.input.email = encodeURIComponent(elem.substring(2));
        }else if (c === "f:"){
            this.input.fields = elem.substring(2);
        }else if (c === "l:"){
            this.input.limit = elem.substring(2);
        }else if (c.indexOf("+") > -1){
        	this.input.sort = elem.substring(1);
        }else if (c.indexOf("-") > -1){
            this.input.sort = elem;
		}else if (c.indexOf("#") > -1){
			this.input[elem.substring(1)] = 1;
        }else if (!isNaN(elem)){
            this.input.number = elem;
        }else if (ind === 1){
        	this.input.category = elem;
        }else{
        	this.input.option = encodeURIComponent(elem);
        }
    }
    this.routeNavigation(this.input);
};

SmartBrowser.prototype.extractJSON = function(text){
	var f = text.indexOf("{");
	var l = text.lastIndexOf("}")+1;
	var jsonStr = text.slice(f,l);
	if (this.isJSON(jsonStr)){
		this.input.json = this.encodeJSONValues(JSON.parse(jsonStr));
	}
	return text.replace(jsonStr,"");
};

SmartBrowser.prototype.encodeJSONValues = function(json){
	for (j in json){
		if (json[j] instanceof Object){
			this.encodeJSONValues(json[j]);
		}else if (typeof json[j] === "string"){
			json[j] = encodeURIComponent(json[j]);	
		}
	}
	return json;
};

SmartBrowser.prototype.routeNavigation = function(input){

	switch(input.command)
		{
		case "zd":
			this.jumpToZendeskCase(input);
			break;
		case "jira":
			this.jumpToJiraCase(input);
			break;
		case "my":
			this.jumpToMYPage(input);
			break;
		case "su":
			this.jumpToSUPage(input);
			break;
		}
};

SmartBrowser.prototype.navigate = function(url){
	chrome.tabs.update({
		"url": url
	});
};

SmartBrowser.prototype.jumpToZendeskCase = function(input){
	var baseURL = "https://sailthru.zendesk.com";
	var caseID = input.number ? "/tickets/" + input.number : "";

	this.navigate(baseURL + caseID);
};

SmartBrowser.prototype.jumpToJiraCase = function(input){
	var baseURL = "https://sailthru.atlassian.net";
	var caseID = input.category ? "/browse/" + input.category : "";

	this.navigate(baseURL + caseID);
};

SmartBrowser.prototype.jumpToMYPage = function(input){
	var baseURL = "https://my.sailthru.com";
	var view = "";
	var params = {};
	var hash = "";

	switch(input.category)
		{
		case "rtd":
		case "realtime":
			view = "/reports/dashboard";
			break;
		case "user":
		case "profile":
			view = "/reports/user_lookup";
			input.id = input.email ? input.email : input.option;
			["id"].forEach(setQuery);
			break;
		case "listgrowth":
			view = "/reports/listgrowth";
			break;
		case "source":
		case "sourcesignup":
			view = "/reports/source_signup";
			break;
		case "job":
		case "jobs":
			view = "/reports/jobs";
			break;
		case "postback":
		case "postbacks":
			view = "/reports/postbacks";
			break;
		case "campaignrpt":
		case "campaignsummary":
		case "campaignreport":
		case "campaignsent":
		case "report":
			view = input.number ? "/reports/campaign" : "/reports/campaign_summary";
			input.blast_id = input.number;
			["blast_id"].forEach(setQuery);
			break;
		case "translog":
		case "transactional":
		case "transactionallog":
			view = "/reports/transactional_log";
			break;
		case "triggerlog":
		case "triggers":
		case "trigger":
			view = "/reports/triggerlog";
			break;
		case "purchases":
		case "purchase":
		case "purchaselog":
			view = "/reports/purchaselog";
			break;
		case "list":
		case "lists":
			view = input.option ? "/list" : "/lists";
			input.list = input.option;
			["list"].forEach(setQuery);
			break;
		case "qb":
		case "query":
		case "querybuilder":
			view = "/query_builder";
			break;
		case "spidered":
		case "content":
		case "spideredcontent":
			view = input.option ? "/lookup/content" : "/content";
			input.id = input.option;
			["id"].forEach(setQuery);
			break;
		case "tag":
		case "tags":
			view = "/lookup/tag";
			input.id = input.option;
			["id"].forEach(setQuery);
			break;
		case "feeds":
		case "feed":
			view = "/feeds";
			break;
		case "page":
		case "pages":
		case "hosted":
		case "hostedpages":
			view = input.option ? "/page" : "/pages";
			input.page_id = input.option;
			["page_id"].forEach(setQuery);
			break;
		case "include":
		case "includes":
			view = "/includes";
			break;
		case "adflight":
		case "ads":
			view = "/ads/plans";
			break;
		case "recurring":
		case "repeat":
		case "recurringcampaigns":
		case "repeatcampaigns":
		case "blastrepeat":
			view = "/campaigns_recurring";
			break;
		case "campaign":
		case "campaigns":
		case "blast":
		case "blasts":
			view = input.option ? "/campaigns" : ( input.number ? "/campaign" : "/campaigns");
			hash = input.option ? "#" + input.option : (input.number ? "#" + input.number : "");
			break;
		case "template":
		case "templates":
			view = input.number ? "/template/#" + input.number : "/templates";
			break;
		case "users":
		case "permissions":
			view = "/users";
			break;
	}

	input.client = input.client_id;

	["client"].forEach(setQuery);

	function setQuery(elem,ind,arr){
		if (input[elem]){
			params[elem] = input[elem];
		}
	}

	view = Object.keys(params).length > 0 ? view + this.setQueryParams(params) : view;
	view = hash !== "" ? view + hash : view;

	this.navigate(baseURL + view);
};

SmartBrowser.prototype.jumpToSUPage = function(input){
	var baseURL = "https://su.sailthru.com";
	var view = "";
	var params = {};

	switch(input.category)
		{
		case "message":
			view = "/lookup/message";
			input.message_id = input.option ? input.option : input.number;
			["message_id"].forEach(setQuery);
			break;
		case "profile":
			view = "/lookup/profile";
			input.lookup = input.email ? input.email : input.option;
			["lookup"].forEach(setQuery);
			break;
		case "link":
			view = "/lookup/link";
			input.link = input.option;
			["link"].forEach(setQuery);
			break;
		case "clearcache":
		case "cache":
			view = "/lookup/clear_cache";
			input.clients = input.client_id ? input.client_id : (input.number ? input.number : input.option);
			["clients"].forEach(setQuery);
			break;
		case "client":
		case "clients":
			view = "/client";
			input.id = input.client_id ? input.client_id : input.number;
			["id"].forEach(setQuery);
			input.q = input.option;
			["q"].forEach(setQuery);
			break;
		case "account":
		case "accounts":
			view = "/account";
			input.id = input.client_id ? input.client_id : input.number;
			["id"].forEach(setQuery);
			input.q = input.option;
			["q"].forEach(setQuery);
			break;
		case "access":
		case "bulkaccess":
			view = "/bulk_access";
			break;
		case "smtp":
		case "smtpgroup":
			view = "/delivery/smtp";
			break;
		case "job":
		case "jobs":
		case "jobmgmt":
			view = "/support/job_management";
			input.client_id = input.client_id ? input.client_id : input.number;
			["client_id"].forEach(setQuery);
			break;
		case "requeue":
		case "requeuejob":
		case "requeuejobs":
			view = "/support/requeue_jobs";
			input.job_ids = input.option;
			["job_ids"].forEach(setQuery);
			break;
		case "dkim":
		case "multidkim":
			view = "/delivery/addclientdkim";
			break;
		case "queue":
		case "queues":
		case "q":
		case "qs":
			view = "/tech/queue";
			break;
		case "proc":
		case "procs":
		case "procmgmt":
			view = "/tech/procmgmt";
			break;
		case "list":
		case "liststats":
			view = "/support/recalc_list_stats";
			input.client_id = input.client_id ? input.client_id : (input.number ? input.number : input.option);
			["client_id"].forEach(setQuery);
			break;
		case "fast":
		case "faststats":
			view = "/support/fast_stats";
			input.blast_ids = input.number ? input.number : input.option;
			["blast_ids"].forEach(setQuery);
			break;
		case "blast":
		case "blasts":
		case "campaign":
		case "campaigns":
			view = "/blasts";
			input.view = input.option;
			["view"].forEach(setQuery);
			input.client_id = input.client_id ? input.client_id : input.number;
			["client_id"].forEach(setQuery);
			break;
		case "trans":
		case "transstats":
		case "transactionalstats":
			view = "/support/recalc_transactional_stats";
			input.client_ids = input.client_id ? input.client_id : (input.number ? input.number : input.option);
			["client_ids"].forEach(setQuery);
			break;
		case "sailcast":
			view = "/sailcast";
			break;
		case "mon":
		case "monitor":
			view = "/monitor";
			break;
	}

	function setQuery(elem,ind,arr){
		if (input[elem]){
			params[elem] = input[elem];
		}
	}

	view = Object.keys(params).length > 0 ? view + this.setQueryParams(params) : view;

	this.navigate(baseURL + view);
};

// Helper Functions

SmartBrowser.prototype.setQueryParams = function(params){
    var q = "?";
    var i = 0;
    for (p in params){
        i > 0 ? q += "&" : "";
        q += p + "=" + params[p];
        i++;
    }
    return q;
};

SmartBrowser.prototype.isJSON = function(str){
    try {
    	JSON.parse(str);
    } catch (err) {
    	return false;
    }
    return true;
};