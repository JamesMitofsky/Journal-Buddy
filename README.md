# 📝 Journal Buddy

Streamline the process of digitizing journal entries into Markdown. Then, once in this format, provide a way to analyze these entries together. Your data stays on your computer, so your reflections remain completely yours.

## 📚 Why I Built This App

As someone who loves the kinesthetics of writing by hand, I've spilled a lot of ink writing in my journal. On the other hand, as someone who loves data, I know the my rambly thoughts need to become searchable. The first step down this road is transcription.

I've been using [Obsidian](https://obsidian.md/) for a while, but reliably typing out the metadata of each entry is a tedious ritual, and that frustration compromises data fidelity and discourages regularly contributing to the transcription.

That's where Journal Buddy comes in! By automating the formatting process, it reduces the fuss to focus on what truly matters: capturing thoughts and reflections.

## 🛠️ How It Works

1. **User Input:** Enter journal entry details into the app.
2. **Metadata Generation:** The app automatically formats the metadata according to a predefined and versioned structure.
3. **Copy and Paste:** With the formatted metadata ready, the data is ready to go through a validation step and can be copied to the clipboard in the correct format.

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm i`
3. Run the app: `npm run dev`
4. Open the browser and navigate to http://localhost:3000

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
