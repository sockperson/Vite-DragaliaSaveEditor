import React, {useState, useContext} from 'react';
import { MappingContext } from '../../SaveEditor';

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import MaterialList_NumberInput from './MaterialList_NumberInput';
import MaterialList_MaterialCategoryButtonGroup from './MaterialList_MaterialCategoryButtonGroup';

import { MaterialCategoryGroup } from '../../../enum/Enums';
import DragaliaData from '../../../DragaliaData';

// all of these max values are arbitrary; idk what in the ingame max values are
// doesn't really matter ig

function MaterialList() {

  const materialMap = useContext(MappingContext).materialMap;

  const materialIdsByCategoryGroup = DragaliaData.getMaterialIdsByCategoryGroup(materialMap);

  const [activeMaterialCategoryGroup, setActiveMaterialCategoryGroup] = useState(MaterialCategoryGroup.UPGRADE);

  const onSetActiveMaterialCategoryGroup = (materialCategoryGroup) => {
    setActiveMaterialCategoryGroup(materialCategoryGroup);
  }

  
  const getActiveMaterials = () => {
    const activeMaterialIds = materialIdsByCategoryGroup[activeMaterialCategoryGroup];
    return (
      <Grid container spacing={2}>
        {Array.from(activeMaterialIds).map(id => (
          <Grid item xs={3} sm={3} md={3} key={id}>
            <MaterialList_NumberInput
              materialId={id}
              materialMeta={materialMap[id]}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div>
      <Box sx={{ border: '1px solid grey', borderRadius: '4px', p: 2, maxHeight: '80vh', overflowY: 'auto' }}>
        <p>Materials</p>
        <MaterialList_MaterialCategoryButtonGroup
          onSetActiveMaterialCategoryGroup={onSetActiveMaterialCategoryGroup}
        />
        <div style={{ marginTop: '20px' }}>
          {getActiveMaterials()}
        </div>
      </Box>
    </div>
  );
}

export default MaterialList;