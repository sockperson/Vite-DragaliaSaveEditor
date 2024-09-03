import React, {memo, useContext} from 'react';
import { MappingContext } from '../../SaveEditor';
import { useSelector } from 'react-redux'; 


import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';

import JsonUtils from '../../../util/JsonUtils';
import ImageUtils from '../../../util/ImageUtils';

import TalismanList_TalismanImage from './TalismanList_TalismanImage';

const TalismanList_TalismanSelectButton = memo(({talismanKeyId, onSetActiveTalismanKeyId, isActive}) =>
{

  const talismanObject = useSelector(state => state.jsonData.data.talisman_list
    .find(talismanObject => talismanObject["talisman_key_id"] === talismanKeyId));

  if (!talismanObject) {
    return <div>Invalid talisman key ID</div>;
  }

  const partyList = useSelector(state => state.jsonData.data.party_list);

  const BUTTON_SIZE = 100;

  const portraitWyrmprintMap = useContext(MappingContext).portraitWyrmprintMap;

  const talismanId = talismanObject["talisman_id"];
  const adventurerId = portraitWyrmprintMap[talismanId].CharaId

  const abilityFields = ["talisman_ability_id_1", "talisman_ability_id_2", "talisman_ability_id_3"];
  const abilityIds = abilityFields.map(field => talismanObject[field]).filter(id => id !== 0);
 
  const isEquipped = JsonUtils.getTalismanEquippedParty(partyList, talismanKeyId) != -1;

  const handleButtonClick = () => {
    onSetActiveTalismanKeyId(talismanKeyId);
  }

  const activeStyle = {
    backgroundColor: '#4d6fbd',
    borderRadius: '0'
  };

  return (
    <IconButton 
    style={isActive ? {...activeStyle, position: 'relative', padding: '5px'} : {position: 'relative', padding: '5px'}}
    onClick={handleButtonClick}
  >
    <TalismanList_TalismanImage
      adventurerId={adventurerId}
      abilityIds={abilityIds}
      isUsed={isEquipped}
      imageSize={BUTTON_SIZE}
    />
  </IconButton>
  );
});

export default TalismanList_TalismanSelectButton;