import React from 'react';
import { CLASS_COLORS } from '../dndb-tables';
import Battlebro from './c_classes/battlebro';
import Bowslinger from './c_classes/bowslinger';
import Hippy from './c_classes/hippy';
import KnightOfTushuze from './c_classes/knight_of_tushuze';
import Minstrel from './c_classes/minstrel';
import Mixologist from './c_classes/mixologist';
import Neerdowell from './c_classes/neerdowell';
import Ragesmasher from './c_classes/ragesmasher';
import Runegoon from './c_classes/runegoon';
import Verbpriest from './c_classes/verbpriest';
import Wizcaster from './c_classes/wizcaster';
import Zoomaster from './c_classes/zoomaster';

export default function ClassMain(props) {
    const classColor = props.cClass ? CLASS_COLORS[props.cClass] : "white"

    function classComp() {
        let classComp;
        switch (props.cClass) {
            case "Battlebro":
                classComp = <Battlebro currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Bowslinger":
                classComp = <Bowslinger currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Hippy":
                classComp = <Hippy currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Knight of Tushuze":
                classComp = <KnightOfTushuze currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Minstrel":
                classComp = <Minstrel currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Mixologist":
                classComp = <Mixologist currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Ne'erdowell":
                classComp = <Neerdowell currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Ragesmasher":
                classComp = <Ragesmasher currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Runegoon":
                classComp = <Runegoon currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Verbpriest":
                classComp = <Verbpriest currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Wizcaster":
                classComp = <Wizcaster currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            case "Zoomaster":
                classComp = <Zoomaster currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            default:
                classComp = <></>
        }
        return classComp;
    }

    return (
        <>
            <div className="class-headline extend" style={{ backgroundColor: classColor }}>
            <h2 className="class-headline-text fade">{props.cClass}</h2>
        </div>
        <br/>
        {classComp()}
        </>
    )
}