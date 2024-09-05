import React, {useState, useRef, useEffect, createContext} from 'react';
import { Button } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { addEditorInfos } from '../../actions/JsonDataActions';

import { ExportStatus } from '../../enum/Enums';

import Validation from './Validation';

function ExportButton() {

    const jsonData = useSelector(state => state.jsonData);
    const fileName = useSelector(state => state.fileName);

    const TEST_COUNT = 7;
    const [exportStatus, setExportStatus] = useState(ExportStatus.DEFAULT);
    const [testCount, setTestCount] = useState(0);

    const [testResults, setTestResults] = useState(null);

    // add "2" to the end of a filename
    // ex: "savedata.txt" -> "savedata2.txt"
    // and increment if number suffix already exists
    // ex: "savedata2.txt" -> "savedata3.txt"
    function incrementFileName(fileName) {
        const fileParts = fileName.split('.');
        const name = fileParts.slice(0, -1).join('.');
        const extension = fileParts.slice(-1)[0];

        const match = name.match(/(.*?)(\d+)$/);
        if (match) {
            const baseName = match[1];
            const number = parseInt(match[2], 10) + 1;
            return `${baseName}${number}.${extension}`;
        } else {
            return `${name}2.${extension}`;
        }
    }

    const handleDownloadSaveData = () => {
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = incrementFileName(fileName);
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExport = async () => {
        setExportStatus(ExportStatus.EXPORT_IN_PROGRESS);
        const results = {
            fail: 0,
            success: 0,
            badValues: {}
        }
        await runTest("noDupeCharaIdTest", results, Validation.noDupeIdTest,
            jsonData.data.chara_list, "chara_id");
        await runTest("noDupeDragonKeyIdTest", results, Validation.noDupeIdTest,
            jsonData.data.dragon_list, "dragon_key_id");
        await runTest("noDupeTalismanKeyIdTest", results, Validation.noDupeIdTest, 
            jsonData.data.talisman_list, "talisman_key_id");
        await runTest("noDupeWeaponSkinIdTest", results, Validation.noDupeIdTest,
            jsonData.data.weapon_skin_list, "weapon_skin_id");
        await runTest("noDupeCrestIdTest", results, Validation.noDupeIdTest,
            jsonData.data.ability_crest_list, "ability_crest_id");
        await runTest("noDupeStoryIdTest", results, Validation.noDupeIdTest,
            jsonData.data.unit_story_list, "unit_story_id");
        await runTest("allDragonsHaveBondTest", results, Validation.allDragonsHaveBondTest,
            jsonData.data.album_dragon_list, jsonData.data.dragon_reliability_list);
        //await runTest("noMonaTest", results, Validation.noMonaTest, jsonData.data.chara_list);
        setTestResults(results);
        const exportStatus = results.fail > 0 ? ExportStatus.EXPORT_FAIL : ExportStatus.EXPORT_SUCCESS;
        setExportStatus(exportStatus);
        if (exportStatus === ExportStatus.EXPORT_SUCCESS) {
            handleDownloadSaveData();
        }
    }

    const incrementTestCount = () => {
        setTestCount(prevCount => prevCount + 1);
    }

    const runTest = async (name, results, test, ...input) => {
        const [success, badValues] = await test(...input);
        incrementTestCount();
        if (success) {
            results.success++;
        } else {
            results.fail++;
            results.badValues[name] = badValues;
        }
    }

    const exportInfo = () => {
        switch (exportStatus) {
            case ExportStatus.EXPORT_IN_PROGRESS:
                return (
                    <div>
                        <p>Test Count: {testCount}/{TEST_COUNT}</p>
                    </div>
                );
            case ExportStatus.EXPORT_SUCCESS:
                return <p>Export Successful!</p>;
            case ExportStatus.EXPORT_FAIL:
                const failureMessages = Object.entries(testResults.badValues).map(
                    ([testName, values]) => {
                        if (Array.isArray(values)) {
                            return `Failed: ${testName}: ${values.join(", ")}`;
                        } else if (values instanceof Set) {
                            return `Failed: ${testName}: ${Array.from(values).join(", ")}`;
                        } else {
                            return `Failed: ${testName}: ${values}`;
                        }
                    }
                );
                return (
                    <div className="export-fail-message">
                        <p>Unable to validate export save! (Test failures)</p>
                        <p>Please contact @sockperson if this appears.</p>
                        <p>Test Results:</p>
                        <p>Success: {testResults.success}, Fail: {testResults.fail}</p>
                        <ul>{failureMessages.map((message, index) => <li key={index}>{message}</li>)}</ul>
                    </div>
                );
            default:
                return null;
        }
    };

    const commonProps = {
        variant: 'contained',
        style: { backgroundColor: '#7a62f0' },
        sx: { 
            textTransform: 'none',
            color: 'white',
        }
    }

    return (
        <div style={{
            marginBottom: '20px',
            marginTop: '20px'
        }}>
            <Button {...commonProps} onClick={handleExport}>
                Export Save Data
            </Button>
            <div style={{marginBottom: '20px'}}>
                {exportInfo()}
            </div>
        </div>
    );
}

export default ExportButton;