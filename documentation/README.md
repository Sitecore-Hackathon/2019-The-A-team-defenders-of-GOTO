# Documentation

This readme file details how to install and use the **GOTO Watson Powershell Extension Module**.

## Summary

**Category:** Best use of SPE to help Content authors and Marketers

The intention behind the module is to help content editors create better content and have a better understanding on how it might be perceived by the customer. This is done by enabling content editors to analyze texts and tag images using IBM's Watson API.
Text analysis allows for better targeting of a given piece of content. While image tagging helps built a *media library* which is easier to navigate.

## Pre-requisites

The module requires [Sitecore Powershell Extensions](https://marketplace.sitecore.net/en/Modules/Sitecore_PowerShell_console.aspx) 

## Installation

Provide detailed instructions on how to install the module, and include screenshots where necessary.

1. Use the Sitecore Installation wizard to install the [package](#link-to-package)
2. Once the package has been installed all integration points in PSE needs to be rebuilt
![Rebuild integration points](images/rebuildintegrationpoints.gif?raw=true "Rebuild integration points")
3. The module is good to go!

> When installing the package the wizard will prompt for an existing item */sitecore/system/Settings/Buckets/Search Types/Text*. We have simply added **Keywords** to the list of fields searched when using the *media selector* .

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

A selectable list containing the sentences allows for the user to switch between seeing the output for the entire text or each sentence.

### Visual Recognition

When an image is selected in the *Content Editor* a **Visual Recognition** button is shown in the context ribbon.

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

Please provide a video highlighing your Hackathon module submission and provide a link to the video. Either a [direct link](https://www.youtube.com/watch?v=EpNhxW4pNKk) to the video, upload it to this documentation folder or maybe upload it to Youtube...

[![Sitecore Hackathon Video Embedding Alt Text](https://img.youtube.com/vi/EpNhxW4pNKk/0.jpg)](https://www.youtube.com/watch?v=EpNhxW4pNKk)
