import { weaponTypeIdToString, elementTypeIdToString } from '../enum/Enums';

import flame from '../assets/icons/elements/flame.png';
import water from '../assets/icons/elements/water.png';
import wind from '../assets/icons/elements/wind.png';
import light from '../assets/icons/elements/light.png';
import shadow from '../assets/icons/elements/shadow.png';

import sword from '../assets/icons/weapons/sword.png';
import blade from '../assets/icons/weapons/blade.png';
import dagger from '../assets/icons/weapons/dagger.png';
import axe from '../assets/icons/weapons/axe.png';
import lance from '../assets/icons/weapons/lance.png';
import bow from '../assets/icons/weapons/bow.png';
import wand from '../assets/icons/weapons/wand.png';
import staff from '../assets/icons/weapons/staff.png';
import manacaster from '../assets/icons/weapons/manacaster.png';

import dream from '../assets/icons/summon_voucher/dream.png';
import single from '../assets/icons/summon_voucher/single.png';
import tenfold from '../assets/icons/summon_voucher/tenfold.png';
import adventurer from '../assets/icons/summon_voucher/5star_adventurer.png';
import adventurerPlus from '../assets/icons/summon_voucher/5star_adventurer_plus.png';
import dragon from '../assets/icons/summon_voucher/5star_dragon.png';
import dragonPlus from '../assets/icons/summon_voucher/5star_dragon_plus.png';

function zeroPad(number, digits) {
    return String(number).padStart(digits, '0');
}

const getMaterialImage = (id, size) => {
    return `https://minty.sbs/images/icon/item/materialdata/m/${id}.webp`;
}

const getWeaponTypeImage = (weaponType) => {
    switch (weaponType) {
        case 1:
            return sword;
        case 2:
            return blade;
        case 3:
            return dagger;
        case 4:
            return axe;
        case 5:
            return lance;
        case 6:
            return bow;
        case 7:
            return wand;
        case 8:
            return staff;
        case 9:
            return manacaster;
        default:
            return null;
    }
}

const getElementTypeImage = (elementType, size) => {
    switch (elementType) {
        case 1:
            return flame;
        case 2:
            return water;
        case 3:
            return wind;
        case 4:
            return light;
        case 5:
            return shadow;
        default:
            return null;
    }
}

const getWeaponSkinImage = (baseId, variationId, formId, size) => {
    return `https://cdn.minty.sbs/images/icon/weapon/m/${baseId}_0${variationId}_${formId}.webp`;
}

const getConsumableImage = (id) => {
    switch (id) {
        case 10001:
        case 10002:
            return dream;
        case 10101:
            return single;
        case 10102:
            return tenfold;
        case 10301:
            return adventurer;
        case 10302:
            return dragon;
        case 10501:
            return adventurerPlus;
        case 10502:
            return dragonPlus;
    }
}

const getWyrmprintImage = (baseId, rarity, size) => {
    // use refined vestige image for non sindom prints
    const variationId = rarity === 9 ? "01" : "02";
    return `https://cdn.minty.sbs/images/icon/amulet/m/${baseId}_${variationId}.webp`;
}

const getAbilityImage = (abilityIconName, size) => {
    return `https://cdn.minty.sbs/images/icon/ability/l/${abilityIconName}.webp`;
}

const getAdventurerImage = (adventurerMeta) => {
    const baseId = adventurerMeta.Id;
    const variationId = zeroPad(adventurerMeta.VariationId, 2);
    return `https://minty.sbs/images/icon/chara/m/${baseId}_${variationId}_r05.webp`;
}

const getDragonImage = (dragonMeta) => {
    const baseId = dragonMeta.BaseId;
    return `https://minty.sbs/images/icon/dragon/m/${baseId}_01.webp`;
}

export default {
    getMaterialImage,
    getWeaponTypeImage,
    getElementTypeImage,
    getWeaponSkinImage,
    getConsumableImage,
    getWyrmprintImage,
    getAdventurerImage,
    getAbilityImage,
    getDragonImage
}