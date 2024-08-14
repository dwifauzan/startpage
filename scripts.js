/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"z3rEZDl3QhWKOlaq","label":"reddit","bookmarks":[{"id":"PN3jLHy8vxyum6CV","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"QGO4F0YuaG8O2ueI","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"Xiw49OPssR3nwRb4","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"Kn6WL39xYRRdfmtA","label":"design tools","bookmarks":[{"id":"UtI2SqycE9THKflH","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"HjrIRWUfJLbbSduU","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"fa9EFihEvdkR78RN","label":"haikei","url":"https://app.haikei.app/"},{"id":"rSMNL4AjT3epXTwD","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"wqZRKqkiaDijRt3f","label":"worth reading","bookmarks":[{"id":"tpj31wG27U28PZBe","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"EaTPOKBw42IQPqsO","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"guAjIr3oHpkEWvHh","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"CIr77BsGniyzCWZ1","label":"sources","bookmarks":[{"id":"vo7F0jUQwkxRxBGK","label":"icons","url":"https://feathericons.com/"},{"id":"fSVU4sKrmtUNqxU0","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"yqDvidGnbOR1WcMy","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"2coDGXNKYJzOgEGh","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
