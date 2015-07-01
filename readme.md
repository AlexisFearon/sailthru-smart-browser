# Sailthru Smart Browser Chrome Extension Lite

A quick URL-hopping extension for the Sailthru team. This extension adds navigation shortcuts (via a shorthand notation) for:

  - MY / SU
  - Zendesk
  - JIRA

## Version

1.1.3

## Zendesk
### Syntax

    st zd [integer case_id]

Will jump to the Zendesk Case URL for the Case ID specified, e.g.
    
    https://sailthru.zendesk.com/tickets/108591
    
    
    
## JIRA
### Syntax

    st jira [string ticket_id]

Will jump to the JIRA Ticket URL for the Ticket ID specified, e.g.
    
    https://sailthru.atlassian.com/browse/SE-155


## MY
### Syntax
    st my [string page] 
    Optional: [string option] [integer id] c:[integer client_id]

A page is always required, unless you just want to jump to http://my.sailthru.com

c:[client_id] can be passed to hop to the page for a particular client.

Other optional fields can be entered depending on the page. A full accounting of these is available below:

### Pages

* **[rtd, dashboard]** - Realtime Dashboard
* **[template, templates]** - Templates Page
    * [id] Template ID
* **[blast, blasts, campaign, campaigns]** - Campaigns Page
    * [option] Drafts, Scheduled, Sending, Sent
    * [id] Blast ID
* **[repeat, blastrepeat, repeatcampaigns, recurring, recurringcampaigns]** - Recurring Campaigns
* **[user, profile]** - Profile Lookup Page
    * [option] Profile ID, Email 
* **[job, jobs]** - Jobs Page
* **[list, lists]** - Lists Page
    * [option] List Name
* **[trigger, triggers, triggerlog]** - Trigger Log
* **[purchase, purchases, purchaselog]** - Purchase Log
* **[translog, transactional, transactionallog]** - Transactional Log
* **[postback, postbacks]** - Postback Log
* **[qb, query, querybuilder]** - Query Builder
* **[spidered, content, spideredcontent]** - Spidered Content Collection
    * [option] URL
* **[tag, tags]** - Tag Content Lookup
    * [option] Content Tag
* **[campaignrpt, campaignsummary, campaignreport, campaignsent, report]** - Campaign Summary Report
    * [id] Blast ID
* **[listgrowth]** - List Growth Report
* **[source, sourcesignup]** - Source Signup Report
* **[page, pages, hosted, hostedpages]** - Data Feeds Page
    * [option] Page ID
* **[include, includes]** - Includes Page
* **[adflight, ads]** - Adflight Ad Manager
* **[users, permissions]** - Account User Permissions Page

## SU

### Syntax

    st su [string page] 
    Optional: [string option] [integer id]

A page is always required, unless you just want to jump to http://su.sailthru.com

Other optional fields can be entered depending on the page. A full accounting of these is available below:

### Pages

* **[blast,blasts,campaign,campaigns]** - Campaigns Page
    * [option] Scheduled, Generating, Generated, Sending, Notsendingsent, Sent
    * [id] Client ID
* **[message]** - Message ID Lookup
    * [option] Message ID
* **[profile]** - Cross-Client Profile Lookup
    * [option] Email
* **[link]** - Product Feature Hitlist
    * [option] Link ID or URL
* **[cache,clearcache]** - Clear Client Cache
    * [option / id] Client ID or IDs (comma-separated)
* **[client,clients]** - Client Lookup Page
    * [id] Client ID
    * [option] Account Name
* **[account,accounts]** - Account Lookup Page
    * [id] Account ID
    * [option] Account Name
* **[access,bulkaccess]** - Bulk Access Tool
* **[smtp,smtpgroup]** - SMTP Group Lookup
* **[job,jobs,jobmgmt]** - Job Management Page (by Client)
    * [id] Client ID
* **[requeue,requeuejob,requeuejobs]** - Requeue Job Tool
    * [option] Job ID or IDs (comma-separated)
* **[dkim,multidkim]** - Multi DKIM Tool
* **[queue,queues,q,qs]** - Queues Page
* **[proc,procs,procmgmt]** - Proc Management Page
* **[list,liststats]** - Requeue List Stats Tool
    * [option / id] Client ID or IDs (comma-separated)
* **[fast,faststats]** - Fast Stats Tool
    * [option / id] Blast ID or IDs (comma-separated)
* **[trans,transstats,transactionalstats]** - Recalculate Transactional Stats Tool
    * [option / id] Client ID or IDs (comma-separated)
* **[sailcast]** - Sailcast Page
* **[mon,monitor]** - Monitor / Alerts