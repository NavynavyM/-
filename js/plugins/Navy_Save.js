
   (function() {
    const _loadGame = DataManager.loadGame;

    DataManager.loadGame = function(savefileId) {
        const result = _loadGame.call(this, savefileId);

        if (result && $gameSwitches.value(60)) {
            let count = Number(localStorage.getItem("FinalBossLoads") || 0);
            localStorage.setItem("FinalBossLoads", count + 1);
        }

        return result;
    };

    window.getFinalBossLoadCount = function() {
        return Number(localStorage.getItem("FinalBossLoads") || 0);
    };
})();