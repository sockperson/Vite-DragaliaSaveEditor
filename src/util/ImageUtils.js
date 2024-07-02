import { weaponTypeIdToString } from '../enum/Enums';

const getMaterialImage = (id, size) => {
    return `https://dragalialost.wiki/thumb.php?f=${id}.png&width=${size}`;
}

const getWeaponTypeImage = (weaponType, size) => {
    const weaponTypeString = weaponTypeIdToString(weaponType);
    return `https://dragalialost.wiki/thumb.php?f=Icon_Weapon_${weaponTypeString}.png&width=${size}`;
}

const getWeaponSkinImage = (baseId, variationId, formId, size) => {
    return `https://dragalialost.wiki/thumb.php?f=${baseId}_0${variationId}_${formId}.png&width=${size}`;
}

const getConsumableImage = (id, size) => {
    return `https://dragalialost.wiki/thumb.php?f=Consumable_${id}.png&width=${size}`;
}

const getWyrmprintImage = (baseId, rarity, size) => {
    // use refined vestige image for non sindom prints
    const variationId = rarity === 9 ? "01" : "02";
    return `https://dragalialost.wiki/thumb.php?f=${baseId}_${variationId}.png&width=${size}`;
}

export default {
    getMaterialImage,
    getWeaponTypeImage,
    getWeaponSkinImage,
    getConsumableImage,
    getWyrmprintImage
}