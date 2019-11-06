import React, { useState } from 'react';

export default function RulesModal(props) {
    return (
        <div className="rules-modal">
            <embed src="src/assets/dndb_onesheet.pdf" type="application/pdf"></embed>
            <button onClick={() => props.setModalOut(false)}>X</button>
        </div>
    )
}