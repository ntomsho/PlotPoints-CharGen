import React from 'react';
import { CLASS_COLORS } from '../dndb-tables';
import Battlebro from './c_classes/battlebro';
import Bowslinger from './c_classes/bowslinger';
import Hippy from './c_classes/hippy';
import Wizcaster from './c_classes/wizcaster';
import KnightOfTushuze from './c_classes/knight_of_tushuze';

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
            case "Wizcaster":
                classComp = <Wizcaster currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            default:
                classComp = <></>
        }
        return classComp;
    }

    return (
        <>
        <h2 id="class-headline" style={{backgroundColor: classColor}}>{props.cClass}</h2>
        <br/>
        {classComp()}
        </>
    )
}