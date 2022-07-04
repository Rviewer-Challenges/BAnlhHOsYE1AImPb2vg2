# RSS reader

Are you able to build the best RSS reader?
Create a news aggregator focused on a single industry.

Let's start at the beginning, what is RSS?
RSS stands for Really Simple Syndication, and it is used to distribute information associated with web content in XML
format.

Let's think about the world of software development; so much news appear every day that we don't know how to consume
such amount of information. Sometimes even where to start looking.

The goal of this Challenge is to create the best news aggregator app in RSS format.

![Brais Moure Challenge card](mouredev_rss_reader.png)
> This is a challenge created by [MoureDev](https://www.twitch.tv/mouredev). He will review and give feedback to some
> proposed solutions from the community in one of his Twitch livestreams 😻

**Surprise us! 😉**

## How it works?

* First, decide the news industry that you like the most. For example: technology, software development, music, food,
  sport...
* Decide the news sources that are going to be displayed (make sure they distribute their own RSS).
* The user will not be able to add news sources.
* The UI is up to you. You can rely on Apps like [Feedly](https://feedly.com/), [Inoreader](https://www.inoreader.com/),
  [Pocket](https://getpocket.com/es/)...
* The app must support light and dark mode.

### Main screen
* It will show the news list sorted by the most recent, mixing all the RSS sources.
* For each new, it will show a card with photo, headline, source and the publication date.
* The news list can be reloaded to show new news.
* The news list will be updated automatically if the App/Web returns from running in the background. If you are working
  on a web application you can just update the feed every 60 seconds if there is any change on your sources.
* The user can add or remove news to a bookmarks list.

### Detail screen

* Once the user select a new from the main list, it will navigate to the new page of the news source website, with the
  possibility of returning to the main list.
* The user can add or remove news to a bookmarks list.

### Bookmarks screen

* It will behave like the main screen (with the option to navigate to the detail screen), but it will only show the news
  added to bookmark in chronological order.
* The user can remove news from the bookmarks list.

### Settings menu
* The user can set light or dark mode.
* The user can enable/disable each source from a list of news sources available.
* We must persist the options even if we leave the APP.

### Extra points (optional)

Here you rule! 😎

* Are you able to show the detail of the news without the need to link to the news page of the news source website?
  prove it!
* You can implement exclusive functionalities that make special sense in news industry you have selected.
* Some more generic extra functionalities could be remembering which news have been read, logging in to persist the
  configuration remotely, sharing the news on networks... Surprise us!

## Technical requirements

* Create a **clean**, **maintainable** and **well-designed** code. We expect to see a good and clear architecture that
  allows to add or modify the solution without so much troubles.
* **Test** your code until you are comfortable with it. We don't expect a 100% of Code Coverage but some tests that
  helps to have a more stable and confident base code.

To understand how you take decisions during the implementation, **please write a COMMENTS.md** file explaining some of
the most important parts of the application. You would also be able to defend your code through
[Rviewer](https://rviewer.io), once you submit your solution.

---

## How to submit your solution

* Push your code to the `devel` branch - we encourage you to commit regularly to show your thinking process was.
* **Create a new Pull Request** to `main` branch & **merge it**.

Once merged you **won't be able to change or add** anything to your solution, so double-check that everything is as you
expected!

Remember that **there is no countdown**, so take your time and implement a solution that you are proud!

--- 

<p align="center">
  If you have any feedback or problem, <a href="mailto:help@rviewer.io">let us know!</a> 🤘
  <br><br>
  Made with ❤️ by <a href="https://rviewer.io">Rviewer</a>
</p>
