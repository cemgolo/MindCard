# Mindcard
Mindcard is a flashcard app that helps users study information through the use of card decks. It is built using React Native and includes features like a spaced-repetition algorithm to optimally study cards for long term memory.

## Installation
To install the project, clone the repository and run `npm install`. From there, you can run the app at any time using `npm run start`. Follow the instructions printed in the console to view the app using the methods Expo provides.

## Technical breakdown
We made use of some additional dependencies to implement all of the features in the app, such as:

|NPM package|Usage in the app|
|-----------|-----------|
|`@react-navigation/native` `@react-navigation/stack`|To navigate across different screens|
|`@reduxjs/tookit`|To save data on the device in the form of JSON objects|
|`redux-persist`|To persist data across app sessions|
|`expo-image-picker`|To make the image picker for creating/editing cards|
|`react-native-chart-kit`|To show pie charts for card states and the bar chart for the end of a study session|
|`react-native-modal`|To implement modals (pop-ups) with fluid animations|
|`react-native-uuid`|To uniquely identify decks and cards|
|`ts-fsrs`|To determine when a card should be shown again after rating it. This is the spaced-repetition algorithm that powers the app and allows for long term studying.|

### Spaced-repetition
The algorithm used in the app is the Free Spaced Repetition Scheduler (FSRS) algorithm, implemented using the `ts-fsrs` package (where the `ts` part stands for 'TypeScript'). This package provides a few key functionalities, like determining when a card should be scheduled based on a user rating and creating the necessary object structures to support it.

The package does not include any UI-related implementations (it is not made to be used with React Native specifically after all), nor does it facilitate the processing of other information on the object which is being rated (that is, it does not include or process the text and image content of each card as they are not relevant and unknown to the algorithm).

We implemented the JSON structure of each card by creating a TypeScript type `FlashCard` that extends the already-existing `Card` type of the package in [storage/types.d.ts](storage/types.d.ts). As you can see, a few new properties were added like the UUID for identification and the text/image content. In the same file, we also define how a `FlashCardDeck` is structured using this new type. If you would like a reference of how a filled-out `FlashCard` object usually looks like in full, with all the properties from the FSRS algorithm and the ones we supply ourselves, consult the example below:

```json
{
    "content": {
        "back": {
            "imageUrl": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMindCard-5dcd16a3-6144-4d86-ac1d-d3126d7e8f32/ImagePicker/18028d7e-8de5-4b13-b304-c194414ab1cd.jpeg",
            "text": "An orange fruit."
        },
        "front": {
            "imageUrl": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMindCard-5dcd16a3-6144-4d86-ac1d-d3126d7e8f32/ImagePicker/b9dbca44-0830-4778-8214-cf674d99861c.jpeg",
            "text": "Orange"
        }
    },
    "difficulty": 6.48830527,
    "due": "2024 - 12 - 15 T12: 22: 27.809 Z",
    "elapsed_days": 0,
    "lapses": 0,
    "last_review": "2024 - 12 - 15 T12: 17: 27.809 Z",
    "reps": 1,
    "scheduled_days": 0,
    "stability": 1.18385,
    "state": 1, // State.Learning
    "uuid": "ce2d5dea-bf3b-449a-8263-aabc9b04079e"
}
```

To create new cards and decks, we wrote helper functions in [storage/helper.ts](storage/helper.ts). This meant we did not have to manually assign certain properties like the UUID, as they are added automatically when using these functions. The file also contains ways to determine if cards are due or to generate which cards should be studied.

In the [screens/ReviewSessionScreen.js](screens/ReviewSessionScreen.js) file, you can see the `FSRS` class being used (through `fsrs.repeat`) to update the studied card and its values like difficulty and due date. This new version of the card is then saved into the Redux database, replacing the older one.
