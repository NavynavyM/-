/*:
 * @plugindesc Скрывает варианты Show Choices по свитчам. v1.0
 * @author ChatGPT
 *
 * @help
 * Использование:
 *
 * Вариант выбора <hide:43>
 *
 * Вариант будет показан только если свитч 43 включен.
 */

(function() {

const _setupChoices = Game_Message.prototype.setChoices;

Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {

    const map = [];
    const newChoices = [];

    for (let i = 0; i < choices.length; i++) {
        let text = choices[i];
        const match = text.match(/<hide:(\d+)>/i);

        if (match) {
            const id = Number(match[1]);
            if (!$gameSwitches.value(id)) continue;
            text = text.replace(match[0], "").trim();
        }

        map.push(i);
        newChoices.push(text);
    }

    this._choiceMap = map;

    _setupChoices.call(this, newChoices, 0, -1);
};

const _onChoice = Game_Interpreter.prototype.setupChoices;

Game_Interpreter.prototype.setupChoices = function(params) {

    const result = _onChoice.call(this, params);

    const map = $gameMessage._choiceMap;

    if (map) {
        const callback = $gameMessage._choiceCallback;

        $gameMessage.setChoiceCallback(function(n) {
            callback(map[n]);
        });
    }

    return result;
};

})();