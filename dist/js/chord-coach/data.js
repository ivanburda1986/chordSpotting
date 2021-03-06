//Data controller
const DataCtrl = (function () {
  const appData = {
    applicationState: null,
    playBtnState: null,
    loadedChords: null,
    interval: null,
    randomChordCurrentValue: null,
    setupMinutes: null,
    displayMinutes: null,
    displaySeconds: null,
    zerosPrecedingMinutes: '',
    zerosPrecedingSeconds: '',
    selectedGripMode: null,
    defaultValues: {
      chordGroup: ["A", "D", "E", "G", "C", "Amin", "Emin", "Dmin"],
      chordGroupName: "basicEightShapes",
      interval: 2,
      minutes: 1,
      selectedGripMode: "ON"
    },
  };

  const soundSelectors = {
    audio: document.getElementById("audioContainer"),
  };

  const allChords = {
    basicEightShapes: ["A", "D", "E", "G", "C", "Amin", "Emin", "Dmin"],
    dominantShapes: ["A7", "D7", "E7", "G7", "C7", "B7"],
    susShapes: ["Asus4", "Asus2", "Dsus4", "Dsus2", "Esus4"],
    fChords: ["F", "FMaj7"],
    basicSlashChords: ["D/F#", "G/B", "C/G"],
    gVariations: ["Big G", "Rock G", "Folk G", "G", "G7"],
  };

  const chordgrips = new Map();
  chordgrips.set("A", {
    1: [20, 35, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 55, "visible"],
    3: [30, 75, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "o", "", "", "", "o"],
  });

  chordgrips.set("D", {
    1: [25, 55, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 95, "visible"],
    3: [45, 75, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "x", "o", "", "", ""],
  });

  chordgrips.set("E", {
    1: [5, 55, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 15, "visible"],
    3: [25, 35, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["o", "", "", "", "o", "o"],
  });

  chordgrips.set("Amin", {
    1: [5, 75, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 35, "visible"],
    3: [25, 55, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "o", "", "", "", "o"],
  });

  chordgrips.set("Emin", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 15, "visible"],
    3: [25, 35, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["o", "", "", "o", "o", "o"],
  });

  chordgrips.set("Dmin", {
    1: [5, 92.5, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 55, "visible"],
    3: [45, 75, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "x", "o", "", "", ""],
  });

  chordgrips.set("G", {
    1: [25, 15, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [45, -5, "visible"],
    3: [45, 92.5, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["", "", "o", "o", "o", ""],
  });

  chordgrips.set("C", {
    1: [5, 75, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 35, "visible"],
    3: [45, 15, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "", "", "o", "", "o"],
  });

  chordgrips.set("G7", {
    1: [5, 92.5, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 15, "visible"],
    3: [45, -5, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["", "", "o", "o", "o", ""],
  });

  chordgrips.set("C7", {
    1: [5, 75, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 35, "visible"],
    3: [45, 15, "visible"],
    4: [45, 55, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "", "", "", "", "o"],
  });

  chordgrips.set("B7", {
    1: [5, 35, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 15, "visible"],
    3: [25, 55, "visible"],
    4: [25, 92.5, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "", "", "", "o", ""],
  });

  chordgrips.set("FMaj7", {
    1: [5, 75, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 55, "visible"],
    3: [45, 15, "visible"],
    4: [45, 35, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "", "", "", "", "o"],
  });

  chordgrips.set("A7", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 35, "visible"],
    3: [25, 75, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "o", "", "o", "", "o"],
  });

  chordgrips.set("D7", {
    1: [5, 75, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 55, "visible"],
    3: [25, 95, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "x", "o", "", "", ""],
  });

  chordgrips.set("E7", {
    1: [5, 55, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 15, "visible"],
    3: [0, 0, "hidden"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["o", "", "o", "", "o", "o"],
  });

  chordgrips.set("F", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "visible"],
    2: [25, 55, "visible"],
    3: [45, 15, "visible"],
    4: [45, 35, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["", "", "", "", "", ""],
  });

  chordgrips.set("Asus4", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 35, "visible"],
    3: [25, 55, "visible"],
    4: [45, 75, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "o", "", "", "", "o"],
  });

  chordgrips.set("Asus2", {
    1: [5, 75, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 35, "visible"],
    3: [25, 55, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "o", "", "", "o", "o"],
  });

  chordgrips.set("Dsus4", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 55, "visible"],
    3: [45, 75, "visible"],
    4: [45, 92.5, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "x", "o", "", "", ""],
  });

  chordgrips.set("Dsus2", {
    1: [25, 55, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [0, 0, "hidden"],
    3: [45, 75, "visible"],
    4: [0, 0, "hidden"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "x", "o", "", "", "o"],
  });

  chordgrips.set("Esus4", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 15, "visible"],
    3: [25, 35, "visible"],
    4: [25, 55, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["o", "", "", "", "o", "o"],
  });

  chordgrips.set("Esus2", {
    1: [25, 15, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [0, 0, "hidden"],
    3: [65, 35, "visible"],
    4: [65, 55, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["o", "", "", "", "o", "o"],
  });

  chordgrips.set("Big G", {
    1: [25, 15, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [45, -5, "visible"],
    3: [45, 75, "visible"],
    4: [45, 92.5, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["", "", "o", "o", "", ""],
  });

  chordgrips.set("Rock G", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [45, -5, "visible"],
    3: [45, 75, "visible"],
    4: [45, 92.5, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["", "x", "o", "o", "", ""],
  });

  chordgrips.set("Folk G", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [0, 0, "hidden"],
    3: [45, -5, "visible"],
    4: [45, 92.5, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["", "x", "o", "o", "o", ""],
  });

  chordgrips.set("D/F#", {
    1: [25, 55, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 95, "visible"],
    3: [45, 75, "visible"],
    4: [0, 0, "hidden"],
    "T": [25, -5, "visible"],
    sounding: ["", "x", "o", "", "", ""],
  });

  chordgrips.set("G/B", {
    1: [0, 0, "hidden"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 15, "visible"],
    3: [0, 0, "hidden"],
    4: [45, 92.5, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["x", "", "o", "o", "o", ""],
  });

  chordgrips.set("C/G", {
    1: [5, 75, "visible"],
    "1BAR": [5, -5, "hidden"],
    2: [25, 35, "visible"],
    3: [45, -5, "visible"],
    4: [45, 15, "visible"],
    "T": [0, 0, "hidden"],
    sounding: ["", "", "", "o", "", "o"],
  });

  return {
    getAppData: function () {
      return appData;
    },
    getSoundSelectors: function () {
      return soundSelectors;
    },
    getAllChords: function () {
      return allChords;
    },
    getChordGrip: function (chordName) {
      return chordgrips.get(chordName);
    },
    setDefaultData: function () {
      appData.applicationState = 0,
        appData.playBtnState = 'STOPPED',
        appData.loadedChords = appData.defaultValues.chordGroup,
        appData.interval = appData.defaultValues.interval,
        appData.setupMinutes = appData.defaultValues.minutes,
        appData.displayMinutes = appData.defaultValues.minutes,
        appData.displaySeconds = 0
    },
    saveIntervalToLocalStorage: function (interval) {
      localStorage.setItem('interval', interval);
    },
    saveSetupMinutesToLocalStorage: function (setupMinutes) {
      localStorage.setItem('setupMinutes', setupMinutes);
    },
    saveSelectedChordsToLocalStorage: function (selectedChords) {
      localStorage.setItem('selectedChords', JSON.stringify(selectedChords));
    },
    saveSelectionTypeToLocalStorage: function (selectionType) {
      localStorage.setItem('selectionType', selectionType);
    },
    saveGripModeToLocalStorage: function (selectedGripMode) {
      localStorage.setItem('selectedGripMode', selectedGripMode);
    },
    getGripModeFromLocalStorage: function () {
      let selectedGripMode = localStorage.getItem('selectedGripMode');
      if (selectedGripMode === null) {
        return appData.defaultValues.selectedGripMode;
      } else {
        return selectedGripMode;
      }
    },
    getIntervalFromLocalStorage: function () {
      let interval = localStorage.getItem('interval');
      if (interval === null) {
        return appData.defaultValues.interval;
      } else {
        return parseInt(interval);
      }
    },
    getSetupMinutesFromLocalStorage: function () {
      let setupMinutes = localStorage.getItem('setupMinutes');
      if (setupMinutes === null) {
        return appData.defaultValues.minutes;
      } else {
        return parseInt(setupMinutes);
      }
    },
    getSelectedChordsFromLocalStorage: function () {
      let selectedChords = JSON.parse(localStorage.getItem('selectedChords'));
      if (selectedChords === null) {
        return allChords.basicEightShapes;
      } else {
        return selectedChords;
      }
    },
    getSelectionTypeFromLocalStorage: function () {
      return localStorage.getItem('selectionType');
    }

  }
})();