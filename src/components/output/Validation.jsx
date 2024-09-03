import JsonUtils from '../../util/JsonUtils';

const noDupeIdTest = (list, idFieldName) => {
    const duplicates = JsonUtils.checkForDuplicateValues(list, idFieldName);
    return [duplicates.length === 0, duplicates];
}

const allDragonsHaveBondTest = (albumDragonList, dragonReliabilityList) => {
    const albumDragonSet = JsonUtils.getSetFromList(albumDragonList, "dragon_id");
    const dragonReliabilitySet = JsonUtils.getSetFromList(dragonReliabilityList, "dragon_id");
    const missingBondDragons = JsonUtils.subtractSets(albumDragonSet, dragonReliabilitySet);
    return [missingBondDragons.size === 0, missingBondDragons];
}

const noMonaTest = (list) => {
    const MONA = 10150304;
    const maybeMona = JsonUtils.findById(list, "chara_id", MONA);
    return [maybeMona != undefined, "Monaless"];
}

export default {
    noDupeIdTest,
    allDragonsHaveBondTest,
    noMonaTest
};