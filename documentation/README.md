# Documentation

This readme file details how to install and use the **GOTO Watson Powershell Extension Module**.

## Summary

**Category:** Best use of SPE to help Content authors and Marketers

The intention behind the module is to help content editors create better content and have a better understanding on how it is perceived by the reader. This is done by enabling content editors to analyze texts and tag images using IBM's Watson API.
Text analysis allows for better targeting of a given piece of content. While image tagging helps maintain an easier navigatable *media library*.

## Pre-requisites

The module requires [Sitecore Powershell Extensions](https://marketplace.sitecore.net/en/Modules/Sitecore_PowerShell_console.aspx) 
It is only tested with version 5.0

## Installation

1. Use the Sitecore Installation wizard to install the [package](https://github.com/Sitecore-Hackathon/2019-The-A-team-defenders-of-GOTO/blob/master/sc.package/GOTO%20Watson-1.0.zip)
2. Once the package has been installed all integration points in SPE needs to be rebuilt
![Rebuild integration points](images/rebuildintegrationpoints.gif?raw=true "Rebuild integration points")
3. The module is good to go!

> When installing the package the wizard will prompt for an existing item */sitecore/system/Settings/Buckets/Search Types/Text*. We have simply added **Keywords** to the list of fields searched when using the *media selector*.

### Serialization

Everything is available in the sitecore package. All PowerShell code is contained in sitecore items. However the sitecore items is also available as [serialized files](https://github.com/Sitecore-Hackathon/2019-The-A-team-defenders-of-GOTO/tree/master/src/Feature/GOTO%20Watson/serialized%20items).
They have been serialized using Sitecore PSE and can be deserialized using Sitecore SPE as well.
There is also an xml and javascript file included for the Graph Viewer. These are both contained in the package and under [sitecore modules](https://github.com/Sitecore-Hackathon/2019-The-A-team-defenders-of-GOTO/tree/master/src/Feature/GOTO%20Watson/sitecore%20modules/Shell/PowerShell)


#### Serialization Code

```powershell
Serialize-Item -path "master:\sitecore\templates\GOTO Watson" -target "C:\git\2019-The-A-team-defenders-of-GOTO\src\Feature\GOTO Watson\serialized items\templates" -recurse
Serialize-Item -path "master:\sitecore\media library\GOTO Watson" -target "C:\git\2019-The-A-team-defenders-of-GOTO\src\Feature\GOTO Watson\serialized items\media library" -recurse
Serialize-Item -path "master:\sitecore\system\Modules\PowerShell\Settings\GOTO Watson" -target "C:\git\2019-The-A-team-defenders-of-GOTO\src\Feature\GOTO Watson\serialized items\system\Modules\PowerShell\Settings" -recurse
Serialize-Item -path "master:\sitecore\system\Modules\PowerShell\Script Library\GOTO Watson" -target "C:\git\2019-The-A-team-defenders-of-GOTO\src\Feature\GOTO Watson\serialized items\system\Modules\PowerShell\Script Library" -recurse
Serialize-Item -path "master:\sitecore\system\Settings\Buckets\Search Types\Text" -target "C:\git\2019-The-A-team-defenders-of-GOTO\src\Feature\GOTO Watson\serialized items\system\Settings\Buckets\Search Types" -recurse
Serialize-Item -path "master:\sitecore\content\Home\GOTO Watson examples" -target "C:\git\2019-The-A-team-defenders-of-GOTO\src\Feature\GOTO Watson\serialized items\content\Home" -recurse
```

#### Deserialization Code

Check the paths to match your own repository
```powershell
Deserialize-Item -path "c:\git\2019-The-A-team-defenders-of-GOTO\src\Feature\GOTO Watson\serialized items" -root "c:\git\2019-The-A-team-defenders-of-GOTO\src\Feature\GOTO Watson\serialized items" -recurse
```

## Configuration

In order for the module to work it needs two valid **API keys** for the Watson services. For information on how to create the keys see section below. When the keys are generated the settings in sitecore should be updated. The relevant item can be found here: */sitecore/system/Modules/PowerShell/Settings/GOTO Watson/Settings*.
It's a single item which holds all the relevant settings.

* **Tone Analyzer Service Endpoint** Which server location should be used with **Tone Analyzer Api Key**.
* **Tone Analyzer Api Key** Api Key for  [Watson Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/) service. It is important to note that the Api Key might only be valid for certain server locations.
* **Visual Recognition Service Endpoint** Which server location should be used with **Visual Recognition Api Key**.
* **Visual Recognition Api Key** Api Key for [Watson Visual Recognition](https://www.ibm.com/watson/services/visual-recognition/) service. It is important to note that the Api Key might only be valid for certain server locations.

Don't worry if you forget to add the settings before you use the module. It will make sure to prompt you for details if it's missing.

### Getting Watson API keys

> The sitecore package includes Api keys for both services, so it should be possible to try out the module without having to create new keys. Otherwise follow the links below.

To create your own api keys to use IBM Watsons **Tone Analyzer** goto [Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/). It's free to use this service with a limit of 2,500 API calls a month

To create your own api keys to use IBM Watsons **Visual Recognition** goto [Visual Recognition](https://www.ibm.com/watson/services/visual-recognition/). It's free to use this service with a limit of 1,000 API calls a month.

The guide on the above pages is easy to follow, and it's pretty fast to get the needed API keys - and for the free plan there no requirement to enter credit card information.

## Usage

The module provides two integration points for content editors. Both are found through the *Content Editor*'s ribbon menu.

### Tone Analyzer

The Tone Analyzer is found through the ribbon in the Content Editor.

![Tone Analyzer Ribbon](images/ToneAnalyzerRibbon.png?raw=true "Tone Analyzer Ribbon")

When opened it lists all text fields for the current item which the *Content Editor* can select from. When a field is selected all html tags are stripped away and the text is sent to Watson Tone Analyzer.
Watson returns an analysis for the entire text as well as the individual sentences. The result is rendered in three different radar charts:

* Emotion Tone
* Language Tone
* Social Tone

A selectable list containing the individual sentences allows for the user to switch between seeing the output for the entire text or each sentence.

The demo item

![Tone Analyzer Demo Item](images/ta1.png?raw=true "Tone Analyzer Demo Item")

Select which field should be analyzed

![Tone Analyzer Field Selector](images/ta2.png?raw=true "Tone Analyzer Field Selector")

The result is displayed in a modal dialog. The *Entire document* is selected initially

![Tone Analyzer Dialog](images/ta3.png?raw=true "Tone Analyzer Dialog")

It is possible to see the result for the individual sentences

![Tone Analyzer Dialog 2](images/ta4.png?raw=true "Tone Analyzer Dialog 2")

### Visual Recognition

When an image is selected in the *Media Library* a **Visual Recognition** button is shown in the context ribbon.

![Visual Recognition Ribbon](images/VisualRecognitionRibbon.png?raw=true "Visual Recognition Ribbon")

When clicked it streams the image content to Watson Visual Recognition which in return sends a list of keywords along with a score for each.
The result is displayed in a list view where tag and score are shown. The results are sorted by score, showing the most relevant first. The user can then select the ones they deem relevant and save them on the image item by clicking **Save keywords**.

List view in action

![Visual Recognition List View](images/vr1.png?raw=true "Visual Recognition List View")

Result, the item has new keywords

![Visual Recognition Result](images/vr2.png?raw=true "Visual Recognition Result")

Now it is possible to search for and find a banana related image in both the *Media Libray*

![Media Library Search](images/vr3.png?raw=true "Media Library Search")

As well as in the media selector

![Media Selector](images/vr4.png?raw=true "Media Selector")

## Video

[![Video Demostration](images/yt.png?raw=true)](https://youtu.be/esH0gBIHsgo)
