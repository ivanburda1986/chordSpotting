//Data controller
const DataCtrl = (function () {
  const appData = {
    correctTotal: null,
    remainingTotal: null,
    wrongTotal: null,
    loadedChords: null,
    currentChord: null,
    selectedAnswer: null,
    appState: null,
    minChordsForTraining: 3,
    maxChordsForTraining: 10,
    currentlyNumberChordsForTraining: 0,
    hardcore: "off",
    defaultTotal: 10,
  };

  const allChords = {
    A: "A.mp3",
    C: "C.mp3",
    D: "D.mp3",
    E: "E.mp3",
    G: "G.mp3",
    Amin: "Amin.mp3",
    Emin: "Emin.mp3",
    Dmin: "Dmin.mp3",
    A7: "A7.mp3",
    D7: "D7.mp3",
    E7: "E7.mp3",
    G7: "G7.mp3",
    C7: "C7.mp3",
    B7: "B7.mp3",
    Asus4: "Asus4.mp3",
    Asus2: "Asus2.mp3",
    Dsus4: "Dsus4.mp3",
    Dsus2: "Dsus2.mp3",
    Esus4: "Esus4.mp3",
    F: "F.mp3",
    FMaj7: "FMaj7.mp3",
    "D/F#": "D-F.mp3",
    "G/B": "G-B.mp3",
    "C/G": "C-G.mp3",
    "Big G": "BigG.mp3",
    "Rock G": "RockG.mp3",
    "Folk G": "FolkG.mp3",
  };

  const soundSelectors = {
    currentChord: document.getElementById("currentChord"),
    chordOnDemand: document.getElementById("chordOnDemand"),
    evaluation: document.getElementById("evaluation"),
    trainingEnd: document.getElementById("trainingEnd"),
    restart: document.getElementById("restart"),
    hardcoreOff: document.getElementById("hardcore-off"),
    hardcoreOn: document.getElementById("hardcore-on"),
  };

  return {
    getAppData: function () {
      return appData;
    },
    setDefaultAppData: function () {
      appData.correctTotal = 0;
      appData.remainingTotal = appData.defaultTotal;
      appData.wrongTotal = 0;
      appData.loadedChords = DataCtrl.getChordSettingsFromLocalStorage();
      appData.currentChord =
        appData.loadedChords[
          Math.floor(Math.random() * appData.loadedChords.length)
        ];
      appData.currentlyNumberChordsForTraining = appData.loadedChords.length;
      appData.appState = "readyToStart";
      appData.hardcore = DataCtrl.getDifficultySettingsFromLocalStorage();
    },
    getAllChordNames: function () {
      return Array.from(Object.keys(allChords));
    },
    getChordSoundFileName: function (chordName) {
      return allChords[chordName];
    },
    getSoundSelectors: function () {
      return soundSelectors;
    },
    getNextChord: function () {
      let nextChord = appData.loadedChords[
        Math.floor(Math.random() * appData.loadedChords.length)
      ];
      appData.currentChord === nextChord ? DataCtrl.getNextChord() : appData.currentChord = nextChord;

      console.log(nextChord);
    },
    saveSettingsToLocalStorage: function () {
      localStorage.setItem(
        "selectedChordsSpotting",
        JSON.stringify(appData.loadedChords)
      );
      localStorage.setItem("hardcore", appData.hardcore);
    },
    getChordSettingsFromLocalStorage: function () {
      let selectedChordsSpotting = JSON.parse(localStorage.getItem("selectedChordsSpotting"));
      if (selectedChordsSpotting === null) {
        return ["A", "C", "D", "E", "G"];
      } else {
        return selectedChordsSpotting;
      }
    },
    getDifficultySettingsFromLocalStorage: function () {
      let hardcore = localStorage.getItem("hardcore");
      if (hardcore === "on") {
        return "on";
      } else if (hardcore === null || undefined || "off") {
        return "off";
      }
    },
  };
})();