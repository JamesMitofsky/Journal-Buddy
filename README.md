# 📝 Journal Buddy

Streamline the process of digitizing journal entries into Markdown. Then, once in this format, provide a way to analyze these entries together. Your data stays on your computer, so your reflections remain completely yours.

## 📚 Purpose

As someone who loves the kinesthetics of writing by hand, I've spilled a lot of ink writing in my journal. On the other hand, as someone who loves data, I know my rambly thoughts need to become searchable. The first step down this road is transcription.

I've been using [Obsidian](https://obsidian.md/) for a while, but reliably typing out the metadata of each entry is a tedious ritual, and that frustration compromises data fidelity and discourages regularly contributing to the transcription.

That's where Journal Buddy comes in! By automating the formatting process, it reduces the fuss to focus on what truly matters: capturing thoughts and reflections.

## 🛠️ How It Works

1. **User input:** Enter journal entry details into the app.
2. **Metadata formatting:** The app automatically formats the metadata according to a predefined and versioned structure.
3. **Download the markdown file:** With the formatted metadata ready, the data is available to be downloaded as a markdown file (at which point the data will be validated to check for missing fields).
4. **Visualize the results:** After doing this for several files, navigate to the Map page and view the entries on a map and search for other possible conclusions.

## 🚀 Getting Started

1. Install Node & its package manager
2. Clone this repository
3. Install dependencies: `npm i`
4. Run the app: `npm run dev`
5. Open the browser and navigate to http://localhost:3000

## 🎯 Future Enhancements

Here are a few ideas for future updates:

- [ ] **Auto-suggest existing tags:** Past entries on the computer could be read to create a list of existing tags that can be recommended.
- [ ] **Auto-suggest existing locations:** Rather than using local storage for past locations, past entries on the computer could be read to create a list of existing tags that can be recommended.
- [ ] **Address verification:** Provide a visual verification for the given Plus Code address, making sure it's not in some wildly wrong place.
- [x] **Automate file creation:** Rather than copying the metadata to a file, automate the file creation in a given directory on the user's computer.
- [ ] **Have popups link to the full entry:** Include a link in the little pop up from the map which leads to some sort of slide up dialog that shows the entry and its basic info (think ShadCN UI).
- [ ] **Printable map:** Have pretty version of this map.
- [ ] **Clustering locations:** Include clusters, according to the leaflet specifications.
- [ ] **Animate the map to show entries over time:**

## 🤝 Contributing

If you have suggestions or improvements, feel free to contribute! You can fork the repository, make your changes, and submit a pull request.
